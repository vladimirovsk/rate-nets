import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LognaLoggerService } from "../../../middleware/logna-logger/logna.logger.service";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NotFoundExceptionFilter } from "../../../filter/not-found-exception-filter";
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  const configService = app.get(ConfigService);
  ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.env.statistic' });

  app.enableCors();
  app.useLogger(app.get(LognaLoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);
  
  const config = new DocumentBuilder()
    .setTitle('API Nimbus statistic')
    .setDescription('API NIMBUS STATISTIC')
    .setVersion('0.1')
    .addTag('statistic')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(+configService.get('REST_PORT') ?? 3000, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
