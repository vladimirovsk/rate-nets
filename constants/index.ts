import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export const SEQUELIZE_NIMBUS_RATE = 'SEQUELIZE_NIMBUS_RATE';
export const SEQUELIZE_NIMBUS_AFFILATE = 'SEQUELIZE_NIMBUS_AFFILATE';
export const SEQUELIZE_NIMBUS_EVENTS = 'SEQUELIZE_NIMBUS_EVENTS';

export const EVENTS_CONTRACT = 'EVENTS_CONTRACT';
export const EVENT_NAME_NOT_FOUND = 'EVENT NAME NOT FOUND';
export const EVENT_CONVERTER_ERROR = 'EVENT CONVERTER ERROR';

export const NEW_BLOCK_HEADER = 'newBlockHeaders';
export const ERROR_CREATE_RECORD = 'Error create record';
export const WEB3WSS_MODULE = 'WEB3WSS_MODULE';
export const CONTRACT_MODULE = 'CONTRACT_MODULE';
export const BLOCK_NOT_FOUND = 'Block not found';
export const ARRAY_BLOCK_CONTRACTS_NOT_FOUND = 'ARRAY BLOCK CONTRACTS NOT FOUND';
export const RATE_NOT_FOUND = 'Rate not found';
export const TOKEN_NOT_FOUND = 'Token not found';
export const ERROR_METHOD_CONTRACT = 'ERROR METHOD CONTRACT';
export const ERROR_CHECK_LOST_BLOCK = 'ERROR CHECK LOST BLOCK';
export const ERROR_READ_TABLE_TOKEN = 'Error read table tokens';
export const ERROR_READ_ARR_BLOCK = 'Error read arr bloks';


export class IPeriodDto {
	@ApiProperty({
		description: 'timestamp format: ' + Math.trunc(new Date().getTime() / 1000),
		default: Math.trunc(new Date().getTime() / 1000),
		type: Number
	})
	@IsInt()
	@Type(() => Number)
	startPeriod: number;
	
	@ApiProperty({
		description: 'timestamp format: ' + Math.trunc(new Date().getTime() / 1000),
		default: Math.trunc(new Date().getTime() / 1000),
		type: Number
	})
	@IsInt()
	@Type(() => Number)
	endPeriod: number;
}

export enum ETypeSourceRate {
	database = 'database',
	blockchain = 'blockchain'
}

