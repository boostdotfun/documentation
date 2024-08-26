import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { buy } from "./main/buy";
import {
  Connection,
  Keypair,
} from "@solana/web3.js";
import { BoostFun, IDL } from "./main/idl/boost_fun";
import { PROGRAM_ID, RPC_URL } from "./main/constants";
import { sell } from "./main/sell";
import { derivePoolId } from "./main/utils";
import { config } from "./config";

/**
 * Buys tokens from a specified pool.
 *
 * @param {string} mint - The mint address of the token.
 * @param {Keypair} keypair - The keypair used for signing the transaction.
 * @param {number} amount - The amount of tokens to buy.
 * @returns {Promise<void>} - A promise that resolves when the purchase is complete.
 *
 * @example
 * const mint = "So11111111111111111111111111111111111111112";
 * const keypair = Keypair.fromSecretKey(...);
 * const amount = 100;
 * await buyToken(mint, keypair, amount);
 */
export const buyToken = async (mint: string, keypair: Keypair, amount: number) => {

    const poolId = await derivePoolId(mint, config.quoteMint);

    const wallet = new Wallet(keypair);
  
    const connection = new Connection(RPC_URL, "confirmed");
  
    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
  
    const program = new Program<BoostFun>(IDL, PROGRAM_ID, provider);
  
    const result = await buy({
      amount,
      expectedTokens: 0,
      slippage: 0,
      poolId,
      wallet,
      program,
    });
    console.log(result);
  };
  
  /**
 * Sells tokens to a specified pool.
 *
 * @param {string} mint - The mint address of the token.
 * @param {Keypair} keypair - The keypair used for signing the transaction.
 * @param {number} amount - The amount of tokens to sell.
 * @returns {Promise<void>} - A promise that resolves when the sale is complete.
 *
 * @example
 * const mint = "So11111111111111111111111111111111111111112";
 * const keypair = Keypair.fromSecretKey(...);
 * const amount = 50;
 * await sellToken(mint, keypair, amount);
 */
  export const sellToken = async (mint: string, keypair: Keypair, amount: number) => {
  
    const poolId = await derivePoolId(mint, config.quoteMint);

    const wallet = new Wallet(keypair);
  
    const connection = new Connection(RPC_URL, "confirmed");
  
    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
  
    const program = new Program<BoostFun>(IDL, PROGRAM_ID, provider);
  
    const result = await sell({
      amount: amount,
      expectedSol: 0,
      wallet: wallet,
      slippage: 0,
      poolId: poolId,
      program,
    });
    console.log(result);
  };