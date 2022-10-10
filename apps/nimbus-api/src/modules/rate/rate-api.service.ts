import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { RateService } from '../../../../../databases/nimbus-rate/rate/rate.service';
import { ContractsService } from '../../../../../databases/nimbus-rate/contracts/contracts.service';
import { ERROR_READ_ARR_BLOCK, RATE_NOT_FOUND, TOKEN_NOT_FOUND } from '../../../../../constants';
import { NimbusContractMainService } from '../../../../../contracts/nimbus-contract-main/nimbus-contract-main.service';
import {
	NimbusContractInitial30OldService
} from '../../../../../contracts/nimbus-contract-initial30-old/nimbus-contract-initial30-old.service';
import {
	NimbusContractInitial30NewService
} from '../../../../../contracts/nimbus-contract-initial30-new/nimbus-contract-initial30-new.service';
import { IRateResult } from '../../../../../contracts/contract.interface';
import {
	ETypeSourceRate,
	IRateApiArrDto,
	IRateApiDto,
	IRateResultRequest,
	IRateSymbolTimestamp,
	ITypeResultBlockArr
} from './rate-api.dto';
import { ContractsModel } from '../../../../../databases/nimbus-rate/contracts/contracts.model';
import { LostBlocksService } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.service';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../../../../../databases/nimbus-rate/tokens/tokens.service';
import BigNumber from 'bignumber.js';
import { NimbusContractStarService } from '../../../../../contracts/nimbus-contract-star/nimbus-contract-star.service';
import { IRateCreateDisabledDto } from '../../../../../databases/nimbus-rate/rate/rate.dto';
import { ILostBlockStatus } from '../../../../../databases/nimbus-rate/lost-blocks/lost-bloks.dto';
import { EContractType } from './rate-api.constant';
import { Interval } from '@nestjs/schedule';


@Injectable()
export class RateApiService implements OnModuleInit{
	private logger = new Logger();
	private checkRateFromNewRecordStatus = true;
	
	constructor(
		private rateDBService: RateService,
		private tokenDBService: TokensService,
		private lostBockDBService: LostBlocksService,
		private contractDBService: ContractsService,
		private configService: ConfigService,
		private nimbusContractServiceMain: NimbusContractMainService, //id: 3
		private nimbusContractInitial30OldService: NimbusContractInitial30OldService, //id: 2
		private nimbusContractInitial30NewService: NimbusContractInitial30NewService, //id: 1
		private nimbusContractStarService: NimbusContractStarService, //id: 4
	) {
	}
	
	async onModuleInit(){
	 await this.checkEmptyRateRate();
	}
	
	@Interval('checkRateFromNewRecord', 24 * 3600)
	async checkEmptyRateRate(){
		this.rateDBService.deleteEmptyRate().catch(err=>{throw err})
	}
	
	//@Interval('checkRateFromNewRecord', 1000 * 60) //turned off auto check
	async checkRateFromNewRecord() {
		if (this.checkRateFromNewRecordStatus === true) {
			this.checkRateFromNewRecordStatus=false;
			
			const rate = await this.rateDBService.fetchRateByStatus();
			let countRow = 0;
			try {
				for await (const row of rate) {
					countRow++;
					const newData = await this.fetchRateByBlockAndSymbol({
						block: row.block_start,
						symbol: row.symbol
					}, ETypeSourceRate.blockchain).catch(err => {
						throw err;
					});
					if (newData != null && row.rate != newData.rate) {
						await this.rateDBService.updateRate(row.id, newData.rate);
						this.logger.debug(`${countRow}/${rate.length} id: ${row.id} ${row.symbol} [${row.block_start}:${row.block_end}] old: ${row.rate} new: ${newData.rate}`);
					}
					await this.nimbusContractServiceMain.sleep(100);
					this.checkRateFromNewRecordStatus=true
				}
			} catch (err) {
				this.checkRateFromNewRecordStatus=true
				this.logger.error(`fetchRateByBlockAndSymbol ${err}`);
			}
		}
	}
	
