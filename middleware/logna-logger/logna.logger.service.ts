import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const logdna = require('@logdna/logger');

@Injectable()
export class LognaLoggerService extends ConsoleLogger {
	private readonly key:string = String(this.configService.get<string>('LOGDNA_KEY'));
	private	optionsLogna = {
		app: this.configService.get<string>('LOGDNA_TAGS'),
		levels: ['info', 'debug', 'error'],
		tags: this.configService.get<string>('LOGDNA_TAGS')
	}
	private logger = logdna.createLogger(this.key, this.optionsLogna);
	
	constructor(
		private configService: ConfigService
	) {
		super();
		this.key = String(this.configService.get<string>('LOGDNA_KEY'));
	}
	
	
	log(message: any, context?: string) {
		this.logger.log(`${message}`);
		super.log(`${message}`);
	}
	
	debug(message: any, context?: string) {
		if (message)
		this.logger.debug(`${message}`);
		{super.debug(message);}
	}
	
	verbose(message: any, context?: string) {
		if (message) {
			this.logger.debug(`${message}`);
			super.verbose(message);
		}
	}
	
	error(message: any, stack?: string, context?: string) {
		this.logger.error(`${message}`);
		super.error(message);
	}
	

	
}