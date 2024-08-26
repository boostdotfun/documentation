import { web3 } from '@coral-xyz/anchor'
import { debug } from './constants'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { PublicKey } from '@solana/web3.js';


export function getPubkeyFromStr(key: string) {
	try {
		return new web3.PublicKey(key)
	} catch (pubkeyParseError) {
		debug({ pubkeyParseError })
		return null
	}
}

export async function getMultipleAccountsInfo(
	connection: web3.Connection,
	pubkeys: web3.PublicKey[],
	opt?: { retry?: boolean; duration?: number }
) {
	opt = opt ?? {}
	opt.retry = opt.retry ?? true
	opt.duration = opt.duration ?? 2000
	const { duration, retry } = opt
	const res = await connection.getMultipleAccountsInfo(pubkeys).catch(async () => {
		if (retry) {
			await sleep(duration)
			return await connection
				.getMultipleAccountsInfo(pubkeys)
				.catch((getMultipleAccountsInfoError) => {
					debug({ getMultipleAccountsInfoError })
					return null
				})
		}
		return null
	})
	return res
}


export function getKeypairFromStr(str: string): web3.Keypair | null {
    try {
      //console.log(str)
      const bytes = Buffer.from(str, 'utf8');
  
    // Encode the byte array to a Base58 string
      const encoded = bs58.encode(bytes);
      //console.log(encoded)
      return web3.Keypair.fromSecretKey(Uint8Array.from(bs58.decode(str)));
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  export function calcNonDecimalValue(value: number, decimals: number): number {
	return Math.trunc(value * Math.pow(10, decimals))
}

export function calcDecimalValue(value: number, decimals: number): number {
	return value / Math.pow(10, decimals)
}
export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function derivePoolId(mint: string, quoteMint: string): Promise<string> {
    const PREFIX_SEED = 'pool'; 
    const poolProgramId = new PublicKey('ATg7C16eEwjTF9TpTDnZ3pv1mMdyEpw4biQC8S7KhQVL');

    const baseMint = new PublicKey(mint);
    const quoteMintPublicKey = new PublicKey(quoteMint);

    const [poolState] = await PublicKey.findProgramAddress(
        [
            Buffer.from(PREFIX_SEED),
            baseMint.toBuffer(),
            quoteMintPublicKey.toBuffer(),
        ],
        poolProgramId
    );

    // Return the derived poolState as a string
    return poolState.toBase58();
}
  
