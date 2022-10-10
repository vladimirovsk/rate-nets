import { ApiProperty } from '@nestjs/swagger';

export const defaultTotalTurnover = {
  volume: '50200',
  receivedBNB: '12669097.00',
  boughtBNB: '202669097.45',
  receivedBUSD: '8301702',
  boughtBUSD: '7301702.65',
  turnoverUSDT: '3892202.51'
}

export const defaultTotalTurnoverSecond = {
  volume: '50200',
  graph: {
      lines: [
        {
          name: 'This Month',
          data: [2, 5, 6, 8, 25, 15, 11, 4, 34, 2, 20, 40],
        },
        {
          name: 'Last Month',
          data: [0, 10, 9, 3, 11, 1, 45, 125, 3, 5, 30, 20],
          color: 'red',
        },
      ],
      categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    },
  receivedBNB: '-',
  boughtBNB: '-',
  receivedBUSD: '-',
  boughtBUSD: '-',
  turnoverUSDT: '-'
}

export const defaultTotalStaking = {
  volume: '0',
  countSmartLP: '0',
  countSmartStaking: '0',
  bnbAmountReceived: '0',
  busdAmountReceived: '0'
}

export const defaultTotalAirDrop = {
  volume: '-',
  airDrop20: '-',
  airDrop5: '-',
  totalUSDT: '-',
  bugAirDrop: '-'
}

export const defaultTotalAirDropSecond = {
  volume: '40200',
  graph: {
      lines:[
        {
          name: 'This Month',
          data: [0, 5, 6, 8, 25, 9, 11, 4, 34, 2, 25, 40],
        },
        {
          name: 'Last Month',
          data: [0, 14, 9, 3, 11, 1, 45, 12, 3, 5, 30, 20],
          color: 'red',
        },
      ],
      categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  },
  airDrop20: '-',
  airDrop5: '-',
  totalUSDT: '-',
  bugAirDrop: '-'
}

export const defaultActiveUser  = {
  volume: '-',
  oldUser: 8,
  newUser: 110
}


