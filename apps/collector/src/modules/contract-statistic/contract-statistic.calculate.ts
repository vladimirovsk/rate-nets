import { BigNumber } from 'bignumber.js';
import { Injectable, Logger } from '@nestjs/common';
import { NimbusRateService } from '../nimbus-rate/nimbus-rate.service';
import { ContractEventsService } from '../contract-events/contract-events.service';
import { currencies, TokenName } from '../../../../../constants/token';
import { EventsName } from '../../../../../constants/events';
import {
  IActiveUser,
  IAp4Property, ITotalStaking,
  ITotalTurnover, ResponseInfoAll, ResponseInfoPeriod
} from '../../../../../constants/information/information.responce.dto';
import {
  ResponseEventService,
  ResponseEventServiceDateRows
} from '../../../../../constants/events/events.responce.dto';
import { EventsByNameAndTitlePeriodDto, ResponseUSDRate } from '../../../../../constants/events/events.dto';
import { ETypeSourceRate } from '../../../../../constants';

class ResponseCalculateAmountStakes{
  volume:string = '-';
  busdAmountReceived: string = '-';
  bnbAmountReceived: string = '-';
}

@Injectable()
export class ContractStatisticCalculate {
  private logger = new Logger(ContractStatisticCalculate.name);
  private readonly decimal = 18;
  
  constructor(
    private nimbusRateService: NimbusRateService,
    private contractEventsService: ContractEventsService,
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
    this.logger.debug(`Start fetchAP4Wallet`)
    let countRecord = 0;
    if (arrayUsers!=null) {
      arrayUsers.data.data.map(row=>{
        countRecord++;
      })
    }
    return {volume: String(countRecord)}
  }

  async fetchTotalTurnover(stakes: ResponseUSDRate[]): Promise<ITotalTurnover> {
    this.logger.debug(`Start fetchTotalTurnover`)
    let total = new BigNumber(0);

    let boughtBNB = new BigNumber(0);
    let receivedBNB = new BigNumber(0);

    let boughtBUSD = new BigNumber(0);
    let receivedBUSD = new BigNumber(0)
    ;
    let turnoverUSDT = new BigNumber(0);

    for (let row of stakes) {
      total = new BigNumber(total).plus(row.systemTokenAmount);
      // if (!Boolean(row.usdTokenAmount)){row.usdTokenAmount = new BigNumber(0).multipliedBy(1E18).toFixed()}
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
    };

    const totalTurnover: ITotalTurnover = {
      volume: new BigNumber(total).div(1E18).toFixed(),
      boughtBNB: new BigNumber(boughtBNB).div(1E18).toFixed(),
      receivedBNB: new BigNumber(receivedBNB).div(1E18).toFixed(),
      boughtBUSD: new BigNumber(boughtBUSD).div(1E18).toFixed(),
      receivedBUSD: new BigNumber(receivedBUSD).div(1E18).toFixed(),
      turnoverUSDT: new BigNumber(turnoverUSDT).div(1E18).toFixed()
    };

    return totalTurnover;
  }
  
  async compareStatisticPeriod(response: ResponseEventService, period: EventsByNameAndTitlePeriodDto): Promise<ResponseInfoPeriod> {
    let calculateData: ResponseInfoPeriod = new ResponseInfoPeriod();
    const transactions = response.data.data;
    const stakes: ResponseUSDRate[] = await this.addUSDRate(transactions);
    calculateData.totalTurnover = await this.fetchTotalTurnover(stakes);
    return calculateData;
  }
  

