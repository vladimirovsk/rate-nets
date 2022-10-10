import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { TransactionService } from './transaction.service';
import { TransactionModel } from './transaction.model';

@Module({
	imports: [],
	providers: [
		TransactionService,
		{ provide: getModelToken(TransactionModel), useValue: TransactionModel }
	],
	exports: [
		TransactionService,
		{ provide: getModelToken(TransactionModel), useValue: TransactionModel }
	]
})
export class TransactionModule {

}