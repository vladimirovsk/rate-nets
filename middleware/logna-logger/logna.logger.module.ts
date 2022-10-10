import { Module } from '@nestjs/common';
import { LognaLoggerService } from './logna.logger.service';

@Module({
	providers: [LognaLoggerService],
	exports: [LognaLoggerService]
})
export class LognaLoggerModule {

}