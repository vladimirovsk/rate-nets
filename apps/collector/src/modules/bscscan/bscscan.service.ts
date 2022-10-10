import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import BigNumber from 'bignumber.js';
import {
	IResponseCalculateNFTTurnover,
	IResponseCalculateTotalTurnover,
	IResultTransaction,
	ITransactionResponse,
	ITransactionResponseResult,
	ITransactionResult
} from './bscscan.dto';
import { TokenName } from '../../../../../constants/token';
import { IEventTypeBuySystemTokenFromToken, IEventTypeRegister } from '../../../../../constants/events/events.dto';
import { TransactionModel } from '../../../../../databases/nimbus-events/transactions/transaction.model';
import { EventsModel } from '../../../../../databases/nimbus-events/events/events.model';
import { EventTypeModel } from '../../../../../databases/nimbus-events/event_types/event-types.model';
import { EventsName } from '../../../../../constants/events';
import { TransactionService } from '../../../../../databases/nimbus-events/transactions/transaction.service';
import { EventsService } from '../../../../../databases/nimbus-events/events/events.service';
import { EventTypeService } from '../../../../../databases/nimbus-events/event_types/event-type.service';
import { BscScanHelpers } from './bscscan.helpers';
import { TelegramService } from '../../../../../library/telegram/telegram.service';
import { ContractStatisticCalculate } from '../contract-statistic/contract-statistic.calculate';
import { ITotalStaking } from '../../../../../constants/information/information.responce.dto';
import { ContractEventsService } from '../contract-events/contract-events.service';

@Injectable()
export class BscScanService implements OnModuleInit {
	private resultTransactionBsc = new Map();
	private logger = new Logger();
	private countTotalTurnover = 0;
	private countTotalNft = 0;
	
	constructor(
		private configService: ConfigService,
		private contractStatisticCalculate: ContractStatisticCalculate,
		private contractEventsService: ContractEventsService,
		private bscScanHelper: BscScanHelpers,
		private transactionDBService: TransactionService,
		private eventsDBService: EventsService,
		private eventsTypeDBService: EventTypeService,
		private telegramService: TelegramService
	) {
	}
	
	setCountTotalTurnover(count:number=0) {
		this.countTotalTurnover=count;
	}
	
	private async getBlockByPeriod(startTime: number, endTime: number):Promise<{startBlock: number, endBlock: number}>{
 		let startBlock = await this.bscScanHelper.getBlockNumberByTimestamp(startTime);
		let endBlock = await this.bscScanHelper.getBlockNumberByTimestamp(endTime);
		if (!Boolean(endBlock)) {endBlock= 99999999}
		return {
		 	startBlock,
		 	endBlock
		 }
	}
	
	async onModuleInit() {
		await this.bscScanHelper.getAbi(this.bscScanHelper.addressContractTurnover).catch(() => {
			this.logger.warn(`restart init get Abi from ${this.bscScanHelper.addressContractTurnover}`);
			this.onModuleInit();
		})
			.then(() => {
				this.logger.debug(`get Abi from ${this.bscScanHelper.addressContractTurnover}`);
			});
		
		// await this.bscScanHelper.readPriceBNBCSV().catch(err=>{
		// 	this.logger.error(`read price BNB in BscScan ${this.bscScanHelper.addressContract}`);
		// })
	}
	
	async dataTransactionContractByTimes(address:string, start:number, end:number, page: number, offset: number){
		const period = await this.getBlockByPeriod(start, end);
		const response = await this.bscScanHelper.getTransactionByAddress(address, period.startBlock, period.endBlock, page, offset);
		return response.result;
	}
	
