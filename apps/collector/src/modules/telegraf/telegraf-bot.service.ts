import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BscScanService } from '../bscscan/bscscan.service';

@Injectable()
export class TelegrafBotService{
	
	constructor(
		private configService: ConfigService,
		private bscScanService: BscScanService
	) {
	}
	
	async startCompareTotal(start:number, end:number){
		await this.bscScanService.dataCompareTotalTransaction(start, end);
	}
	
	async startCompareNft(start:number, end:number){
		await this.bscScanService.dataCompareNftTransaction(start, end);
	}
}