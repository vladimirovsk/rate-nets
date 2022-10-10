import {HttpException, Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {AxiosRequestConfig} from 'axios';
import {catchError, map} from 'rxjs';

@Injectable()
export class AsyncRequestService {
	private logger = new Logger(AsyncRequestService.name);
	constructor(
		private httpService: HttpService,
	) {
	}

	public async sendRequestPost(requestUrl: string, requestConfig: any) {
		const result = this.httpService.post(requestUrl, requestConfig.params.body, requestConfig)
			.pipe(
				map(response => {
					return response.data;
				}),
				catchError(err => {
					this.logger.error(err);
					throw new HttpException(err.response, err.response.status);
				})
			)
			.toPromise();
		return result;
	}

	public async sendRequestGet(requestUrl: string, requestConfig: any) {
		const result = this.httpService.get(requestUrl, requestConfig)
			.pipe(
				map(response => {
					const data = response.data;
					return data;
				}),
				catchError(err => {
					this.logger.error(` Send request: ${requestUrl} ${JSON.stringify(requestConfig.params)}`);
					throw new HttpException(err.response.data, err.response.status);
				})
			)
			.toPromise();
		return result;
	}
}
