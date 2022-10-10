import { Interval } from '@nestjs/schedule';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { LostBlocksService } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.service';
import { RateApiService } from '../rate/rate-api.service';
import { ILostBlockStatus } from '../../../../../databases/nimbus-rate/lost-blocks/lost-bloks.dto';
import { ERROR_CHECK_LOST_BLOCK } from '../../../../../constants';
import { RateService } from '../../../../../databases/nimbus-rate/rate/rate.service';

@Injectable()
export class CheckLostBlockService implements OnModuleInit {
	private logger = new Logger(CheckLostBlockService.name);
	private checkLostBlocksStart:boolean = true;
	private checkLostBlocksCompleteStart:boolean = true;
	
	constructor(
		private lostBlockDBService: LostBlocksService,
		private rateDBService: RateService,
		private rateApiService: RateApiService
	) {
	}
	async onModuleInit() {
		const lostBlocks = await this.lostBlockDBService.fetchLostBlockByStatus(ILostBlockStatus.checking);
		for await (const row of lostBlocks){
			await this.lostBlockDBService.updateLostBlockStatus(row.id, ILostBlockStatus.create);
		}
	}
	
	@Interval('CheckLostBlocksCompete', 10000)
	async checkLostBlocksCompete(){
		if (this.checkLostBlocksCompleteStart){
			this.checkLostBlocksCompleteStart = false;
			await this.lostBlockDBService.deleteLostBlockSuccessful();
			this.checkLostBlocksCompleteStart = true;
		}
	}
	
	@Interval('CheckLostBlocks', 1000)
	async checkLostBlocks(){
		if (this.checkLostBlocksStart) {
			this.checkLostBlocksStart = false;
			
			const rowsLostBlock = await this.lostBlockDBService.fetchLostBlockByStatus(ILostBlockStatus.create);
				for await (const row of rowsLostBlock) {
					await this.lostBlockDBService.updateLostBlockStatus(row.id,ILostBlockStatus.checking);
					this.logger.debug(`Start checking array ${row.block_start} - ${row.block_end}`);
					
					const result = await this.rateApiService.fetchNewRateByBlocksArr(this.lostBlockDBService, {
						id: row.id,
						block_start:row.block_start,
						block_end:row.block_end
					})
						.catch(async (err)=>{
							await this.lostBlockDBService.updateLostBlockStatus(row.id, ILostBlockStatus.create);
							this.logger.error(`${ERROR_CHECK_LOST_BLOCK}, ${err}`);
						})
					
					if (result!=null) {
						this.logger.debug(`Update lost block successful countBlocks: ${result.countBlocks} stage count: ${result.stageCount}`);
						await this.lostBlockDBService.updateLostBlockStatus(row.id, ILostBlockStatus.successful);
						this.logger.debug(`Start checking array ${row.block_start} - ${row.block_end}`);
					}
				}
			this.checkLostBlocksStart = true;
		}
	}
}