	async formatDataTransactionByBlock(startBlock: number, endBlock: number = 99999999): Promise<IResultTransaction[]> {
		await this.bscScanHelper.getListBEP20TransferEventsByAddress(startBlock, endBlock);
		
		const transactions: ITransactionResponse = await this.bscScanHelper.getTransaction(startBlock, endBlock)
			.catch(err => {
				throw new Error(`Error get Transaction ${err}`);
			});
		
		const resultFormat: IResultTransaction[] = [];
		
		transactions.result.map(async (row: ITransactionResponseResult) => {
			this.resultTransactionBsc.set(row.hash, row);
			
			let price = '0';
			let tokenName = TokenName.BNB;
			let currentValue = '0';
			let value = '0';
			let from = '';
			let to = '';
			let contractAddress = '';
			
			if (Boolean(this.bscScanHelper.resultBEP20.get(row.hash))) {
				const transactionBEB20 = this.bscScanHelper.resultBEP20.get(row.hash);
				tokenName = TokenName.BUSD;
				currentValue = transactionBEB20.value;
				price = '1'; //new BigNumber(row.value).toFixed();
				value = transactionBEB20.value;
				from = transactionBEB20.from;
				to = transactionBEB20.to;
				contractAddress = transactionBEB20.contractAddress;
			} else {
				const rate = { price: 0 }; //await this.getPriceBNB(parseInt(row.timeStamp));
				tokenName = TokenName.BNB;
				price = new BigNumber(rate.price).toFixed();
				currentValue = new BigNumber(row.value).multipliedBy(rate.price).div(1E18).toFixed();
				value = row.value;
				from = row.from;
				to = row.to;
				contractAddress = row.contractAddress;
				currentValue = new BigNumber(row.value).multipliedBy(price).div(1E18).toFixed(); //Value_IN_BNB * curs
			}
			
			const index = row.functionName.indexOf('(');
			const functionName = row.functionName.substring(0, index);
			
			resultFormat.push(
				{
					hash: row.hash,
					blockNumber: row.blockNumber,
					blockTime: row.timeStamp,
					from,
					to,
					tokenName,
					contractAddress,
					value,
					currentValue,
					feeBNB: new BigNumber(row.gas).multipliedBy(row.gasPrice).div(1E18).toFixed(),
					feeUSD: '-', //fee bnb * curs
					HistoricalPrice: price,
					status: row.txreceipt_status,
					errCode: row.isError,
					method: functionName
				}
			);
		});
		
		return resultFormat;
	}
	
	async calculateNFTTurnover(dto: {
		startTime: number,
		endTime: number,
	}) {
		
		let calculateStakingPeriod: ITotalStaking = await this.contractStatisticCalculate.calculateStakesPeriod({
			startPeriod: dto.startTime, endPeriod: dto.endTime, name: EventsName.BuySmartLP, title: TokenName.BNB
		});
		
		return {
			valueNftEnvCountSmartLP: calculateStakingPeriod.countSmartLP,
			valueNftEnvCountSmartStaking: calculateStakingPeriod.countSmartStaking,
			valueNftEnvBNB: new BigNumber(calculateStakingPeriod.bnbAmountReceived).multipliedBy(1E18).toFixed(),
			valueNftEnvBUSD: new BigNumber(calculateStakingPeriod.busdAmountReceived).multipliedBy(1E18).toFixed()
		};
	}
	
