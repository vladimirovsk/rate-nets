import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {Telegraf} from 'telegraf';
import {ITelegramOptions} from './telegram.interface';
import {TELEGRAM_MODULE_OPTIONS} from './telegram.constant';
import { Parser } from 'json2csv';
import fs from 'fs';
import path, { join } from 'path';


@Injectable()
export class TelegramService  implements OnModuleInit{
	bot:Telegraf;
	options: ITelegramOptions;
	private logger = new Logger();
	private Parser = new Parser();
	private ServerName = '[TEST SERVER]';
	
	onModuleInit(): any {
	
	}
	
	constructor(
		@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions
	) {
		this.bot = new Telegraf(options.token);
		this.options = options;
	}
	
	sendMessage(message: string, chatId:string = this.options.chatId){
		this.bot.telegram.sendMessage(chatId, this.ServerName+' '+message).catch(err=>{
			this.logger.debug(chatId, message, err.message);
			throw new Error(err.message);
		});
	}
	
	async sendDocument(response:any , title: string =  this.ServerName, chatId:string = this.options.chatId){
		fs.writeFileSync('compare.json', JSON.stringify(response), 'utf8');
		const outputFilePath = join(process.cwd(), 'compare.json');
		if (fs.existsSync(outputFilePath)) {
			const caption = { caption: title ?? path.basename(outputFilePath) };
			const file = { filename: path.basename(outputFilePath), source: await fs.createReadStream(outputFilePath) };
			
			await this.bot.telegram.sendDocument(chatId, file, caption).catch(err => {
				this.logger.debug(chatId, document, err.message);
				throw new Error(err.message);
			});
		}
	}
}
