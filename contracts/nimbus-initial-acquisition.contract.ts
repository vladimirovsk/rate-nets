export const ContractAbi =  {
  contractName: 'NimbusInitialAcquisition',
  ABI: [
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'systemToken',
          'type': 'address'
        },
        {
          'internalType': 'address',
          'name': 'vestingContractAddress',
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "router",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "nbuWbnb",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "swapTokenAmount",
            "type": "uint256"
          }
        ],
        "name": "AddUnclaimedSponsorBonus",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "allowance",
            "type": "bool"
          }
        ],
        "name": "AllowedTokenUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "bnbAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          }
        ],
        "name": "BuySystemTokenForBnb",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "swapTokenAmount",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          }
        ],
        "name": "BuySystemTokenForToken",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "bool",
            "name": "isEquivalent",
            "type": "bool"
          },
          {
            "indexed": true,
            "internalType": "bool",
            "name": "addToExistent",
            "type": "bool"
          }
        ],
        "name": "ImportUserPurchases",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "Paused",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "ProcessGiveBonus",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sponsor",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "bonusAmount",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "ProcessSponsorBonus",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Rescue",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "RescueToken",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "SwapTokenAmountForBonusThresholdUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "swapToken",
            "type": "address"
          }
        ],
        "name": "SwapTokenUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bool",
            "name": "useWeightedRates",
            "type": "bool"
          }
        ],
        "name": "ToggleUseWeightedRates",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "Unpaused",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "giveBonus",
            "type": "uint256"
          }
        ],
        "name": "UpdateGiveBonus",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "newRate",
            "type": "uint256"
          }
        ],
        "name": "UpdateTokenSystemTokenWeightedExchangeRate",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "vestingContractAddress",
            "type": "address"
          }
        ],
        "name": "UpdateVestingContract",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "vestingFirstPeriod",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "vestingSecondPeriod",
            "type": "uint256"
          }
        ],
        "name": "UpdateVestingParams",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "NBU_WBNB",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "SYSTEM_TOKEN",
        "outputs": [
          {
            "internalType": "contract IBEP20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "allowAccuralMarketingReward",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "allowedTokens",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "availableInitialSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buyExactSystemTokenForBnb",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buyExactSystemTokenForBnbAndRegister",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sponsorId",
            "type": "uint256"
          }
        ],
        "name": "buyExactSystemTokenForBnbAndRegister",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buyExactSystemTokenForTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sponsorId",
            "type": "uint256"
          }
        ],
        "name": "buyExactSystemTokenForTokensAndRegister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buyExactSystemTokenForTokensAndRegister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buySystemTokenForExactBnb",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buySystemTokenForExactBnbAndRegister",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sponsorId",
            "type": "uint256"
          }
        ],
        "name": "buySystemTokenForExactBnbAndRegister",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buySystemTokenForExactTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sponsorId",
            "type": "uint256"
          }
        ],
        "name": "buySystemTokenForExactTokensAndRegister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "systemTokenRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "stakingPoolId",
            "type": "uint256"
          }
        ],
        "name": "buySystemTokenForExactTokensAndRegister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "claimSponsorBonuses",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address[]",
            "name": "users",
            "type": "address[]"
          }
        ],
        "name": "claimSponsorBonusesBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "currentBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "estimateSponsorBonus",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "userSponsor",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          }
        ],
        "name": "getBnbAmountForSystemToken",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "bnbAmount",
            "type": "uint256"
          }
        ],
        "name": "getSystemTokenAmountForBnb",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          }
        ],
        "name": "getSystemTokenAmountForToken",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "systemTokenAmount",
            "type": "uint256"
          }
        ],
        "name": "getTokenAmountForSystemToken",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getUserSponsorAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "giveBonus",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isEquivalent",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "addToExistent",
            "type": "bool"
          }
        ],
        "name": "importUserPurchases",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address[]",
            "name": "users",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          },
          {
            "internalType": "bool",
            "name": "isEquivalent",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "addToExistent",
            "type": "bool"
          }
        ],
        "name": "importUserPurchases",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "newOwner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "paused",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "recipient",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "referralProgram",
        "outputs": [
          {
            "internalType": "contract INimbusReferralProgram",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "referralProgramMarketing",
        "outputs": [
          {
            "internalType": "contract INimbusReferralProgramMarketing",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "rescue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "rescue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "sponsorBonus",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "stakingPools",
        "outputs": [
          {
            "internalType": "contract INimbusStakingPool",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "swapRouter",
        "outputs": [
          {
            "internalType": "contract INimbusRouter",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "swapToken",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "swapTokenAmountForBonusThreshold",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "toggleUseWeightedRates",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "transferOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "unclaimedBonusBases",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "unclaimedBonusBasesEquivalent",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bool",
            "name": "isAllowed",
            "type": "bool"
          }
        ],
        "name": "updateAccuralMarketingRewardAllowance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isAllowed",
            "type": "bool"
          }
        ],
        "name": "updateAllowedTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "bonus",
            "type": "uint256"
          }
        ],
        "name": "updateGiveBonus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipientAddress",
            "type": "address"
          }
        ],
        "name": "updateRecipient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newReferralProgramContract",
            "type": "address"
          }
        ],
        "name": "updateReferralProgramContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newReferralProgramMarketingContract",
            "type": "address"
          }
        ],
        "name": "updateReferralProgramMarketingContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "bonus",
            "type": "uint256"
          }
        ],
        "name": "updateSponsorBonus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "internalType": "address[]",
            "name": "_stakingPools",
            "type": "address[]"
          }
        ],
        "name": "updateStakingPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "stakingPool",
            "type": "address"
          }
        ],
        "name": "updateStakingPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newSwapRouter",
            "type": "address"
          }
        ],
        "name": "updateSwapRouter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newSwapToken",
            "type": "address"
          }
        ],
        "name": "updateSwapToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "threshold",
            "type": "uint256"
          }
        ],
        "name": "updateSwapTokenAmountForBonusThreshold",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "rate",
            "type": "uint256"
          }
        ],
        "name": "updateTokenSystemTokenWeightedExchangeRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "vestingContractAddress",
            "type": "address"
          }
        ],
        "name": "updateVestingContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "vestingFirstPeriod",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vestingSecondPeriod",
            "type": "uint256"
          }
        ],
        "name": "updateVestingParams",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "useWeightedRates",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "userPurchases",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "userPurchasesEquivalent",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "vestingContract",
        "outputs": [
          {
            "internalType": "contract INimbusVesting",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "vestingFirstPeriodDuration",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "vestingSecondPeriodDuration",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "weightedTokenSystemTokenExchangeRates",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
}