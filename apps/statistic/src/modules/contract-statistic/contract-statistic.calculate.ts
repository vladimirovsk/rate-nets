import { BigNumber } from 'bignumber.js';
import { Injectable, Logger } from '@nestjs/common';

import { ResponseEventService, ResponseEventServiceDateRows } from '../dto/responce-event.dto';
import {
  IActiveUser,
  IAp4Property,
  ITotalTurnover,
  ResponseInfoAll,
  ResponseInfoPeriod
} from '../dto/responce-information.dto';
import { NimbusRateService } from '../nimbus-rate/nimbus-rate.service';
import { currencies, TokenName } from '../../../../../constants/token';
import { EventsByNameAndTitlePeriodDto, ResponseUSDRate } from '../../../../../constants/events/events.dto';
import { ETypeSourceRate } from '../../../../../constants';

@Injectable()
export class ContractStatisticCalculate {
  private logger = new Logger(ContractStatisticCalculate.name);
  private readonly decimal = 18;
  
  private nimbusRateService: NimbusRateService

  constructor(

  ) {
  }

  async fetchActiveUser(arrayUsers:ResponseEventService): Promise<IActiveUser>{
    let countRecord = 0;
    let countNewUser = 0;
    let countOldUser = 0;
    if (arrayUsers!=null) {
      arrayUsers.data.data.map(row=>{
        countRecord++;
      })
    }
    return {volume: String(countRecord), oldUser: countOldUser, newUser: countNewUser}
  }

  async fetchAP4Wallet( arrayUsers:ResponseEventService):Promise<IAp4Property>{
    let countRecord = 0;
    if (arrayUsers!=null) {
      arrayUsers.data.data.map(row=>{
        countRecord++;
      })
    }
    return {volume: String(countRecord)}
  }

  async fetchTotalTurnover(stakes: ResponseUSDRate[]): Promise<ITotalTurnover> {
    let total = new BigNumber(0);

    let boughtBNB = new BigNumber(0);
    let receivedBNB = new BigNumber(0);

    let boughtBUSD = new BigNumber(0);
    let receivedBUSD = new BigNumber(0)
    ;
    let turnoverUSDT = new BigNumber(0);

    stakes.map(row => {
      total = new BigNumber(total).plus(row.systemTokenAmount);
      turnoverUSDT = new BigNumber(turnoverUSDT).plus(row.usdTokenAmount);
      const currency = currencies[(row.token).toLocaleLowerCase()];

      if (currency === TokenName.BNB) {
        boughtBNB = new BigNumber(boughtBNB).plus(row.systemTokenAmount); //NBU is NOW
        receivedBNB = new BigNumber(receivedBNB).plus(row.tokenAmount);

      } else if (currency === TokenName.BUSD) {

        boughtBUSD = new BigNumber(boughtBUSD).plus(row.systemTokenAmount);
        receivedBUSD = new BigNumber(receivedBUSD).plus(row.tokenAmount);

      } else {
        this.logger.warn(`currency not found token ${row.token}`);
      }
    });

    const totalTurnover: ITotalTurnover = {
      volume: new BigNumber(total).multipliedBy(Math.pow(10, -this.decimal)).toFixed(),
      boughtBNB: new BigNumber(boughtBNB).multipliedBy(Math.pow(10, -this.decimal)).toFixed(),
      receivedBNB: new BigNumber(receivedBNB).multipliedBy(Math.pow(10, -this.decimal)).toFixed(),
      boughtBUSD: new BigNumber(boughtBUSD).multipliedBy(Math.pow(10, -this.decimal)).toFixed(),
      receivedBUSD: new BigNumber(receivedBUSD).multipliedBy(Math.pow(10, -this.decimal)).toFixed(),
      turnoverUSDT: new BigNumber(turnoverUSDT).multipliedBy(Math.pow(10, -this.decimal)).toFixed()
    };

    return totalTurnover;
  }

