import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { LostBlocksModel } from './lost-blocks.model';
import { LostBlocksService } from './lost-blocks.service';


@Module({
	imports:[],
	providers:[
		LostBlocksService,
		{ provide: getModelToken(LostBlocksModel), useValue: LostBlocksModel }
	],
	exports:[
		LostBlocksService,
		{ provide: getModelToken(LostBlocksModel), useValue: LostBlocksModel }
	]
})
export class LostBlocksModule{}