	async getLinkContract(block: number): Promise<
		NimbusContractMainService |
		NimbusContractInitial30OldService |
		NimbusContractInitial30NewService |
		NimbusContractStarService> {
		const contract: ContractsModel | null = await this.contractDBService.fetchContractIdByBlockNumber(block);
		
		let linkContract:
			NimbusContractMainService |
			NimbusContractInitial30OldService |
			NimbusContractInitial30NewService |
			NimbusContractStarService
			= this.nimbusContractServiceMain;
		
		if (contract != null && contract.active && contract.type === EContractType.ContractMain) {
			linkContract = this.nimbusContractServiceMain;
			
		} else if (contract != null && contract.type === EContractType.Initial30Old) {
			linkContract = this.nimbusContractInitial30OldService;
			
		} else if (contract != null && contract.type === EContractType.Initial30New) {
			linkContract = this.nimbusContractInitial30NewService;
			
		} else if (contract != null && contract.type === EContractType.Star) {
			linkContract = this.nimbusContractStarService;
		} else {
			linkContract = this.nimbusContractServiceMain;
			this.logger.warn(`NOT FOUNT CLASS CONTRACT`);
			// throw new Error(`NOT FOUNT CLASS CONTRACT`)
		}
		
		return linkContract;
	}
	
	async requestStepArr(arrBlocks: number[]): Promise<ITypeResultBlockArr[]> {
		try {
			const linkContract = await this.getLinkContract(arrBlocks[0]);
			let resultRequestArr: ITypeResultBlockArr[] = [];
			for await (const block of arrBlocks) {
				if (block) {
					const rate = await linkContract.getRate(block);
					if (rate) {
						for await (const row of rate.tokens) {
							resultRequestArr.push({ symbol: row.symbol, block, rate: row.rate });
						}
					}
				}
			}
			return resultRequestArr;
		} catch (err) {
			throw err;
		}
	}
	
	async requestBatchArr(arrBlocks: number[]): Promise<ITypeResultBlockArr[]> {
		try {
			const linkContract = await this.getLinkContract(arrBlocks[0]);
			const tokens = await this.tokenDBService.fetchAll();
			let resultRequestArr: ITypeResultBlockArr[] = [];
			let countToken = 1
			return new Promise( (resolve, reject) => {
				linkContract.getRateBatch(arrBlocks,   (symbol: string, block: number, error: Error, arrData: any) => {
					if (!error) {
						countToken++;
						try {
							let rate = '';
							if (linkContract.address === '0xB8AC7faBFF0d901878c269330b32CDD8D2Ba3b8c') {
								rate = String(arrData.rate);
							} else {
								rate = new BigNumber(String(arrData)).toFixed();
							}
							
							//this.logger.log(` ${countToken}  ${arrBlocks.length}  ${tokens.length} ${arrData}` )
							
							if (rate) {
								resultRequestArr.push({ symbol, block: Number(block), rate });
							}
							
							if (countToken === arrBlocks.length * tokens.length) {
								resolve(resultRequestArr);
							}
						} catch (err) {
							this.logger.error('TRY', err);
							reject(new Error(`Error check getRateBatch ${block} ${error}`));
						}
					}else {
							reject(new Error(`Error check getRateBatch ${block} ${error}`));
					}
				});
			});
		} catch (err) {
			throw err;
		}
	}
	
	async calculateFromOldContractBatchArr(arrBatch: number[]) {
			const contract = await this.getLinkContract(arrBatch[0]);
			const batchArray = await this.requestBatchArr(arrBatch).catch(async err => {
				this.logger.warn(`Check with requestStepArr....`);
				const result = await this.requestStepArr(arrBatch)
					.catch(err => {
					throw new Error(ERROR_READ_ARR_BLOCK);
				});
				this.logger.log(`RequestStepArr is OK`);
				return result;
				
			});
			
			if (contract.address != '0x22777f4A79C2a39c47D71e4558f2245CA3afE1ED' &&
				contract.address != '0xB8AC7faBFF0d901878c269330b32CDD8D2Ba3b8c'
			) {
				for await (const batch of batchArray) {
					if (batch.symbol === 'BNB') {
						const result = batchArray.filter(arr => arr.block === batch.block && arr.symbol === 'BUSD');
						const priceBNB = new BigNumber(batch.rate).div(result[0].rate).multipliedBy(Math.pow(10, 18)).toFixed(0);
						batch.rate = priceBNB;
					} else if (batch.symbol === 'BUSD' ) {
						const priceBUSD = new BigNumber(1000000000000000000).div(batch.rate).multipliedBy(Math.pow(10, 18)).toFixed(0);
						batch.symbol = 'NBU';
						batch.rate = priceBUSD;
					}
				}
			}
			return batchArray;
	}
	
