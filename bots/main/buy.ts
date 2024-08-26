// @ts-nocheck
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  BundleFee,
  DECIMALS_PER_TOKEN,
  INITIAL_BASE_VIRT_RESERVE,
  INITIAL_QUOTE_RESERVE,
  PROGRAMS,
  SELECTED_JITO_TIP_WALLET,
  RPC_URL
} from "./constants";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection
} from "@solana/web3.js";
import { BoostFun } from "./idl/boost_fun";
import { Program, Wallet } from "@coral-xyz/anchor";
import { Pdas } from "./pdas";
import { toBufferBE } from "bigint-buffer";
import { BN } from "bn.js";
import { getPubkeyFromStr, sleep } from "./utils";
import { calcDecimalValue, calcNonDecimalValue } from "./utils";
import { Result } from "./base/types";
import { BoostFunError as BoostFunError } from "./error";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { sendBundle } from "./bundle";
import { config } from "../config";


export const buy = async (input: {
  amount: number;
  expectedTokens: number;
  slippage: number;
  poolId: string;
  wallet: Wallet;
  program: Program<BoostFun> | null;
}) => {
  if (!input.program) return { Err: BoostFunError.PROGRAM_NOT_FOUND };

  const result = await generateBuyTransaction(input);
  if ("Err" in result) return { Err: result.Err };

  const { signedTransaction: serializedSignedTransaction } = result.Ok;

  const jitoTipsAccount = new PublicKey(
    '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT',
  );

  const tipInstruction = SystemProgram.transfer({
    fromPubkey: input.wallet.publicKey!,
    toPubkey: jitoTipsAccount,
    lamports: config.jitoTip,
  });

  serializedSignedTransaction.add(tipInstruction);

  const connection = new Connection(RPC_URL, "confirmed");

  serializedSignedTransaction.recentBlockhash = (
    await connection.getRecentBlockhash()
  ).blockhash;

  serializedSignedTransaction.feePayer = input.wallet.publicKey;

  const signedTransaction = await input.wallet.signTransaction!(serializedSignedTransaction);

  const rawTx = Array.from(signedTransaction.serialize());

  try {

    let txSignature;
  
    sendBundle([rawTx], true);

    // Extract the transaction signature and encode it in base58
    const transaction = Transaction.from(
      Buffer.from(serializedSignedTransaction)
    );
    const extractedTxSignature = bs58.encode(
      transaction.signatures[0].signature as Buffer
    );

    console.log("Transaction sent:", transaction);
    console.log("signature", extractedTxSignature);

    if (extractedTxSignature) {
      return { Ok: { txSignature: extractedTxSignature } };
    }
  } catch (error: any) {
    console.error("Transaction failed:", error);
    return { Err: "Transaction failed" };
  }
};

export const generateBuyTransaction = async (input: {
  amount: number;
  slippage: number;
  expectedTokens: number;
  poolId: string;
  wallet: Wallet;
  program: Program<BoostFun> | null;
}) => {
  if (!input.program) return { Err: BoostFunError.PROGRAM_NOT_FOUND };

  const pdas = new Pdas(input.program.programId);

  const buyer = input.wallet.publicKey;

  if (!buyer) return { Err: BoostFunError.WALLET_NOT_FOUND };

  const poolState = getPubkeyFromStr(input.poolId);

  if (!poolState) return { Err: BoostFunError.INVALID_INPUT };
  
  const mainStateInfo = await input.program.account.mainState
    .fetch(pdas.mainState)
    .catch((fetchMainStateInfoError: any) => {
      console.debug({ fetchMainStateInfoError });
      return null;
    });
  if (!mainStateInfo) return { Err: BoostFunError.FAILED_TO_FETCH_DATA };

  const poolInfo = await input.program.account.poolState
    .fetch(poolState)
    .catch((fetchPoolInfoError: any) => {
      console.debug({ fetchPoolInfoError });
      return null;
    });

  if (!poolInfo) return { Err: BoostFunError.POOL_NOT_FOUND };

  const { baseMint, quoteMint } = poolInfo;

  const amount = new BN(
    toBufferBE(BigInt(calcNonDecimalValue(input.amount, 9).toString()), 8)
  );

  const slippage = new BN(Math.round(input.slippage));

  const expectedTokens = new BN(Math.round(input.expectedTokens));

  const buyerBaseAta = getAssociatedTokenAddressSync(baseMint, buyer);

  const buyerQuoteAta = getAssociatedTokenAddressSync(quoteMint, buyer);

  const feeQuoteAta1 = getAssociatedTokenAddressSync(
    quoteMint,
    mainStateInfo.feeRecipient1,
    true
  );

  const feeQuoteAta2 = getAssociatedTokenAddressSync(
    quoteMint,
    mainStateInfo.feeRecipient2
  );

  const reserverBaseAta = getAssociatedTokenAddressSync(
    baseMint,
    poolState,
    true
  );

  const reserverQuoteAta = getAssociatedTokenAddressSync(
    quoteMint,
    poolState,
    true
  );

  const transaction = new Transaction().add(
    await input.program.methods
      .buy(amount, slippage, expectedTokens)
      .accounts({
        baseMint,
        quoteMint,
        buyer,
        buyerBaseAta,
        buyerQuoteAta,
        poolState,
        mainState: pdas.mainState,
        feeRecipient1: mainStateInfo.feeRecipient1,
        feeRecipient2: mainStateInfo.feeRecipient2,
        feeQuoteAta1,
        feeQuoteAta2,
        reserverBaseAta,
        reserverQuoteAta,
        tokenProgram: PROGRAMS.tokenProgram,
        systemProgram: PROGRAMS.systemProgram,
        associatedTokenProgram: PROGRAMS.associatedTokenProgram,
      })
      .preInstructions([
        ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 }),
      ])
      .instruction()
  );

  const { blockhash } =
    await input.program.provider.connection.getLatestBlockhash();

  transaction.recentBlockhash = blockhash;

  transaction.feePayer = input.wallet.publicKey;

  const signedTransaction = await input.wallet.signTransaction!(transaction);

  return { Ok: { signedTransaction: signedTransaction } };
};

