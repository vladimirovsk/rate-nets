import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import {
  defaultActiveUser,
  defaultTotalAirDrop,
  defaultTotalAirDropSecond, defaultTotalStaking,
  defaultTotalTurnover, defaultTotalTurnoverSecond
} from '../contract-statistic/contract-statistic-default.values';
import { IPeriodDto } from '../../../../../constants';


class dataLines {
  name: string;
  data: number[];
  color?: string;
}

class IMigrateWallet {
  @ApiProperty()
  @IsNumber()
  volume: string = '10200';
}

class IAp4Property {
  @ApiProperty()
  @IsNumber()
  volume: string = '30000';
}

class IDataGraph {
  @ApiProperty()
  lines: dataLines[];

  @ApiProperty()
  categories: string[];
}

export class ITotalStaking {
  @ApiProperty()
  volume: string;

  @ApiProperty()
  countSmartLP: string;

  @ApiProperty()
  countSmartStaking: string;

  @ApiProperty()
  bnbAmountReceived: string;

  @ApiProperty()
  busdAmountReceived: string;
}

class ITotalTurnover {
  @ApiProperty()
  volume: string;

  @ApiProperty()
  receivedBNB: string;

  @ApiProperty()
  boughtBNB: string;

  @ApiProperty()
  receivedBUSD: string;

  @ApiProperty()
  boughtBUSD: string;

  @ApiProperty()
  turnoverUSDT: string;

  @ApiProperty()
  graph?: IDataGraph;
}

class ITotalAirDrop {
  @ApiProperty()
  volume: string;

  @ApiProperty()
  airDrop20: string;

  @ApiProperty()
  airDrop5: string;

  @ApiProperty()
  totalUSDT: string;

  @ApiProperty()
  bugAirDrop: string;
}

class IActiveUser {
  @ApiProperty()
  volume: string;

  @ApiProperty()
  oldUser: number;

  @ApiProperty()
  newUser: number
}

export class ResponseInfoAll {
  @ApiProperty({default : {volume:'10200'}})
  migratedWallets: IMigrateWallet =  {volume:'10200'};

  @ApiProperty({default : {volume:'30000'}})
  ap4Wallets: IAp4Property= {volume:'10200'};

  @ApiProperty({default: defaultTotalTurnover})
  totalTurnover: ITotalTurnover = defaultTotalTurnover;

  @ApiProperty({default: defaultTotalAirDrop})
  totalAirDrop: ITotalAirDrop = defaultTotalAirDrop;

  @ApiProperty({default: defaultTotalStaking})
  totalStaking: ITotalStaking = defaultTotalStaking;
}

export class ResponseInfoPeriod {
  @ApiProperty()
  period: IPeriodDto;

  @ApiProperty({default: defaultActiveUser})
  activeUser: IActiveUser = defaultActiveUser;

  @ApiProperty({default:defaultTotalTurnoverSecond})
  totalTurnover: ITotalTurnover = defaultTotalTurnoverSecond

  @ApiProperty({default:defaultTotalAirDropSecond})
  totalAirDrop: ITotalAirDrop = defaultTotalAirDropSecond;

  @ApiProperty({default: defaultTotalStaking})
  totalStaking: ITotalStaking = defaultTotalStaking;
}


