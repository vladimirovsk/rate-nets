import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { LostBlocksModel } from './lost-blocks.model';
import { ILostBlockStatus } from './lost-bloks.dto';
import { Op } from 'sequelize';


@Injectable()
export class LostBlocksService {
	private logger = new Logger(LostBlocksService.name);
	constructor(
		@InjectModel(LostBlocksModel)
		private readonly lostBlockModel: typeof LostBlocksModel
	) {
	}
	
	async fetchLostBlockByBlockStart(block: number) {
		return this.lostBlockModel.findOne({
			where: {
				block_start: block
			}
		})
			.catch(err => {
				throw new Error(err);
			});
	}
	
	async deleteLostBlockSuccessful(){
		return this.lostBlockModel.destroy({
			where: {
				status: ILostBlockStatus.successful
			}
		})
	}
	
	async fetchLostBlockByBlock(block:number){
		return this.lostBlockModel.findOne({
			where:{
				[Op.and]: [
					{ block_start: { [Op.lte]: block } },
					{ block_end: { [Op.gte]: block } }
				],
			},
			raw: true
		}).catch(err => {
			throw err;
		})
		
	}
	
	async fetchLostBlockByStatus(status: ILostBlockStatus){
		return this.lostBlockModel.findAll({
			where: {
				status
			}
		})
			.catch(err => {
				throw new Error(err);
			})
	}
	
	async updateLostBlockStatus(id: number, status: ILostBlockStatus){
		return this.lostBlockModel.update(
			{ status: status },
			{
				where: {
					id
				}
			})
			.catch(err => {
				throw new Error(err);
			});
	}
	
	async updateLostBlockEnd(id: number, block: number) {
		return this.lostBlockModel.update(
			{ block_end: block },
			{
				where: {
					id
				}
			})
			.catch(err => {
				throw new Error(err);
			});
		
	}
	
	async updateLostBlockStart(id: number, block: number) {
		return this.lostBlockModel.update(
			{ block_start: block },
			{
				where: {
					id
				}
			})
			.catch(err => {
				throw new Error(err);
			});
		
	}
	
	async insert(data: LostBlocksModel) {
		try {
			const row = new this.lostBlockModel();
			row.block_start = data.block_start;
			row.block_end = data.block_end;
			row.status = ILostBlockStatus.create;
			const rowData = await row.save();
			return rowData;
		} catch (e) {
			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
}