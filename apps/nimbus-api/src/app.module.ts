import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from '../../../databases/database.module';
import { RateApiModule } from './modules/rate/rate-api.module';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { CheckLostBlockModule } from './modules/check-lost-bloks/check-lost-block.module';
import { LognaLoggerModule } from '../../../middleware/logna-logger/logna.logger.module';

@Module({
	imports: [
		LognaLoggerModule,
		ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env' }),
		ScheduleModule.forRoot(),
		DatabaseModule,
		RateApiModule,
		CheckLostBlockModule,
		WebsocketModule
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
