import { ApiProperty } from '@nestjs/swagger';
import { EventsName } from './index';
import { TokenName } from '../token';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class EventsByNameAndTitleDto {
	@ApiProperty()
	name: EventsName;
	
	@ApiProperty()
	title: TokenName;
}

export class EventsByNameAndTitlePeriodDto extends EventsByNameAndTitleDto {
	constructor() {
		super();
	}
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

export class ResponseUSDRate {
	[index: string]: any
	
	@ApiProperty()
	systemTokenAmount: string;
	
	@ApiProperty()
	systemTokenRecipient: string;
	
	@ApiProperty()
	usdTokenAmount: string;
	
	@ApiProperty()
	token: string;
	
	@ApiProperty()
	tokenAmount: string;
	
	@ApiProperty()
	block: number;
	
	@ApiProperty()
	time: number;
}

export class IEventTypeBuySystemTokenFromToken {
	'0': string;
	'1': string;
	'2': string;
	'3': string;
	'4': string;
	'5': string;
	token: string;
	stakingPool: string;
	tokenAmount: string;
	systemTokenAmount: string;
	swapTokenAmount: string;
	systemTokenRecipient: string;
}


export class IEventTypeRegister {
	'0': string;
	'1': string;
	'2': string;
	'3': string;
	user: string;
	userId: string;
	sponsorId: string;
	userType: string;
}

export class IEventTypeAddUnclaimedSponsorBonus {
	'0': string;
	'1': string;
	'2': string;
	'3': string;
	sponsor: string;
	user: string;
	systemTokenAmount: string;
	swapTokenAmount: string;
}

export class IEventTypeProcessCashbackBonus {
	'0': string;
	'1': string;
	'2': string;
	'3': string;
	'4': string;
	'5': string;
	to: string;
	nftContract: string;
	nftTokenId: string;
	purchaseToken: string;
	amount: string;
	timestamp: string;
}

export class IEventTypeProcessSponsorBonus {
	'0': string;
	'1': string;
	'2': string;
	'3': string;
	'4': string;
	user: string;
	nftContract: string;
	nftTokenId: string;
	amount: string;
	timestamp: string;
}

export class IEventTypeToggleUsePriceFeeds {
	'0': boolean;
	usePriceFeeds: boolean;
}

export class IEventTypeImportSponsorBonuses {
	'0': string;
	'1':  string;
	'2': boolean;
	'3': boolean;
	user:  string;
	amount:  string;
	isEquivalent: boolean;
	addToExistent: boolean;
}









