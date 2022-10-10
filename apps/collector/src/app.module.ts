import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { LognaLoggerModule } from '../../../middleware/logna-logger/logna.logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContractEventsModule } from './modules/contract-events/contract-events.module';
import { ContractStatisticModule } from './modules/contract-statistic/contract-statistic.module';
import { BscScanModule } from './modules/bscscan/bscscan.module';
import { DatabaseModule } from '../../../databases/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramModule } from '../../../library/telegram/telegram.module';
import { getTelegramConfig } from '../../../config/telegram.config';
import { TelegrafModule } from 'nestjs-telegraf';
import LocalSession from 'telegraf-session-local';
import { TelegrafBotUpdate } from './modules/telegraf/telegraf-bot.update';
import { TelegrafBotService } from './modules/telegraf/telegraf-bot.service';
import { TelegrafBotModule } from './modules/telegraf/telegraf-bot.module';

const sessions = new LocalSession({database: 'session_db.json'});

@Module({
  imports: [
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig
    }),
    // TelegrafBotModule,
    LognaLoggerModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env.collector' }),
    ContractEventsModule,
    ContractStatisticModule,
    BscScanModule,
    DatabaseModule
  ],
  controllers: [],
  providers: []
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}