	async calculateTotalTurnover(dto: {
		startTime: number,
		endTime: number,
		valueBscBNB: string,
		valueBscBUSD: string;
		dataBscScan: any
	}) {
		let valueEnvBNB = '0';
		let valueEnvBUSD = '0';
		let valueTransactionBNB = '0';
		let valueTransactionBUSD = '0';
		
		const transactionBNB: ITransactionResult[] = [];
		const transactionBUSD: ITransactionResult[] = [];
		
		const eventsResponse = await this.bscScanHelper.getEventsByPeriodEndName({
			startPeriod: dto.startTime, endPeriod: dto.endTime, name: EventsName.BuySystemTokenForToken, title: TokenName.BNB
		});
		valueEnvBNB = new BigNumber(eventsResponse.totalTurnover.receivedBNB).multipliedBy(1E18).toFixed();
		valueEnvBUSD = new BigNumber(eventsResponse.totalTurnover.receivedBUSD).multipliedBy(1E18).toFixed();
		
		if (
			(new BigNumber(dto.valueBscBNB) != new BigNumber(valueEnvBNB)) ||
			(new BigNumber(dto.valueBscBUSD) != new BigNumber(valueEnvBUSD))) {
			this.logger.warn(`Find lost transaction...`);
			for (const rowBsc of dto.dataBscScan) {
				const txData: TransactionModel[] = await this.transactionDBService.fetchByHash(rowBsc.hash);
				const findBEP20 = await this.bscScanHelper.resultBEP20.get(rowBsc.hash);
				if (txData.length === 0) {
					if ((Number(rowBsc.status)) != 0 && (rowBsc.method.includes('buySystemToken')) && !Boolean(findBEP20)) {
						valueTransactionBNB = new BigNumber(rowBsc.value).plus(valueTransactionBNB).toFixed();
						await this.addTransactionToEventService({
							address: this.bscScanHelper.addressContractTurnover,
							hash: rowBsc.hash
						})
							.catch(err => {
								this.logger.warn(`Error insert transaction, ${this.bscScanHelper.addressContractTurnover}, ${rowBsc.hash}, ${err}`);
							});
						transactionBNB.push({
							hash: rowBsc.hash,
							method: rowBsc.method,
							value: rowBsc.value,
							float: new BigNumber(rowBsc.value).div(1E18).toFixed()
						});
						//}
						
					} else if (rowBsc.method.includes('buySystemToken') && Boolean(findBEP20)) {
						await this.addTransactionToEventService({
							address: this.bscScanHelper.addressContractTurnover,
							hash: rowBsc.hash
						})
							.catch(err => {
								this.logger.warn(`Error insert transaction, ${this.bscScanHelper.addressContractTurnover}, ${rowBsc.hash}, ${err}`);
							});
						
						valueTransactionBUSD = new BigNumber(findBEP20.value).plus(valueTransactionBUSD).toFixed();
						transactionBUSD.push({
							hash: rowBsc.hash,
							method: rowBsc.method,
							value: findBEP20.value,
							float: new BigNumber(findBEP20.value).div(1E18).toFixed()
						});
//					}
					}
					this.logger.warn(`Not found in database, ${rowBsc.hash}, ${rowBsc.method},  ${rowBsc.status}, ${rowBsc.value} `);
				}
			}
		}
		
		return {
			valueEnvBNB,
			valueEnvBUSD,
			valueTransactionBNB,
			transactionBNB,
			valueTransactionBUSD,
			transactionBUSD
		};
	}
	
	async dataCompareNftTransaction(startTime: number, endTime: number) {
		const blocks = await this.getBlockByPeriod(startTime, endTime);
		
		let valueNftBscBNB = '0';
		let valueNftBscBUSD = '0';
		let valueNftBscCountSmartLP = '0';
		let valueNftBscCountSmartStaking = '0';
		let transactionBNB: ITransactionResult[] = [];
		let transactionBUSD: ITransactionResult[] = [];
		
		 console.log({startTime, endTime, ...blocks});
		
		/*
			await this.addTransactionToEventService({
				address: this.bscScanHelper.addressContractTurnoverForNFT,
				hash: row.hash
			})
			.then(()=>{this.logger.debug(`Send addTransactionToEventService buySmartLP ${this.bscScanHelper.addressContractTurnoverForNFT}, ${row.hash} Error: ${row.isError}`)})
			.catch(err => {
				this.logger.warn(`Error insert transaction, ${this.bscScanHelper.addressContractTurnoverForNFT}, ${row.hash}, ${err}`);
			});
		* */
		
		const dataBscSmartLP = await this.bscScanHelper.getTransactionNFTSmartLP(blocks.startBlock, blocks.endBlock);
		const dataBscSmartStaker = await this.bscScanHelper.getTransactionNFTSmartStaker(blocks.startBlock, blocks.endBlock);
		const mapBEP20 = await this.bscScanHelper.getListBEP20TransferEventSmartStaker(blocks.startBlock, blocks.endBlock);

		for (const row of dataBscSmartLP.result) {

			if (row.functionName.includes('buySmartLP')) {
				const dataTX = await this.transactionDBService.fetchByHash(row.hash);
				if (Number(row.isError)===0 && (row.value!=0)){
					valueNftBscBNB = new BigNumber(valueNftBscBNB).plus(row.value).toFixed()
					valueNftBscCountSmartLP = (Number(valueNftBscCountSmartLP) + 1).toFixed();
					console.log('countSmartLP', 'index:', row.transactionIndex, row.hash, row.value, row.isError);
				}else{
					console.log('VALUE SMART LP = 0 , or Error')
				}

				if (dataTX.length === 0 && Number(row.isError)===0) {
					transactionBNB.push({
						hash: row.hash,
						method: row.method,
						value: row.value,
						float: new BigNumber(row.value).div(1E18).toFixed()
					});
				}
			}
		}

		for (const row of dataBscSmartStaker.result) {
			const dataTX = await this.transactionDBService.fetchByHash(row.hash);
			if (row.functionName.includes('buySmartStaker') && Number(row.isError)===0) {
				if (dataTX.length === 0) {
					transactionBNB.push({
						hash: row.hash,
						method: row.method,
						value: row.value,
						float: new BigNumber(row.value).div(1E18).toFixed()
					});
				}

				valueNftBscCountSmartStaking = (Number(valueNftBscCountSmartStaking)+1).toFixed();
				if (row.value != 0){
					valueNftBscBNB = new BigNumber(valueNftBscBNB).plus(row.value).toFixed()
				}else{
					const data = mapBEP20.get(row.hash);
					if (data && data.status!=0) {
						valueNftBscBUSD = new BigNumber(valueNftBscBUSD).plus(data.value).toFixed()
					}
				}
			}
		}

		 const dtoNftTurnover = await this.calculateNFTTurnover({
			 startTime,
			 endTime
		 });

		return this.responseFormatCompareTransactionNFTTurnover({
			...dtoNftTurnover,
			valueNftBscBNB, valueNftBscBUSD, valueNftBscCountSmartLP, valueNftBscCountSmartStaking,
			transactionBNB, transactionBUSD
		});
}
	
