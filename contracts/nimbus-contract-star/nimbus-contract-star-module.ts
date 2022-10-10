import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ContractInterfaceAsyncOptions } from '../contract.interface';
import { CONTRACT_MODULE } from '../../constants';
import { NimbusContractStarService } from './nimbus-contract-star.service';
import { RateModule } from '../../databases/nimbus-rate/rate/rate.module';
import { TokensModule } from '../../databases/nimbus-rate/tokens/tokens.module';

@Module({
	imports:[
		RateModule,
		TokensModule
	],
	providers:[
		NimbusContractStarService
	],
	exports:[
		NimbusContractStarService
	]
})

export class NimbusContractStarModule {
	static forRootAsync(options: ContractInterfaceAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionProvider(options);
		return {
			module: NimbusContractStarModule,
			imports: options.imports,
			providers: [NimbusContractStarService, asyncOptions],
			exports: [NimbusContractStarService]
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