import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';
import { TOKEN_NOT_FOUND } from '../../../constants';


@Injectable()
export class TokensService {
	private logger = new Logger(TokensService.name);
	constructor(
		@InjectModel(TokensModel)
		private readonly tokensModel: typeof TokensModel
	) {
	}
	
	async fetchAll():Promise<TokensModel[]> {
		return this.tokensModel.findAll({
			where: { active: true },
			order:['id'],
			raw: true
		}).catch(err => {
			throw new Error(err);
		});
	}
	
	async fetchDecimalBySymbol(symbol: string){
		const token = await this.findBySymbol(symbol);
		if (token!=null){
			return token.decimal;
		}else{
			throw new Error(TOKEN_NOT_FOUND);
		}
	}
	
	async findBySymbol(symbol: string) {
		return  this.tokensModel.findOne({
			where: {
				active: true,
				symbol
			},
			raw: true
		}).catch(err => {
			new Error(TOKEN_NOT_FOUND);
		});
	}
	
	async updateCurrentRate(id: number, rate: string, block:number) {
		return this.tokensModel.update({
			current_rate: rate,
			current_block: block
		}, {
			where: { id }
		});
	}
	
	
}