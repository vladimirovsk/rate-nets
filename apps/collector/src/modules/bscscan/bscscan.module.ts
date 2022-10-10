import { Module } from '@nestjs/common';
import { AsyncRequestModule } from '../../../../../library/asyncrequest/asyncrequest.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BscScanService } from './bscscan.service';
import { BscScanController } from './bscscan.controller';
import { TelegramModule } from '../../../../../library/telegram/telegram.module';
import { getTelegramConfig } from '../../../../../config/telegram.config';
import { EventsModule } from '../../../../../databases/nimbus-events/events/events.module';
import { TransactionModule } from '../../../../../databases/nimbus-events/transactions/transaction.module';
import { EventTypeModule } from '../../../../../databases/nimbus-events/event_types/event-types.module';
import { BscScanHelpers } from './bscscan.helpers';
import { ContractStatisticModule } from '../contract-statistic/contract-statistic.module';
import { ContractStatisticCalculate } from '../contract-statistic/contract-statistic.calculate';
import { NimbusRateService } from '../nimbus-rate/nimbus-rate.service';
import { NimbusRateModule } from '../nimbus-rate/nimbus-rate.module';
import { ContractEventsService } from '../contract-events/contract-events.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env' }),
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTelegramConfig
		}),
		AsyncRequestModule,
		NimbusRateModule,
		ContractStatisticModule,
		TransactionModule,
		EventsModule,
		EventTypeModule,
	],
	providers: [BscScanService, BscScanHelpers, ContractStatisticCalculate, ContractEventsService, NimbusRateService],
	controllers: [BscScanController],
	exports: [BscScanService]
})
export class BscScanModule {

}