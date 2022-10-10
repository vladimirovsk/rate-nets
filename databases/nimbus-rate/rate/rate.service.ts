import { Injectable, Logger } from '@nestjs/common';
import { RateModel } from './rate.model';
import { InjectModel } from '@nestjs/sequelize';
import { IRateCreateDisabledDto, IRateCreateDto } from './rate.dto';
import sequelize, { Op } from 'sequelize';
import { ILostBlockStatus } from '../lost-blocks/lost-bloks.dto';
import { IRateSymbolTimestamp } from '../../../apps/nimbus-api/src/modules/rate/rate-api.dto';
import { RATE_NOT_FOUND } from '../../../constants';

@Injectable()
export class RateService {
	private logger = new Logger(RateService.name);
	
	constructor(
		@InjectModel(RateModel)
		private readonly rateModel: typeof RateModel
	) {
	}
	
	async deleteEmptyRate(){
		return this.rateModel.destroy({
			where:{
				block_end: 0,
				block_last:0,
				status : 0
			}
		})
	}
	
	async fetchRateBySymbolBlockStatus(payload: { block: number, symbol: string }, status: ILostBlockStatus = ILostBlockStatus.create) {
		return this.rateModel.findOne({
			where: {
				[Op.and]: [
					{ block_start: { [Op.lte]: payload.block } },
					{ block_last: { [Op.gte]: payload.block } },
					{ symbol: payload.symbol },
					{ status: status }
				]
			},
			raw: true
		}).catch(err => {
			throw err;
		})
	}
	
	async updateRate(id: number, rate: string) {
		return this.rateModel.update(
			{
				rate,
				status: 1
			},
			{
				where: {
					id
				}
			})
			.catch(err => {
				throw err;
			});
	}
	
	async updateBlockLast(id: number, block_last: number) {
		return this.rateModel.update(
			{ block_last },
			{
				where: {
					id
				}
			});
	}
	
	async updateBlockEnd(id: number, block_end: number) {
		return this.rateModel.update(
			{ block_end },
			{
				where: {
					id
				}
			});
	}
	
	async fetchRateByStatus(status: ILostBlockStatus = ILostBlockStatus.create) {
		return this.rateModel.findAll({
			where: { status },
			raw: true,
			order: ['id'],
			limit: 100
		})
			.catch(err => {
				throw err;
			});
	}
	
	async fetchRateBySymbolEndTimestamp(dto:IRateSymbolTimestamp){
		const res = await this.rateModel.findAll({
			where: {
				[Op.and]:[
					{symbol: dto.symbol},
					{time: {[Op.lte]:dto.time}}
				]
			},
			raw: true,
			limit: 1,
			order: [['id', 'DESC']]
		})
			.catch(err => {
				throw err;
			});
		
		if (res.length===0){
			throw new Error(RATE_NOT_FOUND)
		}
		return res;
	}
	
	async fetchRateBySymbol(symbol: string) {
		return this.rateModel.findOne({
			attributes: [
				'id',
				[sequelize.fn('MAX', sequelize.col('block_start')), 'block_start'],
				'rate',
				'block_last'
			],
			where: { [Op.and]: [{ symbol }, { block_end: 0 }] },
			group: ['rate', 'id'],
			raw: true
		})
			.catch(err=>{
				throw err;
			})
	}
	
	async insertNewArray(data: IRateCreateDisabledDto){
		try {
			const row = new this.rateModel();
			row.symbol = data.symbol;
			row.rate = data.rate;
			row.time = parseInt(String(new Date().getTime()/1000));
			row.block_start = data.block_start;
			row.block_end = data.block_start;
			row.block_last = data.block_last;
			row.status = data.status;
			const rateData = await row.save();
			this.logger.debug(`INSERT RECORD RATE NEW ARR ID ${rateData.id}`)
			return rateData;
		} catch (e) {
			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
	
	async insert(data: IRateCreateDto) {
		try {
			const row = new this.rateModel();
			row.symbol = data.symbol;
			row.rate = data.rate;
			row.time = parseInt(String(new Date().getTime()/1000));
			row.block_start = data.block_start;
			row.status = data.status;
			const rateData = await row.save();
			this.logger.debug(`INSERT RECORD ID ${rateData.id} ${row.symbol}:${row.rate} `)
			return rateData;
		} catch (e) {
			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
	
	async deleteDataBySymbol(symbol: string) {
		return this.rateModel.destroy({ where: { symbol } });
	}
	
}