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
import { GrpcMethod } from '@nestjs/microservices';
import { ResponseInfoAll, ResponseInfoPeriod } from '../../../../../constants/information/information.responce.dto';
import { EventsByNameAndTitleDto, EventsByNameAndTitlePeriodDto } from '../../../../../constants/events/events.dto';


@ApiTags('statistic')
@Controller('statistic')
export class ContractStatisticController {
  constructor(
    private contractEventsService: ContractStatisticService
  ) {
  }

  @ApiOperation({ summary: 'Select information all' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
    type: ResponseInfoAll
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @GrpcMethod('ContractStatisticController', 'getStatisticCalculate')
  @Post('calculate')
  async calculateStatistic(@Body() dto: EventsByNameAndTitleDto ): Promise<ResponseInfoAll>{
    return this.contractEventsService.fetchCalculateStatistic(dto).catch(err=>{
      throw new BadRequestException(err);
    })
  }

  @ApiOperation({ summary: 'Select information by period' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
    type: ResponseInfoPeriod
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @GrpcMethod('ContractStatisticController', 'getStatisticCalculatePeriod')
  @Post('calculate-period')
  async calculateStatisticByPeriod(
    @Body() dto: EventsByNameAndTitlePeriodDto,
): Promise<ResponseInfoPeriod>{
    return this.contractEventsService.fetchCalculateStatisticPeriod(dto).catch(err=>{
      throw new BadRequestException(err);
    })
  }


}