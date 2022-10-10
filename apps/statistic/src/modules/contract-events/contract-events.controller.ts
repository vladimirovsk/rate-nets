import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ContractEventsService } from './contract-events.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { ResponseEventService } from '../dto/responce-event.dto';
import { EventsByNameAndTitleDto, EventsByNameAndTitlePeriodDto } from '../../../../../constants/events/events.dto';

@ApiTags('events')
@Controller('events')
export class ContractEventsController {
  private logger = new Logger(ContractEventsController.name);

  constructor(
    private contractEventService:ContractEventsService
  ) {
  }

  @ApiOperation({ summary: 'Select information by events name and title' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
    type: ResponseEventService
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @GrpcMethod('ContractEventsController', 'getEventByNameAndTitle')
  @Post()
  async getEventsByName(
    @Body() dto: EventsByNameAndTitleDto
  ){
    return await this.contractEventService.getEventsByNameAndTitle(dto);
  }


  @GrpcMethod('ContractEventsController', 'getEventByNameAndTitleAndPeriod')
  async getEventsByNameGRPC(
    @Body() dto: EventsByNameAndTitlePeriodDto
  ){
    return await this.contractEventService.getEventsByNameAndTitleAndPeriod(dto);
  }

}