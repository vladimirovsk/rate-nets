import { Module } from '@nestjs/common';
import { LostBlocksModule } from '../../../../../databases/nimbus-rate/lost-blocks/lost-blocks.module';
import { CheckLostBlockService } from './check-lost-block.service';
import { RateApiModule } from '../rate/rate-api.module';
import { RateApiService } from '../rate/rate-api.service';

@Module({
	imports:[
		LostBlocksModule,
		RateApiModule,
	],
	
	providers:[
		CheckLostBlockService,
		RateApiService
	],
	exports:[
		CheckLostBlockService
	]
})
export class CheckLostBlockModule {

}