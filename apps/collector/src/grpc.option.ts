import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: configService.get<string>('GRPC_CONNECTION_URL') ?? 'localhost:5051',
    package: ['events', 'statistics' ],
    protoPath: [
      join(__dirname, configService.get('DIR_PROTO')+'/contract-events.proto'),
      join(__dirname, configService.get('DIR_PROTO')+'/contract-statistic.proto')
    ]
  },
};