  async calculateStatisticPeriod(response: ResponseEventService, period: EventsByNameAndTitlePeriodDto): Promise<ResponseInfoPeriod> {
    let calculateData: ResponseInfoPeriod = new ResponseInfoPeriod();
    const transactions = response.data.data;
    const stakes: ResponseUSDRate[] = await this.addUSDRate(transactions);
    
    const usersRegisterCount:ResponseEventService = await this.contractEventsService.getEventsByNameAndTitleAndPeriod({
      name:EventsName.Register,
      title: TokenName.GNBU,
      startPeriod: period.startPeriod,
      endPeriod: period.endPeriod,
    });

    
    calculateData.period.startPeriod = period.startPeriod;
    calculateData.period.endPeriod = period.endPeriod;

    calculateData.totalTurnover = await this.fetchTotalTurnover(stakes);
    calculateData.activeUser = await this.fetchActiveUser(usersRegisterCount);
    calculateData.totalStaking = await this.calculateStakesPeriod(period);
    return calculateData;
  }
  
  async calculateStatistic(response: ResponseEventService): Promise<ResponseInfoAll> {
    const transactions = response.data.data;
    const calculateData: ResponseInfoAll = new ResponseInfoAll();

    const stakes: ResponseUSDRate[] = await this.addUSDRate(transactions).catch(err=>{
      throw new Error(`addUSDRate ${err}`)
    })
    
    const usersRegisterCount:ResponseEventService = await this.contractEventsService.getEventsByNameAndTitle({name:EventsName.Register, title: TokenName.GNBU});
    
    calculateData.totalTurnover = await this.fetchTotalTurnover(stakes);
    calculateData.ap4Wallets = await this.fetchAP4Wallet(usersRegisterCount);
    calculateData.totalStaking = await this.calculateStakes();

    return calculateData;
  }

  async calculateStakes():Promise<ITotalStaking>{
    this.logger.debug(`Start calculateStakes`);
    const ArrayBuySmartLP = await this.contractEventsService.getEventsByNameAndTitle({
      name:EventsName.BuySmartLP, title: TokenName.BNB}).catch(
      err=>{
        this.logger.error(`${err} BuySmartLP, returned empty object`)
        return new ResponseEventService();
      });

    const ArrayBuyStakingSet = await this.contractEventsService.getEventsByNameAndTitle({
      name:EventsName.BuyStakingSet, title: TokenName.BNB}).catch(
      err=>{
        this.logger.error(`${err} BuyStakingSet, returned empty object`)
        return new ResponseEventService();
      });

    return this.calculateAmountByArrays(ArrayBuySmartLP, ArrayBuyStakingSet);
  }
  
  async calculateStakesPeriod(period: EventsByNameAndTitlePeriodDto):Promise<ITotalStaking>{

    const ArrayBuySmartLP = await this.contractEventsService.getEventsByNameAndTitleAndPeriod({
      name:EventsName.BuySmartLP, title: TokenName.BNB, startPeriod: period.startPeriod, endPeriod: period.endPeriod}).catch(
      err=>{
        this.logger.error(`${err} BuySmartLP, returned empty object`)
        return new ResponseEventService();
      });
    
    const ArrayBuyStakingSet = await this.contractEventsService.getEventsByNameAndTitleAndPeriod({
      name:EventsName.BuyStakingSet, title: TokenName.BNB, startPeriod: period.startPeriod, endPeriod: period.endPeriod}).catch(
      err=>{
        this.logger.error(`${err} BuyStakingSet, returned empty object`)
        return new ResponseEventService();
      });
    
    return this.calculateAmountByArrays(ArrayBuySmartLP, ArrayBuyStakingSet);
  }
  
  async calculateAmountByArrays(ArrayBuySmartLP:ResponseEventService, ArrayBuyStakingSet:ResponseEventService):Promise<ITotalStaking>{
    const response = new ITotalStaking();
    const calculateAmount:ResponseCalculateAmountStakes = await this.addAmountStakesWithArr(ArrayBuySmartLP, ArrayBuyStakingSet);
    const countSmartLP = Boolean(ArrayBuySmartLP.data) ? ArrayBuySmartLP.data.data.length : 0;
    const countSmartStaking = Boolean(ArrayBuyStakingSet.data) ? ArrayBuyStakingSet.data.data.length : 0;

    response.volume = calculateAmount.volume;
    response.busdAmountReceived = calculateAmount.busdAmountReceived;
    response.bnbAmountReceived = calculateAmount.bnbAmountReceived;

    response.countSmartLP = countSmartLP.toFixed();
    response.countSmartStaking = countSmartStaking.toFixed();
    return response;
  }

