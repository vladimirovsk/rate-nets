import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RateService } from '../../databases/nimbus-rate/rate/rate.service';
import { CONTRACT_MODULE } from '../../constants';
import { IContractOption } from '../contract.option';
import { ContractService } from '../contract.service';
import { ContractAbi } from '../nimbus-initial-acquisition.contract';


@Injectable()
export class NimbusContractInitial30NewService extends ContractService {
	
	constructor(
		@Inject(CONTRACT_MODULE) params: IContractOption,
		private configService: ConfigService,
		private rateService: RateService
	) {
		const address = configService.get('INITIAL30NEW') ;
		super(
			params,
			address,
			ContractAbi
		);
		
	}
	
}