	async addTransactionToEventService(dto:{address: string, hash: string}) {
		const data = await this.contractEventsService.addTransaction(dto).catch(err => {
			throw new Error(`Error insert transaction with server-events, ${dto} ${err}`);
		});
		
		if (data.status != 'OK') {return false};
		
		return true
		
	}
	
	async dataCompareTotalTransaction(startTime: number, endTime: number) {
		const blocks = await this.getBlockByPeriod(startTime, endTime);
		const dataBscScan: IResultTransaction[] = await this.formatDataTransactionByBlock(blocks.startBlock, blocks.endBlock);
		let valueBscBNB = '0';
		let valueBscBUSD = '0';
		
		for (const row of dataBscScan) {
			const findBEP20 = await this.bscScanHelper.resultBEP20.get(row.hash);
			if (!Boolean(findBEP20) && row.errCode==='0') { //row.tokenName === TokenName.BNB
				valueBscBNB = new BigNumber(row.value).plus(valueBscBNB).toFixed();
			} else if (Boolean(findBEP20) && row.errCode==='0') { //row.tokenName === TokenName.BUSD &&
				valueBscBUSD = new BigNumber(row.value).plus(valueBscBUSD).toFixed();
			}
		}
		
		const DtoTotalTurnover = await this.calculateTotalTurnover({
			startTime,
			endTime,
			dataBscScan,
			valueBscBUSD,
			valueBscBNB
		});
		
		
		return this.responseFormatCompareTransactionTotalTurnover({ ...DtoTotalTurnover, valueBscBNB, valueBscBUSD });
	}
	
