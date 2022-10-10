import { ILostBlockStatus } from '../lost-blocks/lost-bloks.dto';

export class IRateCreateDto {
	symbol:string = 'BNB';
	rate: string = '0';
	block_start: number = 0;
	status: number = 0;
}

export class IRateCreateDisabledDto {
	symbol:string = 'BNB';
	rate: string = '0';
	block_start: number = 0;
	block_end: number = 0;
	block_last: number = 0;
	status: ILostBlockStatus = ILostBlockStatus.create;
}

export enum typeStatus{
	create,
	confirm
}

export class IFetchRateDto {
	symbol: string = 'BNB';
	rate: string = '0';
	block: number = 0
}