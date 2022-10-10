import { Module } from '@nestjs/common';
import { WebSocketServerGateway } from './websocket.gateway';
import { RateModule } from '../../../../databases/nimbus-rate/rate/rate.module';
import { WebsocketService } from './websocket.service';
import { TokensModule } from '../../../../databases/nimbus-rate/tokens/tokens.module';
import { ContractsModule } from '../../../../databases/nimbus-rate/contracts/contracts.module';

@Module({
	imports:[
		RateModule,
		TokensModule,
		ContractsModule
	],
	providers:[
		WebSocketServerGateway,
		WebsocketService
	],
	exports:[]
})
export class WebsocketModule{}