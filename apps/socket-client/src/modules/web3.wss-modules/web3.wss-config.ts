import { ConfigService } from '@nestjs/config';
import { IWeb3WssOptions } from './web3.wss-option';

export const getWeb3WssConfig =  (configService:ConfigService): IWeb3WssOptions =>{
	const uri_rpc = configService.get<string>('RPC_URL_READ_ACTIVE');
	const uri_wss = configService.get<string>('WSS_URL_READ_ACTIVE');
	if (!uri_wss || !uri_rpc) {throw new Error('RPC_URL_READ_ACTIVE uri not found')}
	return {
		uri_wss,
		uri_rpc
	}
}