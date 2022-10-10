import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

import { AsyncRequestService } from '../../../../../library/asyncrequest/asyncrequest.service';
import { TokenName } from '../../../../../constants/token';
import { ETypeSourceRate } from '../../../../../constants';

@Injectable()
export class NimbusRateService {
  private logger = new Logger(NimbusRateService.name);
  private uri = this.configService.get<string>('RATE_URI') ?? 'http://localhost:8081/api/v1';
  constructor(
    private configService: ConfigService,
    private asyncRequest:AsyncRequestService
  ) {
  }

  async getRateByBlockAndSymbol(symbol: TokenName, block:number, source:ETypeSourceRate = ETypeSourceRate.database){
    const configAxios: AxiosRequestConfig = {
        headers: {},
        params: {
          source,
          symbol,
          block: +block,
        }
    }
    const data = await this.asyncRequest.sendRequestGet(`${this.uri}/rate`, configAxios)
      .catch(err=>{
        this.logger.error(`${err}, params: ${JSON.stringify(configAxios.params)}`);
        throw new Error('asyncRequest: '+err);
    })
    return data;
  }
}