import { Logger, OnModuleInit } from '@nestjs/common';
import Web3 from 'web3';

import { IContractOption } from './contract.option';
import { ContractsService } from '../databases/nimbus-rate/contracts/contracts.service';
import { ContractsModel } from '../databases/nimbus-rate/contracts/contracts.model';
import { IRateBySymbol } from './contract.interface';
import { IRateCreateDisabledDto, IRateCreateDto } from '../databases/nimbus-rate/rate/rate.dto';
import { RateService } from '../databases/nimbus-rate/rate/rate.service';
import { RateModel } from '../databases/nimbus-rate/rate/rate.model';
import { TokensService } from '../databases/nimbus-rate/tokens/tokens.service';
import { TokensModel } from '../databases/nimbus-rate/tokens/tokens.model';
import { IContractAbi } from './dto/contract-abi.interface';
import { ERROR_READ_TABLE_TOKEN } from '../constants';
import BigNumber from 'bignumber.js';

export class ContractService implements OnModuleInit {
	logger = new Logger(ContractService.name);
	public web3 = new Web3(new Web3.providers.HttpProvider(this.params.uri_rpc));
	public contract = new this.web3.eth.Contract(this.contractAbi.ABI as [], this.address);
	
	public rateDBService = new RateService(RateModel);
	public tokensDBService = new TokensService(TokensModel);
	public contractDBService = new ContractsService(ContractsModel);
	
	constructor(
		private params: IContractOption,
		public address: string,
		private contractAbi: IContractAbi
	) {
	}
	
	onModuleInit(): any {
		this.logger.debug(`CONTRACT ${this.address} INIT`)
	}
	
	sleep(milliseconds: number) {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	}
	
	async getContractData(): Promise<ContractsModel | null> {
		return this.contractDBService.fetchContractByAddress(this.address);
	}
	
	async getRate(block: number) {
		const blockCurrent = block - 1;
		const rateTokens = [];
		const tokens = await this.tokensDBService.fetchAll();
		if (tokens === null) {
			new Error(ERROR_READ_TABLE_TOKEN);
		}
		try {
			const rateBNB = await this.contract.methods //BNB/BUSD/
				.getSystemTokenAmountForToken(this.params.tokenBNB, '1000000000000000000')
				.call({ from: '0x0000000000000000000000000000000000000000' }, blockCurrent);
			
			const rateBUSD = await this.contract.methods //=10000000..../BUSD
				.getSystemTokenAmountForToken(this.params.tokenBUSD, '1000000000000000000')
					.call({ from: '0x0000000000000000000000000000000000000000' }, blockCurrent);
			
			const rateGNBU = await this.contract.methods //=10000000..../BUSD
				.getSystemTokenAmountForToken(this.params.tokenGNBU, '1000000000000000000')
				.call({ from: '0x0000000000000000000000000000000000000000' }, blockCurrent);
			
				
			for await (const row of tokens) {
				if (row.symbol === 'BNB') {
					const currentRate = new BigNumber(rateBNB).div(rateBUSD).multipliedBy(Math.pow(10, 18)).toFixed(0);
					rateTokens.push({ symbol: row.symbol, rate: currentRate });
					
				} else if (row.symbol === 'NBU') {
					const currentRate = new BigNumber(1000000000000000000).div(rateBUSD).multipliedBy(Math.pow(10, 18)).toFixed(0);
					rateTokens.push({ symbol: row.symbol, rate: currentRate });
					
				}else if (row.symbol === 'GNBU') {
					const currentRate = new BigNumber(1000000000000000000).div(rateGNBU).multipliedBy(Math.pow(10, 18)).toFixed(0);
					rateTokens.push({ symbol: row.symbol, rate: currentRate });
					
				} else {
					this.logger.error(`THIS IS SYMBOL NOT FOUND IN OLD CONTRACTS`);
					throw new Error('THIS IS SYMBOL NOT FOUND IN OLD CONTRACTS');
				}
			}
			
			return {
				block: blockCurrent,
				tokens: rateTokens
			};
		} catch (error) {
			this.logger.error(`Not read BLOCK ${blockCurrent} error: ${error}`);
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	}
	
	async getRateBatch(blocks:number[], callback: Function) {
		try {
			const batch = new this.web3.BatchRequest();
			for await (const block of blocks) {
					batch.add(
						 this.contract.methods.getSystemTokenAmountForToken(this.params.tokenBNB, '1000000000000000000')
							.call
							.request({ from: '0x0000000000000000000000000000000000000000' }, block, callback.bind(this, 'BNB', block))
					)
					
					batch.add(
						this.contract.methods.getSystemTokenAmountForToken(this.params.tokenBUSD, '1000000000000000000')
							.call
							.request({ from: '0x0000000000000000000000000000000000000000' }, block, callback.bind(this, 'BUSD', block))
					)
				
				batch.add(
					this.contract.methods.getSystemTokenAmountForToken(this.params.tokenGNBU, '1000000000000000000')
						.call
						.request({ from: '0x0000000000000000000000000000000000000000' }, block, callback.bind(this, 'GNBU', block))
				)
				
			}
			const batchExecute = await batch.execute();
			await this.sleep(100);
			return batchExecute;
			
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`Batch request ${error.message}`);
			}
		}
	};
	
	async insertRate(rate: string, block: number, symbol: string, status:number =0) {
		const  dto: IRateCreateDto = new IRateCreateDto();
		dto.symbol = symbol;
		dto.rate = rate;
		dto.block_start = block;
		dto.status = status;
		
		const lastRateData: IRateBySymbol | null = await this.rateDBService.fetchRateBySymbol(symbol);
		const token = await this.tokensDBService.findBySymbol(symbol);
		
		if (token!=null && token.symbol === symbol){
			await this.tokensDBService.updateCurrentRate(token.id, rate, block)
		}
	
		if (lastRateData != null &&
			new BigNumber(rate).toFixed() !== new BigNumber(lastRateData.rate).toFixed() &&
			BigNumber(rate).toFixed() != '0') {
			//console.log(new BigNumber(lastRateData.rate).toNumber(), rate,  new BigNumber(lastRateData.rate).toNumber()!=new BigNumber(rate).toNumber());
			await this.rateDBService.updateBlockEnd(lastRateData.id, block);
			await this.rateDBService.insert(dto).catch(err => {
				throw new Error(err.message);
			});
		} else if (!Boolean(lastRateData)) {
			await this.rateDBService.insert(dto).catch(err => {
				throw new Error(err.message);
			});
			
		} else if (lastRateData != null) {
			await this.rateDBService.updateBlockLast(lastRateData.id, block - 1);
		}
	}
	
	async insertRateNewArray(block_start: number, block_end: number, rate: string, symbol:string) {
		const  dto: IRateCreateDisabledDto = new IRateCreateDisabledDto();
		dto.block_start = block_start;
		dto.block_end = block_start;
		dto.block_last = block_end;
		dto.rate = rate;
		dto.symbol = symbol;
		 await this.rateDBService.insertNewArray(dto).catch(err => {
		 	throw new Error(err.message);
		 });
	}
}