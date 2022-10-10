import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SocketServiceService } from './socket-service.service';
import { Web3WssModule } from './modules/web3.wss-modules/web3.wss-module';
import { NimbusContractMainModule } from '../../../contracts/nimbus-contract-main/nimbus-contract-main.module';
import { DatabaseModule } from '../../../databases/database.module';
import { getWeb3WssConfig } from './modules/web3.wss-modules/web3.wss-config';
import { ContractsModule } from '../../../databases/nimbus-rate/contracts/contracts.module';
import { getContractConfig } from '../../../contracts/contract.config';
import { LognaLoggerModule } from '../../../middleware/logna-logger/logna.logger.module';

@Module({
	imports: [
		LognaLoggerModule,
		ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env' }),
		DatabaseModule,
		Web3WssModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getWeb3WssConfig
		}),
		NimbusContractMainModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: getContractConfig
		}),
		ContractsModule
	],
	providers: [SocketServiceService]
})
export class SocketServiceModule {
}
