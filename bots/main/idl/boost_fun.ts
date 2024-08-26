export type BoostFun = {
    "version": "0.1.0",
    "name": "boost_fun",
    "instructions": [
        {
            "name": "createPool",
            "accounts": [
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mintAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "baseMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creatorBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creatorQuoteAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverQuoteAta",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "input",
                    "type": {
                        "defined": "CreatePoolInput"
                    }
                }
            ]
        },
        {
            "name": "buy",
            "accounts": [
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "baseMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quoteMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "buyerBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "buyerQuoteAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverQuoteAta",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "slippage",
                    "type": "u64"
                },
                {
                    "name": "expectedTokens",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "sell",
            "accounts": [
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "seller",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "baseMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quoteMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "sellerBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sellerQuoteAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverQuoteAta",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "slippage",
                    "type": "u64"
                },
                {
                    "name": "expectedAmountLamports",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "mainState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeRecipient1",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeRecipient2",
                        "type": "publicKey"
                    },
                    {
                        "name": "totalTokenSupply",
                        "type": "u64"
                    },
                    {
                        "name": "initBaseRealReserves",
                        "type": "u64"
                    },
                    {
                        "name": "initQuoteVirtReserves",
                        "type": "u64"
                    },
                    {
                        "name": "tradingFee",
                        "type": "u64"
                    },
                    {
                        "name": "randomAccountPubkey",
                        "type": "publicKey"
                    },
                    {
                        "name": "raffleMint",
                        "type": "publicKey"
                    }
                ]
            }
        },
        {
            "name": "poolState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "konst",
                        "type": "u128"
                    },
                    {
                        "name": "baseMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "baseVirtReserve",
                        "type": "u64"
                    },
                    {
                        "name": "baseRealReserve",
                        "type": "u64"
                    },
                    {
                        "name": "quoteMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "quoteReserve",
                        "type": "u64"
                    },
                    {
                        "name": "complete",
                        "type": "bool"
                    },
                    {
                        "name": "kingRaffle",
                        "type": "u64"
                    },
                    {
                        "name": "poolState",
                        "type": "publicKey"
                    },
                    {
                        "name": "token0Vault",
                        "type": "publicKey"
                    },
                    {
                        "name": "token1Vault",
                        "type": "publicKey"
                    },
                    {
                        "name": "vault0Mint",
                        "type": "publicKey"
                    },
                    {
                        "name": "vault1Mint",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "CreatePoolInput",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "baseAmount",
                        "type": "u64"
                    },
                    {
                        "name": "quoteAmount",
                        "type": "u64"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6002,
            "name": "Unauthorized",
            "msg": "Unauthorized"
        },
        {
            "code": 6003,
            "name": "InsufficientFund",
            "msg": "Insufficient fund"
        },
        {
            "code": 6004,
            "name": "UnknownToken",
            "msg": "One token should be Sol"
        },
        {
            "code": 6005,
            "name": "BondingCurveIncomplete",
            "msg": "BondingCurve incomplete"
        },
        {
            "code": 6006,
            "name": "BondingCurveComplete",
            "msg": "BondingCurve complete"
        },
        {
            "code": 6012,
            "name": "SlippageExceeded",
            "msg": "Slippage Exceeded"
        }
    ]
};

export const IDL: BoostFun = {
    "version": "0.1.0",
    "name": "boost_fun",
    "instructions": [
        {
            "name": "createPool",
            "accounts": [
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mintAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "baseMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creatorBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creatorQuoteAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverQuoteAta",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "input",
                    "type": {
                        "defined": "CreatePoolInput"
                    }
                }
            ]
        },
        {
            "name": "buy",
            "accounts": [
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "baseMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quoteMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "buyerBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "buyerQuoteAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverQuoteAta",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "slippage",
                    "type": "u64"
                },
                {
                    "name": "expectedTokens",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "sell",
            "accounts": [
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "seller",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta1",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeRecipient2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeQuoteAta2",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolState",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "baseMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quoteMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "sellerBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sellerQuoteAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverBaseAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reserverQuoteAta",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "slippage",
                    "type": "u64"
                },
                {
                    "name": "expectedAmountLamports",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "mainState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeRecipient1",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeRecipient2",
                        "type": "publicKey"
                    },
                    {
                        "name": "totalTokenSupply",
                        "type": "u64"
                    },
                    {
                        "name": "initBaseRealReserves",
                        "type": "u64"
                    },
                    {
                        "name": "initQuoteVirtReserves",
                        "type": "u64"
                    },
                    {
                        "name": "tradingFee",
                        "type": "u64"
                    },
                    {
                        "name": "randomAccountPubkey",
                        "type": "publicKey"
                    },
                    {
                        "name": "raffleMint",
                        "type": "publicKey"
                    }
                ]
            }
        },
        {
            "name": "poolState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "konst",
                        "type": "u128"
                    },
                    {
                        "name": "baseMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "baseVirtReserve",
                        "type": "u64"
                    },
                    {
                        "name": "baseRealReserve",
                        "type": "u64"
                    },
                    {
                        "name": "quoteMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "quoteReserve",
                        "type": "u64"
                    },
                    {
                        "name": "complete",
                        "type": "bool"
                    },
                    {
                        "name": "kingRaffle",
                        "type": "u64"
                    },
                    {
                        "name": "poolState",
                        "type": "publicKey"
                    },
                    {
                        "name": "token0Vault",
                        "type": "publicKey"
                    },
                    {
                        "name": "token1Vault",
                        "type": "publicKey"
                    },
                    {
                        "name": "vault0Mint",
                        "type": "publicKey"
                    },
                    {
                        "name": "vault1Mint",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "CreatePoolInput",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "baseAmount",
                        "type": "u64"
                    },
                    {
                        "name": "quoteAmount",
                        "type": "u64"
                    }
                ]
            }
        },
    ],
    "errors": [
        {
            "code": 6002,
            "name": "Unauthorized",
            "msg": "Unauthorized"
        },
        {
            "code": 6003,
            "name": "InsufficientFund",
            "msg": "Insufficient fund"
        },
        {
            "code": 6004,
            "name": "UnknownToken",
            "msg": "One token should be Sol"
        },
        {
            "code": 6005,
            "name": "BondingCurveIncomplete",
            "msg": "BondingCurve incomplete"
        },
        {
            "code": 6006,
            "name": "BondingCurveComplete",
            "msg": "BondingCurve complete"
        },
        {
            "code": 6012,
            "name": "SlippageExceeded",
            "msg": "Slippage Exceeded"
        }
    ]
};
