import { NestFactory } from '@nestjs/core';
import { SocketServiceModule } from './socket-service.module';
import { LognaLoggerService } from '../../../middleware/logna-logger/logna.logger.service';

async function bootstrap() {
	const app = await NestFactory.create(SocketServiceModule);
	app.useLogger(app.get(LognaLoggerService))
	await app.init();
}

bootstrap();
