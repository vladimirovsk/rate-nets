export interface IWebsocketMessage {
	type: TypeSocketMessage;
	event?: string;
	block: number;
	data: {
		token: ITokenInfo[]
	};
}

export enum TypeSocketMessage {
	receive_rate='receive_rate',
	subscribe='subscribe',
}

export interface ITokenInfo {
	symbol:string;
	rate: string;
	time?: number
}