import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';

import { LognaLoggerService } from '../../../middleware/logna-logger/logna.logger.service'
import { NotFoundExceptionFilter } from '../../../filter/not-found-exception-filter';
import { grpcClientOptions } from './grpc.option';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const configService = app.get(ConfigService);
  ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env.collector'});
  
  app.enableCors();
  app.useLogger(app.get(LognaLoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);

  await app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  
  const config = new DocumentBuilder()
    .setTitle('API Nimbus collector')
    .setDescription('NIMBUS COLLECTOR')
    .setVersion('0.1')
    .addTag('collector')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.startAllMicroservices()
    .then((payload) =>
      logger.debug('Start Microservices')
    )
    .catch((err) => logger.error('Error start Microservices', err));
  await app.listen(+configService.get('REST_PORT') ?? 3000,  async () => {
    logger.debug(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