  async addUSDRate(transactions: ResponseEventServiceDateRows[]): Promise<ResponseUSDRate[]> {
    this.logger.debug(`Start addUSDRate`);

    const response: ResponseUSDRate[] = [];

    for (const transaction of transactions) {
      const detailTransaction = transaction.data;
      const { block = 0, time = 0 } = transaction;
      const {
        swapTokenAmount = new BigNumber(0).toFixed(),
        token = new BigNumber(0).toFixed(),
        tokenAmount = new BigNumber(0).toFixed(),
        systemTokenAmount = new BigNumber(0).toFixed(),
        systemTokenRecipient = new BigNumber(0).toFixed()
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
        const amount = await this.nimbusRateService.getRateByBlockAndSymbol(TokenName.BNB, block, ETypeSourceRate.database)
          .catch(err=>{throw new Error(`getRateByBlockAndSymbol, ${err}`)})

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

  async addAmountStakesWithArr(ArrayBuySmartLP:ResponseEventService, ArrayBuyStakingSet:ResponseEventService
  ): Promise<ResponseCalculateAmountStakes>{
    let bnbAmountReceived = new BigNumber(0).toFixed();
    let busdAmountReceived = new BigNumber(0).toFixed();
    let totalVolume = new BigNumber(0).toFixed();
    const response = new ResponseCalculateAmountStakes();


    for (const buySmartLpRow of ArrayBuySmartLP.data.data){
      bnbAmountReceived = new BigNumber(bnbAmountReceived).plus(buySmartLpRow.data.providedBnb).toFixed()
      const block: number = Number(buySmartLpRow.block_number);
      const getAmountRate = await this.nimbusRateService.getRateByBlockAndSymbol(TokenName.BNB, block, ETypeSourceRate.database);
      const amount = new BigNumber(getAmountRate.rate).multipliedBy(buySmartLpRow.data.providedBnb).div(1E18).toFixed();

      totalVolume = new BigNumber(totalVolume).plus(amount).toFixed();
      if (totalVolume === 'NaN'){
        this.logger.debug(totalVolume +'-'+amount+' ' +JSON.stringify(getAmountRate)+ buySmartLpRow.data.providedBnb )}
    }

    for (const buyStakingRow of ArrayBuyStakingSet.data.data){
      const currency = currencies[(buyStakingRow.data.purchaseToken).toLocaleLowerCase()];
      let amount = '0';
      if (currency!=TokenName.BUSD) {
        bnbAmountReceived = new BigNumber(bnbAmountReceived).plus(buyStakingRow.data.providedAmount).toFixed();
        const block: number = Number(buyStakingRow.block_number);
        const getAmountRate = await this.nimbusRateService.getRateByBlockAndSymbol(TokenName.BNB, block, ETypeSourceRate.database)
        amount = new BigNumber(getAmountRate.rate).multipliedBy(buyStakingRow.data.providedAmount).div(1E18).toFixed();
      }else {
        busdAmountReceived = new BigNumber(busdAmountReceived).plus(buyStakingRow.data.providedAmount).toFixed();
        amount = new BigNumber(buyStakingRow.data.providedAmount).toFixed();
      }

      totalVolume = new BigNumber(totalVolume).plus(amount).toFixed();
    }

    response.volume = new BigNumber(totalVolume).div(1E18).toFixed();
    response.busdAmountReceived = new BigNumber(busdAmountReceived).div(1E18).toFixed();
    response.bnbAmountReceived = new BigNumber(bnbAmountReceived).div(1E18).toFixed();
    return response;
  }
}