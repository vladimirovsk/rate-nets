import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import LocalSession from 'telegraf-session-local';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafBotService } from './telegraf-bot.service';
import { ITelegrafModuleAsyncOptions } from './telegraf.interface';
import { TelegrafBotUpdate } from './telegraf-bot.update';
import { BscScanModule } from '../bscscan/bscscan.module';

const sessions = new LocalSession({database: 'session_db.json'});

@Module({
 imports: [
	 TelegrafModule.forRoot({
		 middlewares: [sessions.middleware()],
		 token: '5625253524:AAGws9TVQao3fC5mbrwMQpGx8GMVwLAArxQ'
	 }),
	 BscScanModule
 ],
	providers:[TelegrafBotService, TelegrafBotUpdate],
	exports: [TelegrafBotService, TelegrafBotUpdate]

})
export class TelegrafBotModule {}
