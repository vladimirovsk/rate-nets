import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
// console.log('PROTO', join(__dirname, String(configService.get('DIR_PROTO'))));

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: configService.get<string>('GRPC_CONNECTION_URL') ?? 'http://localhost:5051',
    package: ['events', 'statistic'],
    protoPath: [
      join(__dirname, configService.get('DIR_PROTO')+'/contract-events.proto'),
      join(__dirname, configService.get('DIR_PROTO')+'/contract-statistic.proto')
    ]
  },
};