  async fetchCalculateStatistic(response: ResponseEventService): Promise<ResponseInfoAll> {
    const transactions = response.data.data;
    const stakes: ResponseUSDRate[] = await this.addUSDRate(transactions);
   // const usersRegisterCount:ResponseEventService = await this.contractEventsService.getEventsByNameAndTitle({name:EventsName.Register, title: TokenName.GNBU});
    let fetchData: ResponseInfoAll = new ResponseInfoAll();
    fetchData.totalTurnover = await this.fetchTotalTurnover(stakes);
    //fetchData.ap4Wallets = await this.fetchAP4Wallet(usersRegisterCount);
    return fetchData;
  }

  async fetchCalculateStatisticPeriod(response: ResponseEventService, period: EventsByNameAndTitlePeriodDto): Promise<ResponseInfoPeriod> {
    const transactions = response.data.data;
    const stakes: ResponseUSDRate[] = await this.addUSDRate(transactions);

    // const usersRegisterCount:ResponseEventService = await this.contractEventsService.getEventsByNameAndTitleAndPeriod({
    //   name:EventsName.Register,
    //   title: TokenName.GNBU,
    //   startPeriod: period.startPeriod,
    //   endPeriod: period.endPeriod,
    // });

    let fetchData: ResponseInfoPeriod = new ResponseInfoPeriod();
    fetchData.period.startPeriod = period.startPeriod;
    fetchData.period.endPeriod = period.endPeriod;

    fetchData.totalTurnover = await this.fetchTotalTurnover(stakes);
    // fetchData.activeUser = await this.fetchActiveUser(usersRegisterCount);

    return fetchData;

  }
  
  async addUSDRate(transactions: ResponseEventServiceDateRows[]): Promise<ResponseUSDRate[]> {
    const response: ResponseUSDRate[] = [];

    for (const transaction of transactions) {
      const detailTransaction = transaction.data;

      const { block = 0, time = 0 } = transaction;
      const {
        swapTokenAmount = '',
        token = '',
        tokenAmount = '',
        systemTokenAmount = '',
        systemTokenRecipient = ''
      } = detailTransaction;

      const tokenAddress: string = token.toLocaleLowerCase();
      const currency = currencies[tokenAddress];

      let usdTokenAmount = swapTokenAmount;

      if (currency === TokenName.BUSD && !swapTokenAmount) {
        usdTokenAmount = tokenAmount;
      }

      if (
        (currency == TokenName.BNB && swapTokenAmount === tokenAmount) ||
        (currency === TokenName.BNB) && !swapTokenAmount
      ) {

        const amount = await this.nimbusRateService.getRateByBlockAndSymbol(TokenName.BNB, block, ETypeSourceRate.database);
        usdTokenAmount = amount.rate;
        this.logger.debug('getRateByBlockAndSymbol(TokenName.BNB, block...');
      }

      // if (currency === TokenName.GNBU) {
      //   const amount = await this.nimbusRateService.getRateByBlockAndSymbol(TokenName.GNBU, block, ETypeSourceRate.database);
      //   usdTokenAmount = amount.rate;
      //   this.logger.debug(' getUsdAmount(tokenAmount, block, GNBU, event)');
      // }

      if (block >= 19175041 && block <= 19263180 && currency === TokenName.BNB) { // костыль из за косяка в блокчейне
        const amount = await this.nimbusRateService.getRateByBlockAndSymbol(TokenName.BNB, block, ETypeSourceRate.database);
        this.logger.debug(`usdTokenAmount: ${usdTokenAmount} != rate: ${amount.rate}`)
        usdTokenAmount = amount.rate

        if (amount.source === ETypeSourceRate.blockchain){
          this.logger.warn(`getRateByBlockAndSymbol(${TokenName.BNB}, ${block}, ${amount.source})`);
        }
      }

      response.push({
        systemTokenAmount,
        systemTokenRecipient,
        usdTokenAmount,
        token,
        tokenAmount,
        block,
        time
      });
    }
    return response;
  }

}