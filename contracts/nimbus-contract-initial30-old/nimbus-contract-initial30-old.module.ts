import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NimbusContractInitial30OldService } from './nimbus-contract-initial30-old.service';
import { RateModule } from '../../databases/nimbus-rate/rate/rate.module';
import { CONTRACT_MODULE } from '../../constants';
import { ContractInterfaceAsyncOptions } from '../contract.interface';
import { ContractsModule } from '../../databases/nimbus-rate/contracts/contracts.module';

@Module({
	imports:[
		RateModule,
		ContractsModule,
	],
	providers:[
		NimbusContractInitial30OldService,
	],
	exports:[NimbusContractInitial30OldService]
})

export class NimbusContractInitial30OldModule {
	static forRootAsync(options: ContractInterfaceAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionProvider(options);
		return {
			module: NimbusContractInitial30OldModule,
			imports: options.imports,
			providers: [NimbusContractInitial30OldService, asyncOptions],
			exports: [NimbusContractInitial30OldService]
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