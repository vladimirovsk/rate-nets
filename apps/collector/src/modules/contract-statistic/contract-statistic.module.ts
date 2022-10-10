import { Module } from '@nestjs/common';
import { ContractStatisticService } from './contract-statistic.service';
import { ContractStatisticController } from './contract-statistic.controller';
import { AsyncRequestModule } from '../../../../../library/asyncrequest/asyncrequest.module';
import { ContractStatisticCalculate } from './contract-statistic.calculate';
import { NimbusRateService } from '../nimbus-rate/nimbus-rate.service';
import { ContractEventsModule } from '../contract-events/contract-events.module';
import { TransactionModule } from '../../../../../databases/nimbus-events/transactions/transaction.module';
import { EventsModule } from '../../../../../databases/nimbus-events/events/events.module';
import { EventTypeModule } from '../../../../../databases/nimbus-events/event_types/event-types.module';

@Module({
  imports:[
    AsyncRequestModule,
    ContractEventsModule,
    TransactionModule,
    EventsModule,
    EventTypeModule
  ],
  providers:[
    ContractStatisticService,
    ContractStatisticCalculate,
    NimbusRateService,
  ],
  controllers:[ContractStatisticController],
  exports:[
    ContractStatisticService,
    ContractStatisticCalculate
  ]

})
export class ContractStatisticModule {}