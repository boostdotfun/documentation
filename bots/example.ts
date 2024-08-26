import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import {
  Keypair
} from "@solana/web3.js";
import dotenv from "dotenv";
import { config } from "./config";
import { buyToken, sellToken } from "./index";
import { sleep } from "./main/utils";


dotenv.config();

const selectedMint = config.coinMint;
const keypair = Keypair.fromSecretKey(bs58.decode(process.env.KEYPAIR!));

const main = async () => {

  console.log("Selected Token", selectedMint);

  console.log("BUYING TOKEN");
  buyToken(selectedMint, keypair, 0.001 ); //amount is in SOL

  console.log("SELLING TOKEN");

  await sleep(5000)

  sellToken(selectedMint, keypair, 5000); //amount is in tokens
};


main();