	async responseFormatCompareTransactionTotalTurnover(dto: {
		valueBscBNB: string,
		valueBscBUSD: string,
		
		valueEnvBNB: string,
		valueEnvBUSD: string,
		
		transactionBNB: ITransactionResult[],
		transactionBUSD: ITransactionResult[],
		valueTransactionBNB: string,
		valueTransactionBUSD: string,
	}):Promise<IResponseCalculateTotalTurnover> {
		
		const response:IResponseCalculateTotalTurnover = {
			BNB: {
				bscscan: {
					value: dto.valueBscBNB,
					float: new BigNumber(dto.valueBscBNB).div(1E18).toFixed()
				},
				events: {
					value: dto.valueEnvBNB,
					float: new BigNumber(dto.valueEnvBNB).div(1E18).toFixed()
				},
				difference: {
					transaction: dto.transactionBNB,
					amount: {
						value: dto.valueTransactionBNB,
						float: new BigNumber(dto.valueTransactionBNB).div(1E18).toFixed()
					}
				}
			},
			
			BUSD: {
				events: {
					value: dto.valueEnvBUSD,
					float: new BigNumber(dto.valueEnvBUSD).div(1E18).toFixed()
				},
				bscscan: {
					value: dto.valueBscBUSD,
					float: new BigNumber(dto.valueBscBUSD).div(1E18).toFixed()
				},
				difference: {
					transaction: dto.transactionBUSD,
					amount: {
						value: dto.valueTransactionBUSD,
						float: new BigNumber(dto.valueTransactionBUSD).div(1E18).toFixed()
					}
				}
			}
		};
		
		await this.telegramService.sendMessage(`
		DIFFERENT TOTAL:
				DATA: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
				BNB: ${new BigNumber(dto.valueTransactionBNB).div(1E18).toFixed()}
				BUSD: ${new BigNumber(dto.valueTransactionBUSD).div(1E18).toFixed()}
				`);
		if(
			(new BigNumber(dto.valueTransactionBNB).toNumber()!=0) ||
			(new BigNumber(dto.valueTransactionBUSD).toNumber()!=0)
		) {
			if (this.countTotalTurnover===0) {
				await this.telegramService.sendMessage(`
			send request to new compare...
			`);
				this.logger.debug('send request to new compare...')
				await this.dataCompareTotalTransaction(1656633600, Math.trunc(new Date().getTime() / 1000));
				this.countTotalTurnover++;
			}
			// await this.telegramService.sendMessage(response.BNB.difference.transaction.toString());
		}else{
			this.countTotalTurnover=0
		}
		
		return response;
	}
	
	async responseFormatCompareTransactionNFTTurnover(dto: {
		valueNftEnvCountSmartLP: string,
		valueNftEnvCountSmartStaking: string,
		
		valueNftBscCountSmartLP: string,
		valueNftBscCountSmartStaking: string,
		
		valueNftBscBNB: string,
		valueNftBscBUSD: string,
		
		valueNftEnvBNB: string,
		valueNftEnvBUSD: string,
		
		transactionBNB: ITransactionResult[],
		transactionBUSD: ITransactionResult[]
		
	}): Promise<IResponseCalculateNFTTurnover> {
		const response: IResponseCalculateNFTTurnover = {
			countSmartLP: {
				events: dto.valueNftEnvCountSmartLP,
				bscscan: dto.valueNftBscCountSmartLP
			},
			countSmartStaking: {
				events: dto.valueNftEnvCountSmartStaking,
				bscscan: dto.valueNftBscCountSmartStaking
			},
			BNB: {
				events: {
					value: dto.valueNftEnvBNB,
					float: new BigNumber(dto.valueNftEnvBNB).div(1E18).toFixed()
				},
				bscscan: {
					value: dto.valueNftBscBNB,
					float: new BigNumber(dto.valueNftBscBNB).div(1E18).toFixed()
				},
				difference: {
					transaction: dto.transactionBNB,
					countSmartLP: parseInt(dto.valueNftBscCountSmartLP) - parseInt(dto.valueNftEnvCountSmartLP),
					countSmartStaking: parseInt(dto.valueNftBscCountSmartStaking) - parseInt(dto.valueNftEnvCountSmartStaking),
					amount: {
						value: new BigNumber(dto.valueNftBscBNB).minus(dto.valueNftEnvBNB).toFixed(),
						float: new BigNumber(new BigNumber(dto.valueNftBscBNB).minus(dto.valueNftEnvBNB)).div(1E18).toFixed()
					}
				}
				},
				BUSD: {
					events: {
						value: dto.valueNftEnvBUSD,
						float: new BigNumber(dto.valueNftEnvBUSD).div(1E18).toFixed()
					},
					bscscan: {
						value: dto.valueNftBscBUSD,
						float: new BigNumber(dto.valueNftBscBUSD).div(1E18).toFixed()
					},
					difference: {
						transaction: dto.transactionBUSD,
						amount: {
							value: new BigNumber(dto.valueNftBscBUSD).minus(dto.valueNftEnvBUSD).toFixed(),
							float: new BigNumber(new BigNumber(dto.valueNftBscBUSD).minus(dto.valueNftEnvBUSD)).div(1E18).toFixed()
						}
					}
				}
		};
		
		 await this.telegramService.sendMessage(`
		 DIFFERENT NFT:
		  		BNB: ${new BigNumber(new BigNumber(dto.valueNftBscBNB).minus(dto.valueNftEnvBNB)).div(1E18).toFixed()}
		  		BUSD:${new BigNumber(new BigNumber(dto.valueNftBscBUSD).minus(dto.valueNftEnvBUSD)).div(1E18).toFixed()}
		  		`);
		if(
			(new BigNumber(dto.valueNftBscBNB).minus(dto.valueNftEnvBNB).div(1E18).toNumber()!=0) ||
			(new BigNumber(dto.valueNftBscBUSD).minus(dto.valueNftEnvBUSD).div(1E18).toNumber()!=0)
		) {
			console.log(
				new BigNumber(dto.valueNftBscBNB).minus(dto.valueNftEnvBNB).div(1E18).toNumber(),
				new BigNumber(dto.valueNftBscBUSD).minus(dto.valueNftEnvBUSD).div(1E18).toNumber())
			await this.telegramService.sendDocument(response);
		}
		
		return response;
	}
	
