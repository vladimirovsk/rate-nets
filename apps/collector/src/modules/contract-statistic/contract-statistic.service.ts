import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AsyncRequestService } from '../../../../../library/asyncrequest/asyncrequest.service';
import { ContractStatisticCalculate } from './contract-statistic.calculate';
import { ContractEventsService } from '../contract-events/contract-events.service';
import { IContractEventsController } from '../../../../../constants/events/events.rpc.service';
import {
  EventsByNameAndTitleDto,
  EventsByNameAndTitlePeriodDto,

} from '../../../../../constants/events/events.dto';
import { ResponseInfoAll, ResponseInfoPeriod } from '../../../../../constants/information/information.responce.dto';

@Injectable()
export class ContractStatisticService implements OnModuleInit {
  private logger = new Logger(ContractStatisticService.name);
  private eventService: IContractEventsController;
  
  constructor(
    private configService: ConfigService,
    private asyncRequest: AsyncRequestService,
    private contractStatisticCalculate: ContractStatisticCalculate,
    private contractEventsService: ContractEventsService,
  ) {
  }
  
  async onModuleInit() {
  }
  
  async fetchCalculateStatistic(dto: EventsByNameAndTitleDto): Promise<ResponseInfoAll> {
    const data = await this.contractEventsService.getEventsByNameAndTitle(dto).catch(err => {
      throw new Error(err);
    });
    const calcData = await this.contractStatisticCalculate.calculateStatistic(data)
      .catch(err => {
        throw new Error(err);
      });
    return calcData;
  }
  
  async fetchCalculateStatisticPeriod(dto: EventsByNameAndTitlePeriodDto): Promise<ResponseInfoPeriod> {
    const data = await this.contractEventsService.getEventsByNameAndTitleAndPeriod(dto).catch(err => {
      throw new Error(err);
    });
    return this.contractStatisticCalculate.calculateStatisticPeriod(data, dto).catch(err => {
      throw new Error(err);
    });
  }
  
  async fetchFromCompareStatisticPeriod(dto: EventsByNameAndTitlePeriodDto):Promise<ResponseInfoPeriod>{
    const data = await this.contractEventsService.getEventsByNameAndTitleAndPeriod(dto).catch(err => {
      throw new Error(err);
    });
    
    return this.contractStatisticCalculate.compareStatisticPeriod(data, dto).catch(err => {
      throw new Error(err);
    });
    
  }
}