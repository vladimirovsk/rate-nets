import { Logger, Injectable, OnModuleInit } from '@nestjs/common';
import { TokensService } from '../../../../databases/nimbus-rate/tokens/tokens.service';
import { ITokenInfo, IWebsocketMessage, TypeSocketMessage } from './websocket.dto';
import { ContractsService } from '../../../../databases/nimbus-rate/contracts/contracts.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WebsocketService implements OnModuleInit {
	private logger = new Logger(WebsocketService.name);
	
	private dataMessage: IWebsocketMessage = {
		type: TypeSocketMessage.receive_rate,
		block: 0,
		data: {
			token: []
		}
	};
	
	constructor(
		private configService: ConfigService,
		private tokensService: TokensService,
		private contractsDBService:ContractsService,
	) {
	}
	
	async onModuleInit() {
		const tokens = await this.tokensService.fetchAll();
		const activeTokens: ITokenInfo[] = [];
		if (tokens != null) {
			for await (const row of tokens){
				activeTokens.push({
					symbol: row.symbol,
					rate: row.current_rate,
					time: new Date().getTime()
				})
				this.logger.debug(`symbol: ${row.symbol} rate: ${row.current_rate}`);
			}
			this.dataMessage.data.token = activeTokens;
		}
	}
	
	async fetchDataMessageTokens(read: boolean = false): Promise<IWebsocketMessage | null> {
		let sendMessage = false;
		
		for await (const currentData of this.dataMessage.data.token) {
		
			const contract = await this.contractsDBService.fetchActiveContract();
			
			const token = await this.tokensService.findBySymbol(currentData.symbol);
			
			if (token != null && (currentData.rate != token.current_rate || this.dataMessage.block !=contract?.block_last) ) {
				if (this.dataMessage.block != contract?.block_last) {
					this.dataMessage.block = Number(contract?.block_last);
				}
				currentData.rate = token.current_rate;
				sendMessage = true;
			}
		
			currentData.time = new Date().getTime();
		}

		if (sendMessage || read){
			return this.dataMessage;
		}else {
			return null
		}
	}
}