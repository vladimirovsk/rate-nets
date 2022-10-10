export interface IBlockHeader{
	parentHash: string;
	sha3Uncles: string;
	miner: string;
	stateRoot: string;
	transactionsRoot: string;
	receiptsRoot: string;
	logsBloom: string;
	difficulty: string;
	number: number;
	gasLimit: number;
	gasUsed: number;
	timestamp: number;
	extraData: string;
	mixHash: string;
	nonce: string;
	hash:string;
	size: string;
}

export interface IBlockData{
	transactions : string[];
}

export interface ITx{
	blockHash: string;
	blockNumber: number;
	from: string;
	gas: number;
	gasPrice: string;
	hash: string;
	input: string;
	nonce: number;
	to: string;
	transactionIndex: number;
	value: string;
	type: number;
	v: string;
	r: string;
	s: string;
}