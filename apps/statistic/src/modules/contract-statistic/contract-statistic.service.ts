import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ResponseInfoAll, ResponseInfoPeriod } from '../dto/contract-statistic.dto';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { AsyncRequestService } from '../../../../../library/asyncrequest/asyncrequest.service';
import { IContractEventsController } from './contract-statistic.interface';
import { grpcClientOptions } from '../../grpc.option';
import { EventsName } from '../../../../../constants/events';
import { TokenName } from '../../../../../constants/token';
import { EventsByNameAndTitleDto, EventsByNameAndTitlePeriodDto } from '../../../../../constants/events/events.dto';

@Injectable()
export class ContractStatisticService implements OnModuleInit {
  private logger = new Logger(ContractStatisticService.name);

  private eventService: IContractEventsController;
  private uri = this.configService.get<string>('COLLECTOR_URI') ?? 'http://localhost:8059/api/v1';
  
   // @Client(grpcClientOptions)
   // private client: ClientGrpc
  
  constructor(
    private configService: ConfigService,
    private asyncRequest: AsyncRequestService,
  ) {
  }

  async onModuleInit() {
    // this.eventService = this.client.getService<IContractEventsController>('ContractEventsController');
  }

  private getConfigAxios(name: EventsName, title: TokenName): AxiosRequestConfig {
    return {
      headers: {},
      params: {
        body: {
          name,
          title
        }
      }
    };
  }

  async fetchStatistic(dto: EventsByNameAndTitleDto): Promise<ResponseInfoAll> {
    const uri = `${this.uri}/statistic/calculate`;
    const configAxios = this.getConfigAxios(dto.name, dto.title);
      const data  = this.asyncRequest.sendRequestPost(uri, configAxios).catch(err=>{
        throw new Error(err);
      });

      return data;
  }

  async fetchStatisticPeriod(dto: EventsByNameAndTitlePeriodDto): Promise<ResponseInfoPeriod> {
    const uri = `${this.uri}/statistic/calculate-period`;
    const configAxios: AxiosRequestConfig = {
      headers: {},
      params: {
        body: {
          name: dto.name,
          title: dto.title,
          startPeriod: dto.startPeriod,
          endPeriod: dto.endPeriod
        }
      }
    };
      const data = await this.asyncRequest.sendRequestPost(uri, configAxios).catch(err => {
        throw new Error(err);
      });
    return data;

    // let calcData = new ResponseInfoPeriod();
    // calcData = {...calcData, ...data};
    // return calcData;
  }

}