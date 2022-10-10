import { Module } from '@nestjs/common';
import { AsyncRequestService } from './asyncrequest.service';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [AsyncRequestService],
  exports:[AsyncRequestService]
})
export class AsyncRequestModule {}
