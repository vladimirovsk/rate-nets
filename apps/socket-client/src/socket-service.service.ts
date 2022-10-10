import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3WssService } from './modules/web3.wss-modules/web3.wss-service';


@Injectable()
export class SocketServiceService implements OnModuleInit {
	private logger = new Logger(SocketServiceService.name);
	
	constructor(
		private configService: ConfigService,
		private web3wssService: Web3WssService
	) {
	}
	onModuleInit() {
		this.web3wssService.subscribe()
			.catch(err => {
				this.logger.error(`${JSON.stringify(err)}`);
				this.web3wssService.subscribe();
			});
	}
	
}
