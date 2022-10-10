import { ModuleMetadata } from '@nestjs/common';
import { IContractOption } from './contract.option';

export interface ContractInterfaceAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory:(...args: any[]) => Promise<IContractOption> | IContractOption
	inject?: any[];
}

export interface IRateResult{
	block: number;
	tokens: {
		symbol:string,
		rate: string
	}[];
}

export interface IRateBySymbol {
	id: number;
	block_start: number;
	rate: string;
}