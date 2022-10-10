import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IRateSymbolTimestamp {
	@ApiProperty({description:'timestamp in sek'})
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	time: number;
	
	@ApiProperty()
	@IsNotEmpty()
	symbol: string;
}

export class IRateApiDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	block: number;
	
	@ApiProperty()
	@IsNotEmpty()
	symbol: string;
}


export class IRateApiArrDto {
	id?:number
	
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	block_start:number;
	
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	block_end: number
}

export class IRateSymbolDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	symbol: string;
}



export class IRateResultRequest {
	symbol: string;
	rate: string;
	decimal: number;
	rate_decimal: string;
	block: number;
	source: ETypeSourceRate;
	contract?: string;
}

export class ITypeResultBlockArr {
	symbol: string;
	block: number;
	rate: string;
}

export enum ETypeSourceRate {
	database='database',
	blockchain= 'blockchain'
}

export class ITypeSourceRateDto{
	@ApiProperty({
		type:ETypeSourceRate,
		description: 'Source from read rate',
		default: ETypeSourceRate.database
	})
	source?: ETypeSourceRate
}