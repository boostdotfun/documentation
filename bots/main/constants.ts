import { PublicKey, clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { web3 } from "@coral-xyz/anchor";
import {
  ASSOCIATED_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@coral-xyz/anchor/dist/cjs/utils/token";
import { config } from "dotenv";

config();

export const SOLANA_MAIN = clusterApiUrl(WalletAdapterNetwork.Mainnet);
export const SOLANA_TEST = clusterApiUrl(WalletAdapterNetwork.Testnet);
export const SOLANA_DEV = clusterApiUrl(WalletAdapterNetwork.Devnet);

export const JITO_TIP_WALLET_TESTNET =
  "B1mrQSpdeMU9gCvkJ6VsXVVoYjRGkNA7TtjMyqxrhecH";
export const JITO_TIP_WALLET_MAINNET =
  "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT";

export const jitoBlockEngineTestnet = "ny.testnet.block-engine.jito.wtf";
export const jitoBlockEngineMainnet = "frankfurt.mainnet.block-engine.jito.wtf";

const networkRpcURL = process.env.RPC_URL ||"https://api.mainnet-beta.solana.com"; //default

const programId = "ATg7C16eEwjTF9TpTDnZ3pv1mMdyEpw4biQC8S7KhQVL";
export const PROGRAM_ID = new PublicKey(programId);
export const RPC_URL = networkRpcURL;

export const connection = new web3.Connection(networkRpcURL);

/** Address of the special mint for wrapped native SOL in spl-token */
export const NATIVE_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

export const PROGRAMS = {
  systemProgram: web3.SystemProgram.programId,
  tokenProgram: TOKEN_PROGRAM_ID,
  associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
};

export const Seeds = {
  main: Buffer.from("main"),
  pool: Buffer.from("pool"),
};

export const debug = console.log;
export const info = console.log;
export const error = console.log;
