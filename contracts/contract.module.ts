import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CONTRACT_MODULE } from '../constants';
import { ContractService } from './contract.service';
import { ContractInterfaceAsyncOptions } from './contract.interface';

@Module({
	imports: [],
	providers: [ContractService],
	exports: [ContractService]
})
export class ContractModule {
	static forRootAsync(options: ContractInterfaceAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionProvider(options);
		return {
			module: ContractModule,
			imports: options.imports,
			providers: [ContractService, asyncOptions],
			exports: [ContractService]
		};
	}
	
	private static createAsyncOptionProvider(options: ContractInterfaceAsyncOptions): Provider {
		return {
			provide: CONTRACT_MODULE,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || []
		};
	}
	
}