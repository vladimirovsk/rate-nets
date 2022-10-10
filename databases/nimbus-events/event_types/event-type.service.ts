import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventsModel } from '../events/events.model';
import { EventTypeModel } from './event-types.model';

@Injectable()
export class EventTypeService {
	constructor(
		@InjectModel(EventTypeModel)
		private readonly eventTypeModel: typeof EventTypeModel
	) {
	}
	
	async findAll(){
		return this.eventTypeModel.findAll({raw:true});
	}
	
	async findByTitle(title:string){
		return this.eventTypeModel.findAll({
			where: {title},
			raw:true
		});
	}
	
	async findById(id: number){
		return this.eventTypeModel.findAll({
			where: {id},
			raw:true
		});
	}
	
	async findOneById(id: number){
		return this.eventTypeModel.findOne({
			where: {id},
			raw:true
		});
	}
	
	
}