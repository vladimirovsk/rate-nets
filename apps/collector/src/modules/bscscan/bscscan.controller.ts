import { Controller, Get, Logger, OnModuleInit, Query, StreamableFile } from '@nestjs/common';
import { BscScanService } from './bscscan.service';
import { Parser } from 'json2csv';
import fs, { createReadStream } from 'fs';
import { Cron } from '@nestjs/schedule';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('bscscan')
@Controller('bscscan')
export class BscScanController implements OnModuleInit{
	private logger = new Logger(BscScanController.name);
	private Parser = new Parser();
	private startTime = new Date().getTime();
	
	constructor(
		private bscScanService:BscScanService
	) {
	}
	onModuleInit(): any {

	}
	
	@Cron('0 0 0 * * *', {name: 'calculate-difference'})
	private async differentBscScanEventDB() {
		this.logger.debug(`Start compare ${Math.trunc(this.startTime / 1000)}`);
		this.bscScanService.setCountTotalTurnover(0);
		await this.bscScanService.dataCompareTotalTransaction(1656633600, Math.trunc(new Date().getTime() / 1000));
		await this.bscScanService.dataCompareNftTransaction(1656633600, Math.trunc(new Date().getTime() / 1000));
		this.logger.debug(`End compare ${(new Date().getTime() - this.startTime) / 1000} sek`);
		this.startTime = new Date().getTime();
	}
	
	@Get('contract-info-period')
	async ContractInfoPeriod(
		@Query('address') address: string,
		@Query('start') start: number,
		@Query('end') end: number,
		@Query('page') page: number = 1,
		@Query('offset') offset: number = 1000): Promise<StreamableFile> {
		const formatData = await this.bscScanService.dataTransactionContractByTimes(address, start, end, page, offset);
		const csv = this.Parser.parse(formatData);
		fs.writeFileSync('temp.csv', csv);
		const file = createReadStream('temp.csv');
		return new StreamableFile(file);
	}
	
	
	@Get('blocks')
	async getGitFileBscScanByBlocks(
		@Query('start') start: number,
		@Query('end') end: number): Promise<StreamableFile> {
		const formatData = await this.bscScanService.formatDataTransactionByBlock(start, end);
		const csv = this.Parser.parse(formatData);
		fs.writeFileSync('temp.csv', csv);
		const file = createReadStream('temp.csv');
		
		return new StreamableFile(file);
	}
	
	@Get('times')
	async getGitFileBscScanByTimes(
		@Query('start') start:number,
		@Query('end') end:number ){//: Promise<StreamableFile>{
		const formatData = await this.bscScanService.dataTransactionByTimes(start, end);
		return formatData;
		// const csv = this.Parser.parse(formatData);
		// fs.writeFileSync('temp.csv', csv);
		// const file =  createReadStream('temp.csv');
		// return new StreamableFile(file);
	}
	
	@ApiProperty()
	@Get('compare-total')
	async getCompareTotalBscScanByTimes(
		@Query('start') start:number,
		@Query('end') end:number ){//: Promise<StreamableFile>{
		const formatData = await this.bscScanService.dataCompareTotalTransaction(start, end);
		return formatData;
	}
	@ApiProperty()
	@Get('compare-nft')
	async getCompareNftBscScanByTimes(
		@Query('start') start:number,
		@Query('end') end:number ){//: Promise<StreamableFile>{
		const formatData = await this.bscScanService.dataCompareNftTransaction(start, end);
		return formatData;
	}
	
}