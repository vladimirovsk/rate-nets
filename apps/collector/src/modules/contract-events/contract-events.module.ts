import { Module } from '@nestjs/common';
import { AsyncRequestModule } from '../../../../../library/asyncrequest/asyncrequest.module';
import { ContractEventsService } from './contract-events.service';
import { ContractEventsController } from './contract-events.controller';

@Module({
  imports:[
    AsyncRequestModule
  ],
  providers:[ContractEventsService],
  controllers:[ContractEventsController],
  exports:[ContractEventsService]
})
export class ContractEventsModule{}