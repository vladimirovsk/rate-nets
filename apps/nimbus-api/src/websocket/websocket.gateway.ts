import { Server, Socket } from 'socket.io';
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { IWebsocketMessage, TypeSocketMessage } from './websocket.dto';
import { Interval } from '@nestjs/schedule';
import { RateService } from '../../../../databases/nimbus-rate/rate/rate.service';
import { WebsocketService } from './websocket.service';
import { ApiTags } from '@nestjs/swagger';
import { ContractsService } from '../../../../databases/nimbus-rate/contracts/contracts.service';


@ApiTags('socket')
@Injectable()
@WebSocketGateway({
		allowEIO3: true,
		cors: {
			origin: true,
			credentials: true
		}
	}
)
export class WebSocketServerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private startSendMessageRate = true;
	constructor(
		private rateDBService: RateService,
		private websocketService: WebsocketService
	) {
	}
	
	@Interval('sendMessageByRate', 1000)
	async eventSendMessage(){
		if (this.startSendMessageRate) {
			this.startSendMessageRate = false;
			const currentTokenInfo:IWebsocketMessage | null = await this.websocketService.fetchDataMessageTokens()
			if (currentTokenInfo!=null){
				if (currentTokenInfo.type === TypeSocketMessage.receive_rate){
							this.server.emit('message', currentTokenInfo)
				}
			}
			this.startSendMessageRate = true;
		 }
	}
	
	@WebSocketServer()
	server: Server;
	private logger: Logger = new Logger(WebSocketServerGateway.name);
	
	@SubscribeMessage('message')
	handleMessage(@MessageBody() data: IWebsocketMessage) {
		console.log('message', data);
		this.server.emit('receive_rate', data);
	}
	
	@SubscribeMessage('subscribe')
	async handleSubscribe(@MessageBody() data: IWebsocketMessage) {
		this.logger.debug(`subscribe, ${JSON.stringify(data)}`);
		this.server.emit(TypeSocketMessage.subscribe, data);
		const currentTokenInfo = await this.websocketService.fetchDataMessageTokens(true);
		this.server.sockets.emit('message', currentTokenInfo);
	}
	
	afterInit(server: Server) {
		this.logger.debug(`INIT SOCKET SERVER`);
	}
	
	handleConnection(client: Socket, ...args: string[]) {
		this.logger.debug(`Client connection ${client.id}`);
	}
	
	handleDisconnect(client: Socket) {
		this.logger.debug(`Client disconnect ${client.id}`);
	}
	
}