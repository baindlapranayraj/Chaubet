/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/chaubet.json`.
 */
export type Chaubet = {
  "address": "BAYLRX7e4HzwqWu5tGTrUjAEjWEShxcAjbUzfxfnEwBu",
  "metadata": {
    "name": "chaubet",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "adminWithdrawProfit",
      "discriminator": [
        208,
        240,
        96,
        97,
        97,
        135,
        99,
        48
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        },
        {
          "name": "marketVaultAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "treasuryAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "banBettor",
      "discriminator": [
        146,
        212,
        208,
        255,
        112,
        214,
        24,
        239
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "bettor",
          "writable": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "betrorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "bettorWithdrawAmount",
      "discriminator": [
        216,
        22,
        90,
        26,
        160,
        83,
        243,
        31
      ],
      "accounts": [
        {
          "name": "bettor",
          "writable": true,
          "signer": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        },
        {
          "name": "wagerAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              },
              {
                "kind": "account",
                "path": "bettor"
              }
            ]
          }
        },
        {
          "name": "bettorWalletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  119,
                  97,
                  108,
                  108,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "bettorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "buyShares",
      "discriminator": [
        40,
        239,
        138,
        154,
        8,
        37,
        106,
        108
      ],
      "accounts": [
        {
          "name": "bettor",
          "writable": true,
          "signer": true
        },
        {
          "name": "bettorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "wagerAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              },
              {
                "kind": "account",
                "path": "bettor"
              }
            ]
          }
        },
        {
          "name": "bettorWalletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  119,
                  97,
                  108,
                  108,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        },
        {
          "name": "mintYes",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  121,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "mintNo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  110,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "marketVaultAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "bettorYesAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintYes"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "bettorNoAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintNo"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "sharesAmount",
          "type": "u64"
        },
        {
          "name": "isYes",
          "type": "bool"
        }
      ]
    },
    {
      "name": "claimBettorAmount",
      "discriminator": [
        249,
        201,
        26,
        38,
        220,
        159,
        182,
        62
      ],
      "accounts": [
        {
          "name": "bettor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wagerAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              },
              {
                "kind": "account",
                "path": "bettor"
              }
            ]
          }
        },
        {
          "name": "bettorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "bettorWalletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  119,
                  97,
                  108,
                  108,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "bettorYesAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintYes"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "bettorNoAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintNo"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        },
        {
          "name": "marketVaultAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "mintYes",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  121,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "mintNo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  110,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "sharesAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createMarket",
      "discriminator": [
        103,
        226,
        97,
        235,
        200,
        188,
        251,
        254
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        },
        {
          "name": "mintYes",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  121,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "mintNo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  110,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "marketVaultAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "metadataYes",
          "writable": true
        },
        {
          "name": "metadataNo",
          "writable": true
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "arg",
          "type": {
            "defined": {
              "name": "marketArg"
            }
          }
        },
        {
          "name": "metadataArg",
          "type": {
            "defined": {
              "name": "initTokenArg"
            }
          }
        }
      ]
    },
    {
      "name": "initializeBettorAccount",
      "discriminator": [
        44,
        37,
        5,
        201,
        155,
        102,
        253,
        11
      ],
      "accounts": [
        {
          "name": "bettor",
          "writable": true,
          "signer": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "bettorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "bettorWalletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  119,
                  97,
                  108,
                  108,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountDeposited",
          "type": "u64"
        },
        {
          "name": "name",
          "type": {
            "option": "string"
          }
        }
      ]
    },
    {
      "name": "initializeConfig",
      "discriminator": [
        208,
        127,
        21,
        1,
        194,
        190,
        196,
        70
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "treasuryAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "fees",
          "type": {
            "option": "u16"
          }
        }
      ]
    },
    {
      "name": "resolveMarket",
      "discriminator": [
        155,
        23,
        80,
        173,
        46,
        74,
        23,
        239
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "outcome",
          "type": {
            "defined": {
              "name": "marketOutcome"
            }
          }
        }
      ]
    },
    {
      "name": "sellShares",
      "discriminator": [
        184,
        164,
        169,
        16,
        231,
        158,
        199,
        196
      ],
      "accounts": [
        {
          "name": "bettor",
          "writable": true,
          "signer": true
        },
        {
          "name": "bettorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "bettorWalletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114,
                  95,
                  119,
                  97,
                  108,
                  108,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "account",
                "path": "chauConfig"
              }
            ]
          }
        },
        {
          "name": "chauConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "chauMarket",
          "writable": true
        },
        {
          "name": "wagerAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              },
              {
                "kind": "account",
                "path": "bettor"
              }
            ]
          }
        },
        {
          "name": "mintYes",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  121,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "mintNo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  110,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "bettorYesAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintYes"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "bettorNoAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "bettor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintNo"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "marketVaultAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "chauMarket"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "sharesAmount",
          "type": "u64"
        },
        {
          "name": "isYes",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bettor",
      "discriminator": [
        126,
        54,
        2,
        128,
        133,
        184,
        253,
        108
      ]
    },
    {
      "name": "chauConfig",
      "discriminator": [
        53,
        91,
        43,
        155,
        70,
        128,
        192,
        172
      ]
    },
    {
      "name": "chauMarket",
      "discriminator": [
        253,
        152,
        176,
        12,
        130,
        199,
        93,
        250
      ]
    },
    {
      "name": "wager",
      "discriminator": [
        3,
        110,
        53,
        190,
        113,
        31,
        230,
        40
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "tooManyAdmins",
      "msg": "Max Admin Lenght Exceeded"
    },
    {
      "code": 6001,
      "name": "parameterTooLow",
      "msg": "The liquidity parameter b is too low"
    },
    {
      "code": 6002,
      "name": "maxLenght",
      "msg": "The given string length is more then max"
    },
    {
      "code": 6003,
      "name": "adminExist",
      "msg": "The admin already exist no need to sign again"
    },
    {
      "code": 6004,
      "name": "unAuthourized",
      "msg": "you are not authourized to do this instruction"
    },
    {
      "code": 6005,
      "name": "accountAlreadyInitialized",
      "msg": "This account is already initialized"
    },
    {
      "code": 6006,
      "name": "arthemeticOverflow",
      "msg": "Overflow Error occured"
    },
    {
      "code": 6007,
      "name": "arthemeticUnderflow",
      "msg": "Underflow Error occured"
    },
    {
      "code": 6008,
      "name": "arthemeticError",
      "msg": "Mathmatical Error Occured"
    },
    {
      "code": 6009,
      "name": "zeroAmount",
      "msg": "Amount cannot be Zero"
    },
    {
      "code": 6010,
      "name": "invalidFees",
      "msg": "The given fees is invalid"
    },
    {
      "code": 6011,
      "name": "notEnoughAmount",
      "msg": "The given user does not have requied SOL amount"
    },
    {
      "code": 6012,
      "name": "marketGotResolved",
      "msg": "You cannot particpate in this market it got resolved"
    },
    {
      "code": 6013,
      "name": "banned",
      "msg": "Your bettor wallet got banned you cannot performe any actions using this account"
    },
    {
      "code": 6014,
      "name": "marketNotResolved",
      "msg": "Market is not resolved"
    },
    {
      "code": 6015,
      "name": "notEnoughShares",
      "msg": "You dont have enough shares to claim"
    },
    {
      "code": 6016,
      "name": "invalidAccount",
      "msg": "The given account is invalid"
    }
  ],
  "types": [
    {
      "name": "bettor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bettorPubkey",
            "type": "pubkey"
          },
          {
            "name": "bettorName",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "bettorNetProfit",
            "type": "i64"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "isBan",
            "type": "bool"
          },
          {
            "name": "bettorVaultBump",
            "type": "u8"
          },
          {
            "name": "bettorBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "chauConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "fees",
            "type": "u16"
          },
          {
            "name": "treasutyAmount",
            "type": "u64"
          },
          {
            "name": "trasuryBump",
            "type": "u8"
          },
          {
            "name": "configBump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "chauMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketName",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "intialDeposite",
            "type": "u64"
          },
          {
            "name": "lsmrB",
            "type": "u64"
          },
          {
            "name": "deadLine",
            "type": "i64"
          },
          {
            "name": "marketState",
            "type": {
              "defined": {
                "name": "marketStatus"
              }
            }
          },
          {
            "name": "marketOutcome",
            "type": {
              "defined": {
                "name": "marketOutcome"
              }
            }
          },
          {
            "name": "outcomeYesShares",
            "type": "u64"
          },
          {
            "name": "outcomeNoShares",
            "type": "u64"
          },
          {
            "name": "mintYesBump",
            "type": "u8"
          },
          {
            "name": "mintNoBump",
            "type": "u8"
          },
          {
            "name": "marketVaultBump",
            "type": "u8"
          },
          {
            "name": "marketBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "initTokenArg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "yesName",
            "type": "string"
          },
          {
            "name": "yesSymbol",
            "type": "string"
          },
          {
            "name": "yesUri",
            "type": "string"
          },
          {
            "name": "noName",
            "type": "string"
          },
          {
            "name": "noSymbol",
            "type": "string"
          },
          {
            "name": "noUri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "marketArg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "lmsrB",
            "type": "u64"
          },
          {
            "name": "deadLine",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "marketOutcome",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "yes"
          },
          {
            "name": "no"
          },
          {
            "name": "notResolved"
          }
        ]
      }
    },
    {
      "name": "marketStatus",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "resolved"
          },
          {
            "name": "active"
          }
        ]
      }
    },
    {
      "name": "wager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bettorPubkey",
            "type": "pubkey"
          },
          {
            "name": "marketPubkey",
            "type": "pubkey"
          },
          {
            "name": "betAmountSpent",
            "type": "u64"
          },
          {
            "name": "betAmountEarned",
            "type": "u64"
          },
          {
            "name": "marketStatus",
            "type": {
              "defined": {
                "name": "marketStatus"
              }
            }
          },
          {
            "name": "marketOutcome",
            "type": {
              "defined": {
                "name": "marketOutcome"
              }
            }
          },
          {
            "name": "yesShares",
            "type": "u64"
          },
          {
            "name": "noShares",
            "type": "u64"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "betBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
