import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsModel } from './contracts.model';
import { getModelToken } from '@nestjs/sequelize';

@Module({
	imports: [],
	providers: [
		ContractsService,
		{ provide: getModelToken(ContractsModel), useValue: ContractsModel }
	],
	exports: [
		ContractsService,
		{ provide: getModelToken(ContractsModel), useValue: ContractsModel }]
})
export class ContractsModule {

}