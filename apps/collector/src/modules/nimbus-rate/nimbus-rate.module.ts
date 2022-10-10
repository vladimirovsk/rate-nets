import { Module } from '@nestjs/common';
import { AsyncRequestModule } from '../../../../../library/asyncrequest/asyncrequest.module';
import { NimbusRateService } from './nimbus-rate.service';

@Module({
  imports: [AsyncRequestModule],
  providers: [NimbusRateService],
  controllers: [],
  exports: [NimbusRateService]
})
export class NimbusRateModule {

}