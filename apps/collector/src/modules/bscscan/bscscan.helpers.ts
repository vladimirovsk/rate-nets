import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AsyncRequestService } from '../../../../../library/asyncrequest/asyncrequest.service';
import moment from 'moment/moment';
import { ETypeDate } from './bscscan.dto';
import { ConfigService } from '@nestjs/config';
import { currencies, TokenName } from '../../../../../constants/token';
import { EventsByNameAndTitlePeriodDto } from '../../../../../constants/events/events.dto';
import { ContractStatisticService } from '../contract-statistic/contract-statistic.service';
import { EventsName } from '../../../../../constants/events';


@Injectable()
export class BscScanHelpers {
	
	public priceCSV = new Map();
	public resultBEP20 = new Map();
	
	
	public readonly addressContractNFT = '0x5779C7291Cd9BEAFfaDbB4C47A40C7E77613a137';
	public readonly addressContractTurnover = '0x22777f4A79C2a39c47D71e4558f2245CA3afE1ED';
	public readonly addressContractBEP20 = '0x55E9C48Ac0a011358D2ceA8b2FE64816F77B5942';
	public readonly addressContractTurnoverSmartLp = '0x4032E41eAbe002f5e4b28d3B47A8E23660b09e6D';
	public readonly addressContractTurnoverSmartStaking = '0x562928062FE9052DDc01D698e222cB93a98584D0';
	
	private logger = new Logger(BscScanHelpers.name);
	private BSC_KEY: string = String(this.configService.get<string>('BSC_API_KEY'));
	private BscScanUri = 'https://api.bscscan.com/api';
	
	constructor(
		private configService: ConfigService,
		private asyncRequestService: AsyncRequestService,
		private contractStatisticService: ContractStatisticService
	) {
	}
	
	private convertPeriodTimestamp(data: number, type: ETypeDate = ETypeDate.start) {
		if (type === ETypeDate.start) {
			return moment(moment.unix(data).startOf('days')).unix();
		}
		return moment(moment.unix(data).endOf('days')).unix();
	}
	
	private getAddressByNameToken(name: TokenName): string {
		return Object.entries(currencies)
			.filter((value) => value.includes('BUSD'))
			.reduce((obj, key) => {
				return key[0];
			}, '');
	}
	
	async getPriceBNB(time: number) {
		let newTime = time;
		let timeStart = new Date().getTime();
		let timeEnd = new Date().getTime();
		while (!this.priceCSV.has(newTime) || timeEnd - timeStart > 1000) {
			console.log(timeEnd - timeStart);
			timeEnd = new Date().getTime();
			newTime = newTime - 1;
		}
		const price = this.priceCSV.get(newTime);
		return { price, 'mapTime': newTime, 'reqTime': time };
	}
	
	async getTransactionContractByBlocks(address: string, startBlock: number, endBlock:number){
		const abi = await this.getAbi(address)
		return abi;
	}
	async getAbi(address: string) {
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'contract',
				action: 'getabi',
				address,
				apikey: this.BSC_KEY
			}
		};
		return await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error('Error request ABI');
		});
	}
	
	async getBlockNumberByTimestamp(timestamp: number): Promise<number> {
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'block',
				action: 'getblocknobytime',
				timestamp: timestamp,
				closest: 'after',
				apikey: this.BSC_KEY
			}
		};
		return await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest)
			.then(async (res) => {
				if (res.status === '1') {
					return +res.result;
				} else {
					return 99999999;
				}
			})
			.catch(err => {
				return 99999999;
				//throw new Error(`Error fetch number block from time, ${JSON.stringify(err)}`);
			});
		
	}
	
	async getTransactionByAddress(address: string, startBlock: number, endBlock: number = 99999999, page: number = 1, offset: number = 10000) {
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'account',
				action: 'txlist',
				address: address,
				startblock: startBlock,
				endblock: endBlock,
				page,
				offset,
				sort: 'asc',
				apikey: this.BSC_KEY
			}
		};
		return await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error('Error getTransaction by BSCSCAN');
		});
	}
	
	async getTransaction(startBlock: number, endBlock: number = 99999999, page: number = 1, offset: number = 10000) {
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'account',
				action: 'txlist',
				address: this.addressContractTurnover,
				startblock: startBlock,
				endblock: endBlock,
				page,
				offset,
				sort: 'asc',
				apikey: this.BSC_KEY
			}
		};
		return await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error('Error getTransaction by BSCSCAN');
		});
	}
	
	async getTransactionNFTSmartStaker(startBlock: number, endBlock: number = 99999999){
		let page: number = 1, offset: number = 10000
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'account',
				action: 'txlist',
				address: this.addressContractNFT,
				startblock: startBlock,
				endblock: endBlock,
				page,
				offset,
				sort: 'asc',
				apikey: this.BSC_KEY
			}
		};
		return await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error(`Error request ABI , ${err}`);
		});
	}
	
	async getTransactionNFTSmartLP(startBlock: number, endBlock: number = 99999999){
		let page: number = 1, offset: number = 10000;
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'account',
				action: 'txlist',
				address: this.addressContractTurnoverSmartLp,
				startblock: startBlock,
				endblock: endBlock,
				page,
				offset,
				sort: 'asc',
				apikey: this.BSC_KEY
			}
		};
		return await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error(`Error request ABI , ${err}`);
		});
		
	}
	
	async getListBEP20TransferEventSmartStaker(startBlock: number, endBlock: number = 99999999, page: number = 1, offset: number = 10000){
		const resultBEP20SmartStaker = new Map();
	
		const addressBUSD: string = this.getAddressByNameToken(TokenName.BUSD);
		
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'account',
				action: 'tokentx',
				contractaddress: addressBUSD, //this is token
				address: this.addressContractBEP20, //this is contract
				startblock: startBlock,
				endblock: endBlock,
				page,
				offset,
				sort: 'asc',
				apikey: this.BSC_KEY
			}
		};
		const res = await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error(`Error request ABI , ${err}`);
		});
		
		if (res.status != '0') {
			for (const row of res.result) {
					resultBEP20SmartStaker.set(row.hash, row);
			}
		} else {
			this.logger.warn(`res.status!=0 ${JSON.stringify(res)}`)
		}
		return resultBEP20SmartStaker;
		
	}
	
	async getListBEP20TransferEventsByAddress(startBlock: number, endBlock: number = 99999999, page: number = 1, offset: number = 10000) {
		const contractBEP20 = '0x4b5aa638f29c75ac34dfacbc1392f1a2055b1e05';
		const addressBUSD: string = this.getAddressByNameToken(TokenName.BUSD);
		const configRequest: AxiosRequestConfig = {
			params: {
				module: 'account',
				action: 'tokentx',
				contractaddress: addressBUSD, //this is token
				address: contractBEP20, //this is contract
				startblock: startBlock,
				endblock: endBlock,
				page,
				offset,
				sort: 'asc',
				apikey: this.BSC_KEY
			}
		};
		const res = await this.asyncRequestService.sendRequestGet(this.BscScanUri, configRequest).catch(err => {
			throw new Error(`Error request ABI , ${err}`);
		});
		
		if (res.status != '0') {
			for (const row of res.result) {
				this.resultBEP20.set(row.hash, row);
			}
		} else {
			this.logger.warn(`res.status!=0 ${JSON.stringify(res)}`)
		}
	}
	
	
	async getEventsByPeriodEndName(dto: EventsByNameAndTitlePeriodDto) {
		return this.contractStatisticService.fetchFromCompareStatisticPeriod(dto)
	}
}