import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventsModel } from './events.model';

@Injectable()
export class EventsService {
	private logger = new Logger(EventsService.name);
	
	constructor(
		@InjectModel(EventsModel)
		private readonly eventsModel: typeof EventsModel
	) {
	}
	
	async findAll(){
		return this.eventsModel.findAll({raw: true});
	}
	
	async fetchEventsByTransactionIdEventId(transaction_id: number, eventId: number){
		return this.eventsModel.findAll({
			where: {
				event_type_id:eventId,
				transaction_id
			},
			raw: true
		});
	}
	
	async fetchByTransactionId(transaction_id: number){
		return this.eventsModel.findAll({
			where: {
				transaction_id
			},
			raw: true
		});
	}
}