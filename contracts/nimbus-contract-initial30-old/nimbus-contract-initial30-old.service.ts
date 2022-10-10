import { Inject, Injectable } from '@nestjs/common';
import { CONTRACT_MODULE } from '../../constants';
import { IContractOption } from '../contract.option';
import { ContractService } from '../contract.service';


import { ContractAbi } from '../nimbus-initial-acquisition.contract';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NimbusContractInitial30OldService extends ContractService{
	constructor(
		@Inject(CONTRACT_MODULE) params: IContractOption,
		private configService: ConfigService
	) {
		const address = configService.get('') ||  configService.get('MAIN') ;
		super(
			params,
			'0x10516517C5E982dEa50e7B1ECFEF5E6Bf8518d3d',
			ContractAbi
		);
	}
	
}