	async fetchNewRateByBlocksArr(lostBlockDBService: LostBlocksService, dto: IRateApiArrDto) {
		
		const newRateFromRequest: ITypeResultBlockArr[] = [];
		const size = Number(this.configService.get<number>('COUNT_IN_BATCH') || 20);
		const sleepCountStage: number = Number(this.configService.get<number>('SLEEP_STAGE_COUNT') || 1000);
		const sleepStep:number = Number(this.configService.get<number>('SLEEP_STEP_BATCH') || 100);
		
		let stageCount = 1;
		let arrFullBlocks: number[] = [];
		
		for (let block = dto.block_start; block <= dto.block_end; block++) {
			arrFullBlocks.push(block);
		}
		
		for (let i = 0; i <= Math.ceil(arrFullBlocks.length / size); i++) {
			stageCount++;
			await this.nimbusContractServiceMain.sleep(sleepCountStage);
			const arrBlockStep = arrFullBlocks.slice((i * size), (i * size) + size);
			if (dto.id!=null && dto.id>0){
				await lostBlockDBService.updateLostBlockStart(dto.id, arrBlockStep[0])
			}
			if (arrBlockStep.length > 0) {
				this.logger.debug(`stage: ${i}/${Math.ceil(arrFullBlocks.length / size)}, count: ${arrBlockStep.length} blocks: ${arrBlockStep[0]}: ${arrBlockStep[arrBlockStep.length - 1]}`);
				let rateFromRequest: ITypeResultBlockArr[] = await this.calculateFromOldContractBatchArr(arrBlockStep);
				
				for await (const data of rateFromRequest) {
					await this.nimbusContractServiceMain.sleep(sleepStep);
					const block = data.block;
					const symbol = data.symbol;
					const rate = data.rate;

					const rateFromDb = await this.rateDBService.fetchRateBySymbolBlockStatus({ block, symbol }, ILostBlockStatus.create)
						.catch(err => {
							this.logger.error(`error read fetchRateBySymbolBlockStatus, ${err}`);

						});
					if (rateFromDb != null && (rateFromDb.rate != rate)) {
						this.logger.verbose(`change price from arr blocks ${block} ${symbol} ${rateFromDb.rate} != ${rate}`);
						await this.rateDBService.updateBlockEnd(rateFromDb.id, block - 1);
						await this.rateDBService.updateBlockLast(rateFromDb.id, block - 1);
						await this.nimbusContractServiceMain.insertRateNewArray(block, arrFullBlocks[arrFullBlocks.length - 1], rate, symbol);

					} else if (rateFromDb != null && (rateFromDb.rate === rate) && (rateFromDb.block_end != rateFromDb.block_last)) {
						await this.rateDBService.updateBlockEnd(rateFromDb.id, block);

					} else if (rateFromDb === null) {
						await this.nimbusContractServiceMain.insertRateNewArray(arrFullBlocks[0], arrFullBlocks[arrFullBlocks.length - 1], rate, symbol);
					}
					newRateFromRequest.push(data);
				}
			 }
		}
		return {
			stageCount,
			countBlocks: arrFullBlocks.length
		};
	}
	
