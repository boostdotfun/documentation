// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { web3 } from "@coral-xyz/anchor";
import { bundle } from "jito-ts";
import { searcherClient } from "jito-ts/dist/sdk/block-engine/searcher";
import {
  connection,
  jitoBlockEngineMainnet,
  jitoBlockEngineTestnet,
} from "./constants";
import { sleep } from "./utils";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

export async function sendBundle(rawTxs: Uint8Array[], isMainnet: boolean) {
    try {
      const limitTries = 15;
      let retries = 0;
      const jitoClient = searcherClient(
        jitoBlockEngineMainnet
      );
      const txs = rawTxs.map((e: any) => {
        return web3.VersionedTransaction.deserialize(Uint8Array.from(e));
      });
      const b = new bundle.Bundle(txs, txs.length);
      if (b instanceof Error) {
        console.log({ bundleError: b });
        return { Err: 'Failed to prepare the bundle transaction' };
      }

      const sendAndCheckBundle = async () => {
        jitoClient.sendBundle(b).catch(async (error) => {
          console.log('Initial bundle send error: %s', new Error(error));
          await sleep(2000);
          return jitoClient.sendBundle(b).catch((sendBundleError) => {
            console.log(
              'Retry bundle send error: %s',
              new Error(sendBundleError),
            );
            return null;
          });
        });

        const extractedTxSignature = bs58.encode(txs[0].signatures[0]);
        console.log('Transaction sent: %s', txs[0]);
        console.log('Signature: %s', extractedTxSignature);

        let confirmedBundle = null;
        while (!confirmedBundle && retries < limitTries) {
          confirmedBundle = await connection.getParsedTransaction(
            extractedTxSignature,
            {
              maxSupportedTransactionVersion: 0,
            },
          );
          if (!confirmedBundle) {
            console.log('Waiting for bundle confirmation and waiting 2 seconds');
            await sleep(2000);
            retries++;
          } else {
            console.log('confirmedBundle');
          }
        }

        return confirmedBundle
          ? { Ok: { txSignature: extractedTxSignature } }
          : { Err: 'Transaction confirmation failed' };
      };

      console.log('Sending bundle ...');

      let result;
      do {
        result = await sendAndCheckBundle();
        if (result.Err) {
          console.log('Retrying bundle sending...');
          retries = 0; // Reset retries for the next attempt
          await sleep(1000);
        }
      } while (result.Err);

    return result;
  } catch (sendBundleError) {
    console.log("error:" + sendBundleError);
    return { Err: 'Bundle transaction failed' };
  }
}