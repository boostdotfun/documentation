import {
  PROGRAMS,
} from "./constants";
import { BN } from "bn.js";
import { calcNonDecimalValue } from "./utils";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { Program, Wallet } from "@coral-xyz/anchor";
import { BoostFun } from "./idl/boost_fun";
import { BoostFunError } from "./error";
import { Pdas } from "./pdas";
import { getPubkeyFromStr, sleep } from "./utils";
import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { toBufferBE } from "bigint-buffer";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { sendBundle } from "./bundle";
import { config } from "../config";

export const sell = async (input: {
  amount: number;
  expectedSol: number;
  slippage: number;
  poolId: string;
  wallet: Wallet;
  program: Program<BoostFun> | null;
}) => {
  try {
    if (!input.program) return { Err: BoostFunError.PROGRAM_NOT_FOUND };

    const pdas = new Pdas(input.program.programId);
    const seller = input.wallet.publicKey;
    if (!seller) return { Err: BoostFunError.WALLET_NOT_FOUND };
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
      .catch((fetchPoolInfoError) => {
        console.debug({ fetchPoolInfoError });
        return null;
      });
    if (!poolInfo) return { Err: BoostFunError.POOL_NOT_FOUND };

    const { baseMint, quoteMint } = poolInfo;
    const baseMintDecimals = 6;
    const sellAmount = new BN(
      toBufferBE(
        BigInt(calcNonDecimalValue(input.amount, baseMintDecimals).toString()),
        8
      )
    );

    const expectedSol = new BN(
      toBufferBE(BigInt(Math.round(input.expectedSol * LAMPORTS_PER_SOL)), 8)
    );
    const slippage = new BN(Math.round(input.slippage));
    const sellerBaseAta = getAssociatedTokenAddressSync(baseMint, seller);
    const sellerQuoteAta = getAssociatedTokenAddressSync(quoteMint, seller);
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
    const feeQuoteAta1 = getAssociatedTokenAddressSync(
      quoteMint,
      mainStateInfo.feeRecipient1,
      true
    );
    const feeQuoteAta2 = getAssociatedTokenAddressSync(
      quoteMint,
      mainStateInfo.feeRecipient2
    );

    const sellTransaction = new Transaction().add(
      await input.program.methods
        .sell(sellAmount, slippage, expectedSol)
        .accounts({
          seller,
          sellerBaseAta,
          sellerQuoteAta,
          mainState: pdas.mainState,
          baseMint,
          quoteMint,
          feeRecipient1: mainStateInfo.feeRecipient1,
          feeRecipient2: mainStateInfo.feeRecipient2,
          feeQuoteAta1,
          feeQuoteAta2,
          poolState,
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
    const jitoTipsAccount = new PublicKey(
      '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT',
    );
  
    const tipInstruction = SystemProgram.transfer({
      fromPubkey: input.wallet.publicKey!,
      toPubkey: jitoTipsAccount,
      lamports: config.jitoTip,
    });

    sellTransaction.add(tipInstruction);

    const { blockhash } =
      await input.program.provider.connection.getLatestBlockhash();
    sellTransaction.recentBlockhash = blockhash;
    sellTransaction.feePayer = seller;

    const signedTransaction = await input.wallet.signTransaction!(
      sellTransaction
    );
    
    const serializedSignedTransaction = signedTransaction.serialize();
    const rawTx = Array.from(signedTransaction.serialize());

    const rawTxUint8Array = new Uint8Array(rawTx);

    sendBundle([rawTxUint8Array], true)

    const transactionFromBuffer = Transaction.from(
      Buffer.from(serializedSignedTransaction)
    );

    const extractedTxSignature = bs58.encode(
      transactionFromBuffer.signatures[0].signature as Buffer
    );

    if (extractedTxSignature) {

      return { Ok: { txSignature: extractedTxSignature } };

    }
  } catch (error: any) {
    console.error("Transaction failed:", error);
    return { Err: "Transaction failed" };
  }
};

