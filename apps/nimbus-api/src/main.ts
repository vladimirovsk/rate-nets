import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { LognaLoggerService } from '../../../middleware/logna-logger/logna.logger.service';
import { grpcClientOptions } from '../../collector/src/grpc.option';

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});
	const workDir = process.cwd();
	
	const configService = app.get(ConfigService);
	ConfigModule.forRoot({ envFilePath: 'envs/.env' });
	app.enableCors();
	app.useLogger(app.get(LognaLoggerService));
	app.useGlobalPipes(new ValidationPipe());

	app.useStaticAssets(join(workDir , '/public/socket'), {
		prefix: `/socket`
	});
	
	app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);
	app.useWebSocketAdapter(new IoAdapter(app));
	// await app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
	
	await app.startAllMicroservices()
		.then(() =>
			logger.debug('Start Microservices')
		)
		.catch((err: Function) => logger.error('Error start Microservices', err));
	
	
	const config = new DocumentBuilder()
		.setTitle('REST Rate')
		.setDescription('The rest API description')
		.setVersion('0.2')
		.addTag('rate')
		.build();
	
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('doc', app, document);
	
	await app.listen(+configService.get('API_PORT') ?? 3000, async () => {
		logger.log(`Application is running on: ${await app.getUrl()}`);
	});
	
}

bootstrap();
