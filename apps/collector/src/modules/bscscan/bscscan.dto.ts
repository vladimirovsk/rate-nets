import { ApiProperty } from '@nestjs/swagger';

export enum ETypeDate {
	start,
	end,
	ETypeDate
}

export class ITransactionResult {
	@ApiProperty()
	hash: string;
	@ApiProperty()
	method?: string;
	@ApiProperty()
	value: string;
	@ApiProperty()
	float: string;
}


class CountSmartStructure{
	@ApiProperty()
	events: string;
	@ApiProperty()
	bscscan: string;
}

class TokenValueStructure{
	@ApiProperty()
	value:string;
	
	@ApiProperty()
	float: string;
	
}

class DifferenceStructure{
	@ApiProperty()
	transaction: ITransactionResult[];
	
	@ApiProperty()
	countSmartLP?: number;
	
	@ApiProperty()
	countSmartStaking?: number;
	
	@ApiProperty()
	amount: TokenValueStructure;
}

class TokenReport {
	@ApiProperty()
	events:TokenValueStructure;
	
	@ApiProperty()
	bscscan: TokenValueStructure;
	
	@ApiProperty()
	difference: DifferenceStructure
}

export class IResponseCalculateTotalTurnover {
	@ApiProperty()
	BNB:TokenReport;
	
	@ApiProperty()
	BUSD: TokenReport;
}

export class IResponseCalculateNFTTurnover extends IResponseCalculateTotalTurnover {
	@ApiProperty()
	countSmartLP:CountSmartStructure;
	
	@ApiProperty()
	countSmartStaking: CountSmartStructure;
}




export class ITransactionResponseResult {
	blockNumber: string;
	timeStamp: string;
	hash: string;
	nonce: string;
	blockHash: string;
	transactionIndex: string;
	from: string;
	to: string;
	value: string;
	gas: string;
	gasPrice: string;
	isError: string;
	txreceipt_status: string;
	input: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	gasUsed: string;
	confirmations: string;
	methodId: string;
	functionName: string;
	
}

export class ITransactionResponse{
	status:string;
	message: string;
	result: ITransactionResponseResult[];
}

export class IResultTransaction {
	hash: string;
	blockNumber: string;
	blockTime: string;
	from: string;
	to: string;
	tokenName: string;
	contractAddress:string;
	value: string;
	currentValue: string;
	feeBNB: string;
	feeUSD: string;
	HistoricalPrice: string;
	status: string;
	errCode: string;
	method: string;
}