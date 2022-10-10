import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RateApiService } from './rate-api.service';
import { RateModule } from '../../../../../databases/nimbus-rate/rate/rate.module';
import { RateApiController } from './rate-api.controller';
import { ContractsModule } from '../../../../../databases/nimbus-rate/contracts/contracts.module';
import { getContractConfig } from '../../../../../contracts/contract.config';
import { NimbusContractMainModule } from '../../../../../contracts/nimbus-contract-main/nimbus-contract-main.module';
import { NimbusContractInitial30OldModule } from '../../../../../contracts/nimbus-contract-initial30-old/nimbus-contract-initial30-old.module';
import { NimbusContractInitial30NewModule } from '../../../../../contracts/nimbus-contract-initial30-new/nimbus-contract-initial30-new.module';
import { TokensModule } from '../../../../../databases/nimbus-rate/tokens/tokens.module';
import { NimbusContractStarModule } from '../../../../../contracts/nimbus-contract-star/nimbus-contract-star-module';
import { LostBlocksModule } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.module';


@Module({
	imports:[
		RateModule,
		TokensModule,
		ContractsModule,
		LostBlocksModule,
		NimbusContractMainModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		NimbusContractInitial30OldModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		NimbusContractInitial30NewModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		NimbusContractStarModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
	
	],
	providers:[
		RateApiService
	],
	controllers:[RateApiController],
	exports:[
		RateApiService,
		RateModule,
		ContractsModule,
		TokensModule,
		LostBlocksModule,
		NimbusContractMainModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		NimbusContractInitial30OldModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		NimbusContractInitial30NewModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		NimbusContractStarModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
	
	]
})
export class RateApiModule {}