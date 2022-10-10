import { Module } from '@nestjs/common';

import { getModelToken } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';
import { TokensService } from './tokens.service';

@Module({
	imports:[],
	providers:[
		TokensService,
		{provide: getModelToken(TokensModel), useValue: TokensModel},
	],
	exports:[
		TokensService,
		{provide: getModelToken(TokensModel), useValue: TokensModel}
	],
})
export class TokensModule {

}