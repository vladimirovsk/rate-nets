export const ContractAbi = {
	contractName: 'NimbusInitialMain',
	ABI: [
		{
			'anonymous': false,
			'inputs': [{
				'indexed': true,
				'internalType': 'address',
				'name': 'sponsor',
				'type': 'address'
			}, { 'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'swapTokenAmount', 'type': 'uint256' }],
			'name': 'AddUnclaimedSponsorBonus',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'indexed': false,
				'internalType': 'bool',
				'name': 'allowance',
				'type': 'bool'
			}],
			'name': 'AllowedTokenUpdated',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'indexed': true,
				'internalType': 'uint256',
				'name': 'stakingPool',
				'type': 'uint256'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmount', 'type': 'uint256' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'swapTokenAmount',
				'type': 'uint256'
			}, { 'indexed': true, 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }],
			'name': 'BuySystemTokenForToken',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}, { 'indexed': true, 'internalType': 'bool', 'name': 'isEquivalent', 'type': 'bool' }, {
				'indexed': true,
				'internalType': 'bool',
				'name': 'addToExistent',
				'type': 'bool'
			}],
			'name': 'ImportSponsorBonuses',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}, { 'indexed': true, 'internalType': 'bool', 'name': 'isEquivalent', 'type': 'bool' }, {
				'indexed': true,
				'internalType': 'bool',
				'name': 'addToExistent',
				'type': 'bool'
			}],
			'name': 'ImportUserPurchases',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': false, 'internalType': 'uint8', 'name': 'version', 'type': 'uint8' }],
			'name': 'Initialized',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{
				'indexed': true,
				'internalType': 'address',
				'name': 'previousOwner',
				'type': 'address'
			}, { 'indexed': true, 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }],
			'name': 'OwnershipTransferred',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': false, 'internalType': 'address', 'name': 'account', 'type': 'address' }],
			'name': 'Paused',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'to', 'type': 'address' }, {
				'indexed': true,
				'internalType': 'address',
				'name': 'nftContract',
				'type': 'address'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'nftTokenId', 'type': 'uint256' }, {
				'indexed': false,
				'internalType': 'address',
				'name': 'purchaseToken',
				'type': 'address'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }, {
				'indexed': true,
				'internalType': 'uint256',
				'name': 'timestamp',
				'type': 'uint256'
			}],
			'name': 'ProcessCashbackBonus',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address' }, {
				'indexed': true,
				'internalType': 'address',
				'name': 'nftContract',
				'type': 'address'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'nftTokenId', 'type': 'uint256' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}, { 'indexed': true, 'internalType': 'uint256', 'name': 'timestamp', 'type': 'uint256' }],
			'name': 'ProcessSponsorBonus',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'to', 'type': 'address' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}],
			'name': 'Rescue',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'indexed': true,
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }],
			'name': 'RescueToken',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }],
			'name': 'SwapTokenAmountForCashbackBonusThresholdUpdated',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }],
			'name': 'SwapTokenAmountForSponsorBonusThresholdUpdated',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'swapToken', 'type': 'address' }],
			'name': 'SwapTokenUpdated',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'bool', 'name': 'usePriceFeeds', 'type': 'bool' }],
			'name': 'ToggleUsePriceFeeds',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'bool', 'name': 'vestingRedeemingAllowed', 'type': 'bool' }],
			'name': 'ToggleVestingRedeemingAllowed',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': false, 'internalType': 'address', 'name': 'account', 'type': 'address' }],
			'name': 'Unpaused',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'uint256', 'name': 'cashbackBonus', 'type': 'uint256' }],
			'name': 'UpdateCashbackBonus',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'nftCashbackAddress', 'type': 'address' }],
			'name': 'UpdateNFTCashbackContract',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'nftSmartStakerAddress', 'type': 'address' }],
			'name': 'UpdateNFTSmartStakerContract',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{
				'indexed': true,
				'internalType': 'address',
				'name': 'nftVestingAddress',
				'type': 'address'
			}, { 'indexed': false, 'internalType': 'string', 'name': 'nftVestingUri', 'type': 'string' }],
			'name': 'UpdateNFTVestingContract',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'indexed': true,
				'internalType': 'uint256',
				'name': 'newRate',
				'type': 'uint256'
			}],
			'name': 'UpdateTokenSystemTokenWeightedExchangeRate',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'vestingFirstPeriod',
				'type': 'uint256'
			}, { 'indexed': false, 'internalType': 'uint256', 'name': 'vestingSecondPeriod', 'type': 'uint256' }],
			'name': 'UpdateVestingParams',
			'type': 'event'
		}, {
			'anonymous': false,
			'inputs': [{
				'indexed': true,
				'internalType': 'address',
				'name': 'nftVesting',
				'type': 'address'
			}, { 'indexed': true, 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }, {
				'indexed': false,
				'internalType': 'address',
				'name': 'user',
				'type': 'address'
			}, { 'indexed': false, 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256'
			}],
			'name': 'VestingNFTRedeemed',
			'type': 'event'
		}, {
			'inputs': [],
			'name': 'NBU_WBNB',
			'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'SYSTEM_TOKEN',
			'outputs': [{ 'internalType': 'contract IERC20Upgradeable', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'allowAccuralMarketingReward',
			'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'name': 'allowedTokens',
			'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'availableInitialSupply',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}], 'name': 'buyExactSystemTokenForBnb', 'outputs': [], 'stateMutability': 'payable', 'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}],
			'name': 'buyExactSystemTokenForBnbAndRegister',
			'outputs': [],
			'stateMutability': 'payable',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}, { 'internalType': 'uint256', 'name': 'sponsorId', 'type': 'uint256' }],
			'name': 'buyExactSystemTokenForBnbAndRegister',
			'outputs': [],
			'stateMutability': 'payable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}], 'name': 'buyExactSystemTokenForTokens', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}, { 'internalType': 'uint256', 'name': 'sponsorId', 'type': 'uint256' }],
			'name': 'buyExactSystemTokenForTokensAndRegister',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}],
			'name': 'buyExactSystemTokenForTokensAndRegister',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address',
				'name': 'systemTokenRecipient',
				'type': 'address'
			}, { 'internalType': 'uint256', 'name': 'stakingPoolId', 'type': 'uint256' }],
			'name': 'buySystemTokenForExactBnb',
			'outputs': [],
			'stateMutability': 'payable',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address',
				'name': 'systemTokenRecipient',
				'type': 'address'
			}, { 'internalType': 'uint256', 'name': 'stakingPoolId', 'type': 'uint256' }],
			'name': 'buySystemTokenForExactBnbAndRegister',
			'outputs': [],
			'stateMutability': 'payable',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address',
				'name': 'systemTokenRecipient',
				'type': 'address'
			}, { 'internalType': 'uint256', 'name': 'stakingPoolId', 'type': 'uint256' }, {
				'internalType': 'uint256',
				'name': 'sponsorId',
				'type': 'uint256'
			}],
			'name': 'buySystemTokenForExactBnbAndRegister',
			'outputs': [],
			'stateMutability': 'payable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'tokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}], 'name': 'buySystemTokenForExactTokens', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'tokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}, { 'internalType': 'uint256', 'name': 'sponsorId', 'type': 'uint256' }],
			'name': 'buySystemTokenForExactTokensAndRegister',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'tokenAmount',
				'type': 'uint256'
			}, { 'internalType': 'address', 'name': 'systemTokenRecipient', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'stakingPoolId',
				'type': 'uint256'
			}],
			'name': 'buySystemTokenForExactTokensAndRegister',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'cashbackBonus',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'user', 'type': 'address' }],
			'name': 'claimSponsorBonuses',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }],
			'name': 'currentBalance',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'getAllNFTRewards',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256[]', 'name': 'stakingIds', 'type': 'uint256[]' }],
			'name': 'getAllStakingRewards',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'systemTokenAmount', 'type': 'uint256' }],
			'name': 'getBnbAmountForSystemToken',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'bnbAmount', 'type': 'uint256' }],
			'name': 'getSystemTokenAmountForBnb',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'tokenAmount',
				'type': 'uint256'
			}],
			'name': 'getSystemTokenAmountForToken',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'systemTokenAmount',
				'type': 'uint256'
			}],
			'name': 'getTokenAmountForSystemToken',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'tokenSrc', 'type': 'address' }, {
				'internalType': 'address',
				'name': 'tokenDest',
				'type': 'address'
			}, { 'internalType': 'uint256', 'name': 'tokenAmount', 'type': 'uint256' }, {
				'internalType': 'bool',
				'name': 'isOut',
				'type': 'bool'
			}],
			'name': 'getTokenAmountForToken',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'user', 'type': 'address' }],
			'name': 'getUserSponsorAddress',
			'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'user', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}, { 'internalType': 'bool', 'name': 'isEquivalent', 'type': 'bool' }, {
				'internalType': 'bool',
				'name': 'addToExistent',
				'type': 'bool'
			}], 'name': 'importSponsorBonuses', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address[]',
				'name': 'users',
				'type': 'address[]'
			}, { 'internalType': 'uint256[]', 'name': 'amounts', 'type': 'uint256[]' }, {
				'internalType': 'bool',
				'name': 'isEquivalent',
				'type': 'bool'
			}, { 'internalType': 'bool', 'name': 'addToExistent', 'type': 'bool' }],
			'name': 'importSponsorBonuses',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'user', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}, { 'internalType': 'bool', 'name': 'isEquivalent', 'type': 'bool' }, {
				'internalType': 'bool',
				'name': 'addToExistent',
				'type': 'bool'
			}], 'name': 'importUserPurchases', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address[]',
				'name': 'users',
				'type': 'address[]'
			}, { 'internalType': 'uint256[]', 'name': 'amounts', 'type': 'uint256[]' }, {
				'internalType': 'bool',
				'name': 'isEquivalent',
				'type': 'bool'
			}, { 'internalType': 'bool', 'name': 'addToExistent', 'type': 'bool' }],
			'name': 'importUserPurchases',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address',
				'name': 'systemToken',
				'type': 'address'
			}, { 'internalType': 'address', 'name': 'nftVestingAddress', 'type': 'address' }, {
				'internalType': 'address',
				'name': 'nftSmartLpAddress',
				'type': 'address'
			}, { 'internalType': 'address', 'name': 'router', 'type': 'address' }, {
				'internalType': 'address',
				'name': 'nbuWbnb',
				'type': 'address'
			}], 'name': 'initialize', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'user', 'type': 'address' }],
			'name': 'isAllowedToRedeemVestingNFT',
			'outputs': [{ 'internalType': 'bool', 'name': 'isAllowed', 'type': 'bool' }, {
				'internalType': 'uint256',
				'name': 'unclaimedBonus',
				'type': 'uint256'
			}],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'nftCashback',
			'outputs': [{ 'internalType': 'contract ISmartLP', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'nftSmartStaker',
			'outputs': [{ 'internalType': 'contract IStakingMain', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'nftVesting',
			'outputs': [{ 'internalType': 'contract IVestingNFT', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'nftVestingUri',
			'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'owner',
			'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'paused',
			'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'priceFeed',
			'outputs': [{ 'internalType': 'contract IPriceFeed', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'recipient',
			'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],
			'name': 'redeemVestingNFT',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'referralProgram',
			'outputs': [{ 'internalType': 'contract INimbusReferralProgram', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'referralProgramMarketing',
			'outputs': [{ 'internalType': 'contract INimbusReferralProgramMarketing', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'renounceOwnership',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'to', 'type': 'address' }, {
				'internalType': 'address',
				'name': 'token',
				'type': 'address'
			}, { 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }],
			'name': 'rescue',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address payable', 'name': 'to', 'type': 'address' }, {
				'internalType': 'uint256',
				'name': 'amount',
				'type': 'uint256'
			}], 'name': 'rescue', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [],
			'name': 'sponsorBonus',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'name': 'stakingPools',
			'outputs': [{ 'internalType': 'contract INimbusStakingPool', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'swapRouter',
			'outputs': [{ 'internalType': 'contract INimbusRouter', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'swapToken',
			'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'swapTokenAmountForCashbackBonusThreshold',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'swapTokenAmountForSponsorBonusThreshold',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'target',
			'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'toggleUsePriceFeeds',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'toggleVestingRedeemingAllowed',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }],
			'name': 'transferOwnership',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'name': 'unclaimedSponsorBonus',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'name': 'unclaimedSponsorBonusEquivalent',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'bool', 'name': 'isAllowed', 'type': 'bool' }],
			'name': 'updateAccuralMarketingRewardAllowance',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'token', 'type': 'address' }, {
				'internalType': 'bool',
				'name': 'isAllowed',
				'type': 'bool'
			}], 'name': 'updateAllowedTokens', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'bonus', 'type': 'uint256' }],
			'name': 'updateCashbackBonus',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'nftCashbackAddress', 'type': 'address' }],
			'name': 'updateNFTCashbackContract',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'nftSmartStakerAddress', 'type': 'address' }],
			'name': 'updateNFTSmartStakerContract',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{
				'internalType': 'address',
				'name': 'nftVestingAddress',
				'type': 'address'
			}, { 'internalType': 'string', 'name': 'nftUri', 'type': 'string' }],
			'name': 'updateNFTVestingContract',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'newPriceFeed', 'type': 'address' }],
			'name': 'updatePriceFeed',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'recipientAddress', 'type': 'address' }],
			'name': 'updateRecipient',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'newReferralProgramContract', 'type': 'address' }],
			'name': 'updateReferralProgramContract',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'newReferralProgramMarketingContract', 'type': 'address' }],
			'name': 'updateReferralProgramMarketingContract',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'bonus', 'type': 'uint256' }],
			'name': 'updateSponsorBonus',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256[]', 'name': 'ids', 'type': 'uint256[]' }, {
				'internalType': 'address[]',
				'name': '_stakingPools',
				'type': 'address[]'
			}], 'name': 'updateStakingPool', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'id', 'type': 'uint256' }, {
				'internalType': 'address',
				'name': 'stakingPool',
				'type': 'address'
			}], 'name': 'updateStakingPool', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'newSwapRouter', 'type': 'address' }],
			'name': 'updateSwapRouter',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': 'newSwapToken', 'type': 'address' }],
			'name': 'updateSwapToken',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'threshold', 'type': 'uint256' }],
			'name': 'updateSwapTokenAmountForCashbackBonusThreshold',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'uint256', 'name': 'threshold', 'type': 'uint256' }],
			'name': 'updateSwapTokenAmountForSponsorBonusThreshold',
			'outputs': [],
			'stateMutability': 'nonpayable',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'usePriceFeeds',
			'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'name': 'userPurchases',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
			'name': 'userPurchasesEquivalent',
			'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
			'stateMutability': 'view',
			'type': 'function'
		}, {
			'inputs': [],
			'name': 'vestingRedeemingAllowed',
			'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
			'stateMutability': 'view',
			'type': 'function'
		}, { 'stateMutability': 'payable', 'type': 'receive' }]
};