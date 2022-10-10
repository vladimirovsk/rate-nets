import { ConfigService } from '@nestjs/config';
import { IContractOption } from './contract.option';

export const getContractConfig =  (configService:ConfigService): IContractOption =>{
	const uri_rpc = configService.get<string>('RPC_URL_READ_ACTIVE');
	const uri_wss = configService.get<string>('WSS_URL_READ_ACTIVE');
	const tokenBNB  = configService.get('TOKEN_BNB');
	const tokenBUSD = configService.get('TOKEN_BUSD');
	const tokenGNBU = configService.get('TOKEN_GNBU');
	
	if (!tokenBNB) {throw new Error('address token BNB not found')}
	if (!tokenBUSD) {throw new Error('address token BUSD not found')}
	
	if (!uri_wss || !uri_rpc) {throw new Error('uri not found')}
	
	return {
		tokenBNB,
		tokenBUSD,
		tokenGNBU,
		uri_wss,
		uri_rpc
	}
}