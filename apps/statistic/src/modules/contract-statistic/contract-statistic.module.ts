import { Module } from '@nestjs/common';
import { ContractStatisticService } from './contract-statistic.service';
import { grpcClientOptions } from '../../grpc.option';
import { EVENTS_CONTRACT } from '../../../../../constants';
import { ClientsModule } from '@nestjs/microservices';
import { ContractStatisticController } from './contract-statistic.controller';
import { AsyncRequestModule } from '../../../../../library/asyncrequest/asyncrequest.module';
import { ContractEventsModule } from '../contract-events/contract-events.module';
import { ContractStatisticCalculate } from './contract-statistic.calculate';
import { NimbusRateModule } from '../nimbus-rate/nimbus-rate.module';

@Module({
  imports: [
    AsyncRequestModule,
    ContractEventsModule,
    NimbusRateModule,
    //ClientsModule.register([{ name: EVENTS_CONTRACT, ...grpcClientOptions }])
  ],
  providers: [ContractStatisticService, ContractStatisticCalculate],
  controllers: [ContractStatisticController]
})
export class ContractStatisticModule{}