	async fetchRateByBlockAndSymbol(dto: IRateApiDto, source: ETypeSourceRate = ETypeSourceRate.database): Promise<IRateResultRequest | undefined> {
		const rateResultRequest = new IRateResultRequest();
		const decimal = await this.tokenDBService.fetchDecimalBySymbol(dto.symbol);
		const linkContract = await this.getLinkContract(dto.block);
		
		rateResultRequest.contract = linkContract.address;
		rateResultRequest.symbol = dto.symbol;
		rateResultRequest.block = dto.block;
		rateResultRequest.source = source;
		rateResultRequest.decimal = decimal;
		try {
			const rate = await this.rateDBService.fetchRateBySymbolBlockStatus(dto, ILostBlockStatus.create);
//			const LostBlock:LostBlocksModel | null = await this.lostBockDBService.fetchLostBlockByBlock(dto.block);
			const templateRate = await  this.rateDBService.fetchRateBySymbolBlockStatus(dto, ILostBlockStatus.temporary);
			
			
			if ( (rate === null && templateRate===null) || source === ETypeSourceRate.blockchain ) {
				this.logger.warn(`calculate rate in blockchain, block ${dto.block}`);
				const newRate = await linkContract.getRate(dto.block);
				if (newRate) {
					rateResultRequest.source = ETypeSourceRate.blockchain;
					rateResultRequest.rate = this.selectRateBySymbol(newRate, dto.symbol);
					rateResultRequest.rate_decimal = new BigNumber(rateResultRequest.rate).multipliedBy(Math.pow(10, -decimal)).toFixed();
					
						if ((rate === null || rate.rate!=rateResultRequest.rate) && templateRate===null) {
						const data: IRateCreateDisabledDto = {
							symbol: dto.symbol,
							rate: rateResultRequest.rate,
							block_start: dto.block,
							block_end: dto.block,
							block_last: dto.block,
							status: ILostBlockStatus.temporary
						}
						console.log(`INSERT NEW RATE ${data.rate} in block ${dto.block}`)
						await this.rateDBService.insertNewArray(data);
					}
					
				}
				
			} else if (rate != null && templateRate===null) {
				rateResultRequest.rate = rate.rate;
				rateResultRequest.rate_decimal = new BigNumber(rate.rate).div(1E18).toFixed();
			} else if (rate === null && templateRate!=null) {
				rateResultRequest.rate = templateRate.rate;
				rateResultRequest.rate_decimal = new BigNumber(templateRate.rate).div(1E18).toFixed();
			} else if (rate!=null && templateRate!=null){
				rateResultRequest.rate = rate.rate;
				rateResultRequest.rate_decimal = new BigNumber(rate.rate).div(1E18).toFixed();
			}
			
			return rateResultRequest;
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
		}
	}
	
	selectRateBySymbol(data: IRateResult, symbol: string): string {
		for (const row of data.tokens) {
			if (row.symbol === symbol) {
				return row.rate;
			}
		}
		return '0';
	}
	
	async fetchRateBySymbolTimestamp(dto:IRateSymbolTimestamp){
		return await this.rateDBService.fetchRateBySymbolEndTimestamp(dto)
			.catch(err=>{
					throw new BadRequestException(err);
			})
	}
	
	async fetchLastRateBySymbol(symbol: string, source: ETypeSourceRate = ETypeSourceRate.database) { //: Promise<IRateResultRequest>
		const row = await this.rateDBService.fetchRateBySymbol(symbol);
		const decimal = await this.tokenDBService.fetchDecimalBySymbol(symbol)
			.catch(err => {
				throw new BadRequestException(TOKEN_NOT_FOUND);
			});
		const contractData = await this.nimbusContractServiceMain.getContractData();
		if (contractData === null) {
			throw new Error('CONTRACT IS NULL');
		}
		const lastBlock = await this.contractDBService.fetchNumberLastBlockByContract(contractData.id);
		let returnRate;
		
		if (row != null && source === ETypeSourceRate.database) {
			returnRate = row.rate;
		}
		if (source === ETypeSourceRate.blockchain) {
			const rate = await this.nimbusContractServiceMain.getRate(lastBlock);
			if (rate != null) {
				returnRate = this.selectRateBySymbol(rate, symbol);
			}else{
				 throw new BadRequestException(`${RATE_NOT_FOUND} ${source}`)
			}
		}
		
			return {
				symbol: symbol,
				rate: returnRate,
				decimal,
				rate_decimal: Number(returnRate) * Math.pow(10,-decimal),
				block: lastBlock,
				source: source,
				contract: contractData.address
		 	};
	}
}