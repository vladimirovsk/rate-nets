import { ConfigService } from '@nestjs/config';
import { AsyncRequestService } from '../../../../../library/asyncrequest/asyncrequest.service';
import { AxiosRequestConfig } from 'axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConvertEventsByName } from './contract-events.converter';
import { ResponseEventService } from '../dto/responce-event.dto';
import { EventsName } from '../../../../../constants/events';
import { EventsByNameAndTitleDto, EventsByNameAndTitlePeriodDto } from '../../../../../constants/events/events.dto';

@Injectable()
export class ContractEventsService {
  private logger = new Logger(ContractEventsService.name);
  private uri = this.configService.get('EVENTS_URI') ?? 'http://localhost:5870/api/v1';

  constructor(
    private asyncRequest: AsyncRequestService,
    private configService: ConfigService
  ) {
  }

  private getConfigAxios(name: EventsName, title: string): AxiosRequestConfig {
    return {
      headers: {},
      params: {
        name,
        title
      }
    };
  }

  async getEventsByNameAndTitle(dto: EventsByNameAndTitleDto):Promise<ResponseEventService> {
      const configAxios = this.getConfigAxios(dto.name, dto.title);

      let data: ResponseEventService = await this.asyncRequest.sendRequestGet(`${this.uri}/events`, configAxios).catch( (err:any) => {
        throw new BadRequestException(`url  ${this.uri}/events error: ${err.message}`);
      });

      return ConvertEventsByName(data);
  };

  async getEventsByNameAndTitleAndPeriod(dto: EventsByNameAndTitlePeriodDto){
    const configAxios:AxiosRequestConfig  = {
        headers: {},
        params: {
          name: dto.name,
          title: dto.title,
          start: dto.startPeriod,
          end: dto.endPeriod
        }
    }
    let data: ResponseEventService = await this.asyncRequest.sendRequestGet(`${this.uri}/events-period`, configAxios).catch( (err:any) => {
      throw new BadRequestException(`url  ${this.uri}/events-period error: ${err.message}`);
    });
    return ConvertEventsByName(data);
  }
}