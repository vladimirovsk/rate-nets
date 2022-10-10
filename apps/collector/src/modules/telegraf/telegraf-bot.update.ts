import { Ctx, Hears, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegrafBotService } from './telegraf-bot.service';
import { actionButtons, ButtonName } from './telegraf.button';

@Update()
export class TelegrafBotUpdate {
	private startTime = new Date().getTime();
	constructor(
		@InjectBot() private readonly bot: Telegraf<Context>,
		private telegrafBotService: TelegrafBotService,
	) {
	}
	
	@Hears(ButtonName.compareTotalTurnover)
	async getCompareTotalData(@Ctx() ctx: Context){
		this.telegrafBotService.startCompareTotal(1656633600, Math.trunc(new Date().getTime()/1000));
		await ctx.reply(`Wait calculate.... `);
	}
	
	@Hears(ButtonName.compareNFTTurnover)
	async getCompareNFTData(@Ctx() ctx: Context){
		this.telegrafBotService.startCompareNft(1656633600, Math.trunc(new Date().getTime()/1000));
		await ctx.reply(`Wait calculate.... `)
	}
	
	@Start()
	async startTelegrafBot(ctx: Context){
		await ctx.reply('Select functions', actionButtons());
	}
	
	@Help()
	async getCommand(ctx: Context){
		await ctx.reply('Enter command /start');
	}
}