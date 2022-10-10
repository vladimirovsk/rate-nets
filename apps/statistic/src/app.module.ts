import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { LognaLoggerModule } from '../../../middleware/logna-logger/logna.logger.module';
import { ConfigModule } from '@nestjs/config';
import { ContractStatisticModule } from './modules/contract-statistic/contract-statistic.module';

@Module({
  imports: [
    LognaLoggerModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env.statistic' }),
    ContractStatisticModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
  }
}