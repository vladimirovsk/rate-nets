export enum TokenName {
	BNB = 'BNB',
	GNBU = 'GNBU',
	BUSD = 'BUSD',
	
}

export const currencies: { [key: string]: string } = {
	'0xa2ca18fc541b7b101c64e64bbc2834b05066248b': TokenName.BNB,
	'0xe9e7cea3dedca5984780bafc599bd69add087d56': TokenName.BUSD,
	'0xa4d872235dde5694af92a1d0df20d723e8e9e5fc': TokenName.GNBU
};

