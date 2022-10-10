import { Module } from '@nestjs/common';
import { DataEventsBlockService } from './data-events-block.service';
import { getModelToken } from '@nestjs/sequelize';
import { DataEventsBlockModel } from './data-events-block.model';

@Module({
	imports:[],
	providers:[
		DataEventsBlockService,
		{provide: getModelToken(DataEventsBlockModel), useValue: DataEventsBlockModel},
	],
	exports:[
		DataEventsBlockService,
		{provide: getModelToken(DataEventsBlockModel), useValue: DataEventsBlockModel},
	]
})
export class DataEventsBlockModule{}
