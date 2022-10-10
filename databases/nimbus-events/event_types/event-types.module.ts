import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { EventTypeModel } from './event-types.model';
import { EventTypeService } from './event-type.service';

@Module({
	imports:[],
	providers:[
		EventTypeService,
		{provide: getModelToken(EventTypeModel), useValue: EventTypeModel},
	],
	exports:[
		EventTypeService,
		{provide: getModelToken(EventTypeModel), useValue: EventTypeModel},
	],
})
export class EventTypeModule{}