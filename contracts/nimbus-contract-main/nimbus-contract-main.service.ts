import { Inject, Injectable } from '@nestjs/common';
import { CONTRACT_MODULE, ERROR_READ_TABLE_TOKEN } from '../../constants';
import { IContractOption } from '../contract.option';
import { ContractService } from '../contract.service';
import { ContractAbi } from '../nimbus-initial-main';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class NimbusContractMainService extends ContractService {
	
	constructor(
		@Inject(CONTRACT_MODULE) params: IContractOption,
		private configService: ConfigService
	) {
		const address = configService.get('MAIN') ?? configService.get('MAIN') ;
		super(
			params,
			address,
			ContractAbi
		);
	}
	
	async getRate(block: number) {
		//-1
		const defaultBlock = block
		const rateTokens = [];
		const tokens = await this.tokensDBService.fetchAll();
		if (tokens === null) {new Error(ERROR_READ_TABLE_TOKEN)}
		try {
			 for await (const row of tokens) {
				 const rate = await this.contract.methods.getTokenAmountForToken(
					 row.address_dst,
					 row.address_src,
					 '1000000000000000000',
					 true
				 ).call({from:'0x0000000000000000000000000000000000000000'}, defaultBlock).catch((err:any)=>{
					 throw new Error(`methods getTokenAmountForToken ${err}`);
				 });
				 rateTokens.push({symbol: row.symbol, rate: rate})
			 }
			 
			return {block: defaultBlock,	tokens: rateTokens};
		} catch (error) {
			this.logger.error(`Not read BLOCK ${defaultBlock} error: ${error}`);
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
		
	}
	
	async getRateBatch(blocks: number[], callback: Function) {
		const tokens = await this.tokensDBService.fetchAll();
		
		if (tokens === null) {
			new Error(ERROR_READ_TABLE_TOKEN);
		}
		
		try {
			const batch = new this.web3.BatchRequest();
			for await (const block of blocks) {
				for await (const row of tokens) {
					await batch.add(this.contract.methods.getTokenAmountForToken(
							row.address_src,
							row.address_dst,
							'1000000000000000000',
							false
						).call
							.request({ from: '0x0000000000000000000000000000000000000000' }, Number(block), callback.bind(this, row.symbol, block))
					);
				}
			}
			return await batch.execute();
			
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`Batch request ${error.message}`);
			}
		}
	};
}

