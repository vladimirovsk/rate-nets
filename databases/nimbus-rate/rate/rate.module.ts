import { Module } from '@nestjs/common';
import { RateModel } from './rate.model';
import { getModelToken } from '@nestjs/sequelize';
import { RateService } from './rate.service';

@Module({
	imports:[],
	providers:[
		RateService,
		{provide: getModelToken(RateModel), useValue: RateModel},
	],
	exports: [
		RateService,
		{provide: getModelToken(RateModel), useValue: RateModel},
	]
})
export class RateModule {

}