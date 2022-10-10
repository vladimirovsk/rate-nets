import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { EventsService } from './events.service';
import { EventsModel } from './events.model';

@Module({
	imports:[],
	providers:[
		EventsService,
		{provide: getModelToken(EventsModel), useValue: EventsModel},
	],
	exports:[
		EventsService,
		{provide: getModelToken(EventsModel), useValue: EventsModel},
	],
})
export class EventsModule{}