 import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ContractStatisticService } from './contract-statistic.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInfoAll, ResponseInfoPeriod } from '../dto/contract-statistic.dto';
 import { EventsByNameAndTitleDto, EventsByNameAndTitlePeriodDto } from '../../../../../constants/events/events.dto';

@ApiTags('statistic')
@Controller('statistic')
export class ContractStatisticController {
  constructor(
    private contractEventsService: ContractStatisticService
  ) {
  }
  @ApiOperation({ summary: 'Calculate information by events name and title' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'fetch info by service collector from dashboard',
    type: ResponseInfoAll
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('calculate')
  async calculateStatistic(@Body() dto: EventsByNameAndTitleDto ){
    return this.contractEventsService.fetchStatistic(dto).catch(err=>{
      throw new BadRequestException(err);
    })
  }

  @ApiOperation({ summary: 'Calculate information by events name and title and period' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'fetch info by service collector from dashboard',
    type: ResponseInfoPeriod
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('calculate-period')
  async calculateStatisticPeriod(
    @Body() dto: EventsByNameAndTitlePeriodDto,
  ){
    return this.contractEventsService.fetchStatisticPeriod(dto).catch(err=>{
      throw new BadRequestException(err);
    })
  }

}