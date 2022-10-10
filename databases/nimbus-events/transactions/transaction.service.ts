import { InjectModel } from '@nestjs/sequelize';
import { TransactionModel } from './transaction.model';
import { Op } from 'sequelize';

export class TransactionService {
	
	constructor(
		@InjectModel(TransactionModel)
		private readonly transactionModel: typeof TransactionModel
	) {
	}
	
	async findAll() {
		return this.transactionModel.findAll({ raw: true });
	}
	
	async fetchByPeriod(dataStart: number, dataEnd: number){
		return this.transactionModel.findAll({
			where: {
			
			},
			raw: true
		})
	}
	
	async fetchByHash(hash:string){
		return this.transactionModel.findAll({
			where: {
				hash:{[Op.iLike]: hash}
			},
			raw: true
		})
	}
	
	async fetchTransactionByBlock(block: number) {
		return this.transactionModel.findAll({
			where:{
				block_number: block
			},
			raw: true
		})
		
	}
	
	async fetchTransactionByID(id: number){
		return this.transactionModel.findAll({
			where:{
				id
			},
			raw: true
		})
	}
}