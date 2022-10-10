import {ConfigService} from '@nestjs/config';
import { ITelegrafOptions } from './telegraf.interface';
import LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({database: 'session_db.json'})

export const getTelegrafConfig =  (configService:ConfigService): ITelegrafOptions =>{
	const token = configService.get('TELEGRAM_BOT_TOKEN');
	if (!token) {
		throw new Error('TELEGRAM_BOT_TOKEN not found');
	}
	return {
		token: token,
		middlewares: [sessions.middleware()]
	};
};