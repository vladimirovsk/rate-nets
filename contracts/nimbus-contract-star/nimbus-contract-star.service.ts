import { Inject } from '@nestjs/common';
import { CONTRACT_MODULE, ERROR_READ_TABLE_TOKEN } from '../../constants';
import { IContractOption } from '../contract.option';
import { ContractAbi } from '../nimbus-initial-star';
import { ContractService } from '../contract.service';
import { ConfigService } from '@nestjs/config';


export class NimbusContractStarService extends ContractService {
	constructor(
		@Inject(CONTRACT_MODULE) params: IContractOption,
		private configService: ConfigService,
	) {
		const address = configService.get('STAR') ?? configService.get('MAIN') ;
		super(
			params,
			address,
			ContractAbi
		);
	}
	
	// @ts-ignore
	async getRate(block: number) {
		const rateTokens = [];
		const tokens = await this.tokensDBService.fetchAll();
		if (tokens === null) {
			new Error(ERROR_READ_TABLE_TOKEN)
		}
		
		try {
			
			const rateNBU = await this.contract.methods.queryRate(
				'0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
				'0xe9e7cea3dedca5984780bafc599bd69add087d56',
				).call({ from: '0x0000000000000000000000000000000000000000'},  block)
				.catch((err:Function)=>{
					console.log(err);
					throw err;})
			
			const rateBNB = await this.contract.methods.queryRate(
				'0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
				'0xe9e7cea3dedca5984780bafc599bd69add087d56',
			).call({ from: '0x0000000000000000000000000000000000000000'},  block)
				.catch((err:Function)=>{
					console.log(err);
					throw err;
				})
			
			const rateGNBU = await this.contract.methods.queryRate(
				'0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
				'0xe9e7cea3dedca5984780bafc599bd69add087d56',
			).call({ from: '0x0000000000000000000000000000000000000000'},  block)
				.catch((err:Function)=>{
					console.log(err);
					throw err;
				})
			
			rateTokens.push({ symbol: 'NBU', rate:rateNBU.rate});
			rateTokens.push({ symbol: 'BNB', rate:rateBNB.rate});
			rateTokens.push({ symbol: 'GNBU', rate:rateBNB.rate});

			return {
				block: block,
				tokens: rateTokens
			};
		} catch (error) {
			this.logger.error(`Not read BLOCK ${block} error: ${error}`);
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
				
				batch.add(
					this.contract.methods.queryRate(
						'0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
						'0xe9e7cea3dedca5984780bafc599bd69add087d56'
					).call
						.request({ from: '0x0000000000000000000000000000000000000000' }, block, callback.bind(this, 'NBU', block))
				);
				
				batch.add(
					this.contract.methods.queryRate(
						'0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
						'0xe9e7cea3dedca5984780bafc599bd69add087d56'
					).call
						.request({ from: '0x0000000000000000000000000000000000000000' }, block, callback.bind(this, 'BNB', block))
				);
				
			}
			const batchExecute = await batch.execute();
			await this.sleep(100);
			return batchExecute;

		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`Batch request ${error.message}`);
			}
		}
	};

}