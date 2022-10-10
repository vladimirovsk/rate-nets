import { IWeb3WssOptions } from './web3.wss-option';
import { ModuleMetadata } from '@nestjs/common';

export interface Web3WssInterfaceAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory:(...args: any[]) => Promise<IWeb3WssOptions> | IWeb3WssOptions
	inject?: any[];
}