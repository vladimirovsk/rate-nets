import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Web3WssService } from './web3.wss-service';

import { RateModule } from '../../../../../databases/nimbus-rate/rate/rate.module';
import { Web3WssInterfaceAsyncOptions } from './web3.wss-interface';
import { WEB3WSS_MODULE } from '../../../../../constants';
import { ContractsModule } from '../../../../../databases/nimbus-rate/contracts/contracts.module';
import { NimbusContractMainModule } from '../../../../../contracts/nimbus-contract-main/nimbus-contract-main.module';
import { getContractConfig } from '../../../../../contracts/contract.config';
import { LostBlocksModule } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.module';
import { TokensModule } from '../../../../../databases/nimbus-rate/tokens/tokens.module';

@Module({
	imports:
		[
			ConfigModule,
			RateModule,
			ContractsModule,
			LostBlocksModule,
			TokensModule,
			NimbusContractMainModule.forRootAsync({
				imports:[ConfigModule],
				inject: [ConfigService],
				useFactory: getContractConfig
			})
		],
	controllers: [],
	exports: [
		Web3WssService
	],
	providers: [
		Web3WssService
	]
})

export class Web3WssModule {
	static forRootAsync(options: Web3WssInterfaceAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionProvider(options);
		return {
			module: Web3WssModule,
			imports: options.imports,
			providers: [Web3WssService, asyncOptions],
			exports: [Web3WssService]
		};
	}
	
	private static createAsyncOptionProvider(options: Web3WssInterfaceAsyncOptions): Provider {
		return {
			provide: WEB3WSS_MODULE,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || []
		};
	}
}
