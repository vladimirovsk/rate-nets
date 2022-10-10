import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NimbusContractMainService } from './nimbus-contract-main.service';
import { RateModule } from '../../databases/nimbus-rate/rate/rate.module';
import { CONTRACT_MODULE } from '../../constants';
import { ContractInterfaceAsyncOptions } from '../contract.interface';
import { TokensModule } from '../../databases/nimbus-rate/tokens/tokens.module';

@Module({
	imports: [
		RateModule,
		TokensModule
	],
	providers: [
		NimbusContractMainService
	],
	exports: [NimbusContractMainService]
})

export class NimbusContractMainModule {
	static forRootAsync(options: ContractInterfaceAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionProvider(options);
		return {
			module: NimbusContractMainModule,
			imports: options.imports,
			providers: [NimbusContractMainService, asyncOptions],
			exports: [NimbusContractMainService]
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