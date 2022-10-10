import { Markup } from 'telegraf';

export function actionButtons(){
	return Markup.keyboard([
		Markup.button.callback('Compare Total Turnover', 'compare_data_total'),
		Markup.button.callback('Compare NFT Turnover', 'compare_data_nft')
	])
}

export const ButtonName = {
	compareTotalTurnover:'Compare Total Turnover',
	compareNFTTurnover: 'Compare NFT Turnover'
}