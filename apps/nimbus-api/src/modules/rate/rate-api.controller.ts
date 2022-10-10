import {
	BadRequestException,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RateApiService } from './rate-api.service';
import { IRateApiArrDto, IRateApiDto, IRateSymbolTimestamp, ITypeSourceRateDto } from './rate-api.dto';
import { LostBlocksService } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.service';


@Controller('rate')
export class RateApiController {
	constructor(
		private rateApiService: RateApiService,
	) {
	}
	
	@ApiTags()
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Get('')
	async fetchRateByBlockNumberAndSymbol(
		@Query() dto: IRateApiDto,
		@Query() rateDtoSource: ITypeSourceRateDto
	) {
		return this.rateApiService.fetchRateByBlockAndSymbol(dto, rateDtoSource.source)
			.catch((err) => {
				throw new BadRequestException(err.message);
			});
	}
	
	@ApiTags()
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Get('new-rate-arr')
	async fetchGateArr(@Query() dto: IRateApiArrDto){
		const batchArr: number[]= [];
		for (let i=dto.block_start; i<=dto.block_end; i++){
			batchArr.push(i);
		}
		return this.rateApiService.calculateFromOldContractBatchArr(batchArr)
	}
	
	@ApiTags()
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Get('/time')
	async getRateBySymbolTimestamp(
		@Query() dto: IRateSymbolTimestamp,
	) {
		return this.rateApiService.fetchRateBySymbolTimestamp(dto)
			.catch((err) => {
				throw new BadRequestException(err.message);
			});
	}
	
	@ApiTags()
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Get('/token')
	async fetchLastRateBySymbol(
		@Query('symbol') symbol: string,
	  @Query() rateDtoSource: ITypeSourceRateDto
	) {
		return this.rateApiService.fetchLastRateBySymbol(symbol, rateDtoSource.source)
			.catch((err) => {
				throw new BadRequestException(err.message);
			});
	}
}