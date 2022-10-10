import { ConfigService } from '@nestjs/config';
import { IBlockData, IBlockHeader } from './dto/block-header.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import BigNumber from 'bignumber.js';

import { NimbusContractMainService } from '../../../../../contracts/nimbus-contract-main/nimbus-contract-main.service';
import { NEW_BLOCK_HEADER, WEB3WSS_MODULE } from '../../../../../constants';
import { ContractsService } from '../../../../../databases/nimbus-rate/contracts/contracts.service';
import { IWeb3WssOptions } from './web3.wss-option';
import { LostBlocksService } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.service';
import { LostBlocksModel } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.model';
import { ILostBlockStatus } from '../../../../../databases/nimbus-rate/lost-blocks/lost-bloks.dto';
import { TokensService } from '../../../../../databases/nimbus-rate/tokens/tokens.service';

const Web3 = require('web3');

@Injectable()
export class Web3WssService {
	private logger = new Logger(Web3WssService.name);
	private readonly option = {
		timeout: 30000,
		clientConfig: {
			maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
			maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
			keepalive: true,
			keepaliveInterval: 60000 // ms
		},
		reconnect: {
			auto: true,
			maxAttempts: 0,
			onTimeout: true
		}
	};
	private provider = new Web3.providers.WebsocketProvider(this.params.uri_wss, this.option);
	private web3ws = new Web3(this.provider);
	public active_contract_id:number = 1;
	private minusBlock:number = Number(this.configService.get<number>('minusBlock') ?? 1);
	
	constructor(
		@Inject(WEB3WSS_MODULE) private params: IWeb3WssOptions,
		private readonly configService: ConfigService,
		private readonly nimbusContractMain: NimbusContractMainService,
		private readonly contractsService: ContractsService,
		private readonly tokenService: TokensService,
		private lostBlockService: LostBlocksService
	) {
		this.provider = new Web3.providers.WebsocketProvider(this.params.uri_wss, this.option);
		this.web3ws = new Web3(this.provider);
		this.provider.on('connect', () => {
			this.logger.debug('WSS SERVICE CONNECTED');
		});
		this.provider.on('error', (err: Error) => {
			this.logger.debug('WS Error', err);
			this.provider = this.web3ws.setProvider(this.provider);
		});
		this.provider.on('end', async () => {
			this.logger.debug('WS closed, Attempting to reconnect...');
			this.provider = new Web3.providers.WebsocketProvider(this.params.uri_wss, this.option);
			this.web3ws.setProvider(this.provider);
		});
	}
	
	async subscribe() {
		const contract = await this.contractsService.fetchActiveContract();
		
		if (contract!=null) {
			this.active_contract_id = contract.id;
			this.logger.debug(`Active contract ${contract.address}`);
		}
		
		const subscription = await this.web3ws.eth.subscribe(NEW_BLOCK_HEADER, async (err: Error) => {
			if (err) {
				this.logger.error(`Error subscribe ${err}`);
			}
		});
		
		subscription.on('data', async (blockHeader: IBlockHeader) => {
			try {
				const blockNumber = blockHeader.number-this.minusBlock;
				if (Boolean(blockNumber)) {
					await this.checkLostBlockNumber(blockNumber);
					const blockData: IBlockData = await this.web3ws.eth.getBlock(blockNumber);
					if (blockData != null && blockData.transactions.length != 0) {
						const rate = await this.nimbusContractMain.getRate(blockNumber);
						if (rate != null) {
							for await (const row of rate.tokens) {
								if (row.rate != new BigNumber(0).toFixed()) {
									await this.nimbusContractMain.insertRate(new BigNumber(row.rate).toFixed(), blockNumber, row.symbol)
										.catch((err) => {
											this.logger.error(`ERROR INSERT RATE  + ${JSON.stringify(err)}`);
										});
								}
							}
						}
						await this.contractsService.updateNumberLastBlockByContract(this.active_contract_id, blockNumber);
					}
				}
			} catch (err) {
				this.logger.error(`Block ${blockHeader.number} not read ${err}`);
			}
		});
		
		subscription.on('connected', (result: string, error: string) => {
			if (!error) {
				this.logger.log(`Subscription ${NEW_BLOCK_HEADER}`, result);
			} else {
				this.logger.error(`WSS Subscription ${NEW_BLOCK_HEADER} error`, error);
			}
		});
	}
	
	async checkLostBlockNumber(block:number) {
		try {
			const dataRowLostBlock = new LostBlocksModel();
			const lastSaveNumber = await this.contractsService.fetchNumberLastBlockByContract(this.active_contract_id);
			if (block - lastSaveNumber >= 20) {
				this.logger.verbose(`LOST BLOCK ${block} - LAST SAVE ${lastSaveNumber} = ${block - lastSaveNumber}`);
				const row = await this.lostBlockService.fetchLostBlockByBlockStart(lastSaveNumber);
				if (row === null) {
					dataRowLostBlock.block_start = lastSaveNumber;
					dataRowLostBlock.block_end = block;
					dataRowLostBlock.status = ILostBlockStatus.create;
					await this.lostBlockService.insert(dataRowLostBlock)
				} else {
					await this.lostBlockService.updateLostBlockEnd(row.id, block);
				}
			}
		} catch (err) {
			this.logger.error(`checkLostBlockNumber ${err}`)
		}
	}
}


