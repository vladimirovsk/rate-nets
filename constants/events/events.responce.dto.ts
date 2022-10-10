import { ApiProperty } from '@nestjs/swagger';
import { defaultResponseData } from './events.default';

export class ResponseEventServiceDateDetail {
	0?: string;
	1?: string;
	2?: string;
	3?: string;
	4?: string;
	5?: string;
	
	
	@ApiProperty({default:'0xA2CA18FC541B7B101c64E64bBc2834B05066248b'})
	token: string;
	
	@ApiProperty({default: '2'})
	stakingPool: string;
	
	@ApiProperty({default: '10000000000000000'})
	tokenAmount: string;
	
	@ApiProperty({default: '1286683120593278846066'})
	systemTokenAmount: string;
	
	@ApiProperty({default: '151937813386802915'})
	swapTokenAmount: string;
	
	@ApiProperty({default: '0x23152E01CA5ae436D0D433dEf3c79dFa322179f3'})
	systemTokenRecipient: string;
}

export class ResponseEventServiceDateRows {
	@ApiProperty({default: 1})
	id: number;
	
	@ApiProperty()
	data: ResponseEventServiceDateDetail | any;
	
	@ApiProperty({default: 19175041})
	block?: number;
	
	@ApiProperty({default: 1656695601})
	time?: number;
	
	@ApiProperty({default: '0xc81d960c0fd97d708f2842f94f426320b743397492b6c88a84367d90a478a66a'})
	hash: string;
	
	block_number?: number;
	block_time?: number;
	
}

export class ResponseEventServiceDate {
	@ApiProperty({default:'BuySystemTokenForToken'})
	title: string;
	@ApiProperty({default:defaultResponseData})
	data: ResponseEventServiceDateRows[];
}

export class ResponseEventService {
	
	@ApiProperty({default:'OK'})
	status: string;
	
	@ApiProperty()
	data: ResponseEventServiceDate;
}
