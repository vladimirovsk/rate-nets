import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NimbusContractInitial30NewService } from './nimbus-contract-initial30-new.service';
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
		NimbusContractInitial30NewService,
	],
	exports:[NimbusContractInitial30NewService]
})

export class NimbusContractInitial30NewModule {
	static forRootAsync(options: ContractInterfaceAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionProvider(options);
		return {
			module: NimbusContractInitial30NewModule,
			imports: options.imports,
			providers: [NimbusContractInitial30NewService, asyncOptions],
			exports: [NimbusContractInitial30NewService]
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