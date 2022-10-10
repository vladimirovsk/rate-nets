import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DataEventsBlockModel } from './data-events-block.model';


@Injectable()
export class DataEventsBlockService {
	private logger = new Logger(DataEventsBlockService.name);
	
	constructor(
		@InjectModel(DataEventsBlockModel)
		private readonly dataEventsBlockModel: typeof DataEventsBlockModel
	) {
	}
	
	async findAll() {
		return this.dataEventsBlockModel.findAll({	raw: true});
	}
	
	async fetchByEvent(event: string = 'BuySystemTokenForToken') {
		return this.dataEventsBlockModel.findAll({
			where: { event},
			raw: true,
		});
	}
	
	async fetchByBlockEndEvents(event: string = 'BuySystemTokenForToken', blockNumber: number){
		return this.dataEventsBlockModel.findAll({
			where: { event, blockNumber},
			raw: true,
		});
	}
	
}