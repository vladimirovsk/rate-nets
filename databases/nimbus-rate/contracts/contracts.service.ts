import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractsModel } from './contracts.model';
import { Op } from 'sequelize';
import { catchError } from 'rxjs';
import { ARRAY_BLOCK_CONTRACTS_NOT_FOUND } from '../../../constants';

@Injectable()
export class ContractsService {
	private logger = new Logger(ContractsService.name);
	constructor(
		@InjectModel(ContractsModel)
		private readonly contractsModel: typeof ContractsModel
	) {
	}
	
	async fetchActiveContract(){
		return this.contractsModel.findOne({
			where:{
				active: true
			}
		})
			.catch(err=>{
				throw new Error(err);
			})
	}
	
	async fetchContractByAddress(address:string): Promise<ContractsModel | null>{
		const contract = await this.contractsModel.findOne({
			where: {
				address
			},
			raw:true
		}).catch(err=>{
			return null;
		})
		return contract;
	}
	
	async fetchContractIdByBlockNumber(block:number){
		let contract = await this.contractsModel.findOne({
			where:{
				[Op.and]: [
					{ block_start: {[Op.lte]: block} },
					{ [Op.or]:[
							{block_end: {[Op.gte]: block}},
							{block_last: {[Op.gte]: block}}
						]
					}
					],
			}
		}).catch(err=>{
			throw new Error(err);
		});
		
		if (contract===null){
			this.logger.warn(`${ARRAY_BLOCK_CONTRACTS_NOT_FOUND} set default contract  ${block}`)
			contract = await this.contractsModel.findOne({
				where:{
					active: true
				}
			})
		}
		
		return contract;
		
	}
	
	async updateNumberLastBlockByContract(id: number, block_last: number){
		return this.contractsModel.update(
			{ block_last },
			{
				where: {
					id
				}
			});
	}
	
	async fetchNumberLastBlockByContract(id: number): Promise<number> {
		const row = await this.contractsModel.findOne({
				where:{
					id
				}
		});
		
		if (row){
			return row.block_last;
		}
		else {
			return 0
		}
		
	}
}