	async dataTransactionByTimes(startTime: number, endTime: number) {
		const blocks = await this.getBlockByPeriod(startTime, endTime);
		const dataBscScan: IResultTransaction[] = await this.formatDataTransactionByBlock(blocks.startBlock, blocks.endBlock);
//		const calculatedData = await this.calculateDateReports(dataBscScan);
		return dataBscScan;
	}
	
	async calculateDateReports(dataBscScan: IResultTransaction[]) {
		for (const rowBsc of dataBscScan) {
			
			const txData: TransactionModel[] = await this.transactionDBService.fetchByHash(rowBsc.hash);
			
			if (txData.length > 0) {
				const resultTransaction: {}[] = [];
				
				for (const rowTx of txData) {
					const eventData: EventsModel[] = await this.eventsDBService.fetchByTransactionId(rowTx.id);
					eventData.map(async (row: any) => {
						
						const eventType: EventTypeModel | null = await this.eventsTypeDBService.findOneById(row.event_type_id);
						const data: IEventTypeBuySystemTokenFromToken & IEventTypeRegister = JSON.parse(row.data);
						const bscTransaction = 	this.resultTransactionBsc.get(rowTx.hash);

						if (eventType != null) {
							switch (eventType.title) {
								case EventsName.BuySystemTokenForToken: {
									resultTransaction.push({
										hash: rowTx.hash,
										token: data.token,
										bscValue: bscTransaction.value,
										
										tokenAmount: data.tokenAmount,
										systemToken: data.systemTokenAmount,
										swapTokenAmount: data.swapTokenAmount,
										systemTokenRecipient: data.systemTokenRecipient
									});
									break;
								}
								case EventsName.Register: {
									
									break;
								}
								case EventsName.AddUnclaimedSponsorBonus: {
									
									break;
								}
								case EventsName.ProcessCashbackBonus: {
									
									break;
								}
								case EventsName.ProcessSponsorBonus: {
									
									break;
								}
								case EventsName.RescueToken: {
									
									break;
								}
								case EventsName.ToggleUsePriceFeeds: {

									break;
								}
								case EventsName.ImportSponsorBonuses: {
									
									break;
								}
								default: {
									this.logger.log('NOT FOUND EVENT TYPE', eventType.title);
								}
							}
						}
					});
					
					// if (resultTransaction.length>0) {
					// 	this.logger.debug(`===========================================`);
					// 	console.log(rowTx.hash, resultTransaction)
					// }
				}
			}else if ((Number(rowBsc.status)) !=0 && (rowBsc.method.includes('buySystemToken'))){
				//if not transaction, create row transaction, if not method create method event
				// await this.telegramService.sendMessage(`TX HASH ${rowBsc.hash} not found in database`);//this.logger.debug(`BSCROW: ${JSON.stringify(rowBsc)}`);
				this.logger.warn(`TX HASH ${rowBsc.hash} not found in database, method: ${rowBsc.method}, status: ${rowBsc.status}`);
			}
			
		}
		
	}
	
}
