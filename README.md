General Information

When using Anchor, you have two options: you can directly call the Smart Contract using .rpc() when generating the transaction signature (as shown in the example), or you can use .instruction() to retrieve the instruction transaction and bundle it with a Jito tip, for example.

Prerequisites

Make sure to have Anchor and Solana/web3.js installed:

```bash
npm install @solana/web3.js @project-serum/anchor
```

Initialize Anchor

```js
import { AnchorProvider, Program, web3, BN } from '@project-serum/anchor';
import { BoostFun, IDL } from './path-to-your-idl';

const provider = AnchorProvider.env();
const programId = new web3.PublicKey('Program ID');
const program = new Program<BoostFun>(IDL, programId, provider);
```

Buy Method

```js
import { BN } from '@project-serum/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Pdas } from './path-to-your-pdas-class';

async function buy(input: {
amount: number;
slippage: number;
priorityFee: number;
expectedTokens: number;
poolId: string;
wallet: WalletContextState;
program: Program<BoostFun>;
}) {
const pdas = new Pdas(program.programId);
const buyer = input.wallet.publicKey;
if (!buyer) throw new Error('Wallet not found');

const poolState = new web3.PublicKey(input.poolId);  
const mainStateInfo = await program.account.mainState.fetch(pdas.mainState);

const poolInfo = await program.account.poolState.fetch(poolState);  
const { baseMint, quoteMint } = poolInfo;

const amount = new BN(input.amount);  
const slippage = new BN(input.slippage);  
const expectedTokens = new BN(input.expectedTokens);

const buyerBaseAta = getAssociatedTokenAddressSync(baseMint, buyer);  
const buyerQuoteAta = getAssociatedTokenAddressSync(quoteMint, buyer);  
const feeQuoteAta1 = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient1, true);  
const feeQuoteAta2 = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient2);  
const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolState, true);  
const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolState, true);

const transactionSignature = await program.methods  
    .buy(amount, slippage, expectedTokens)  
    .accounts({  
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
        tokenProgram: web3.TOKEN_PROGRAM_ID,  
        systemProgram: web3.SystemProgram.programId,  
        associatedTokenProgram: web3.ASSOCIATED_TOKEN_PROGRAM_ID,  
    })  
    .rpc();

console.log('Transaction Signature:', transactionSignature);  
}
```

Sell Method

```js
import { BN } from '@project-serum/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Pdas } from './path-to-your-pdas-class';

async function sell(input: {
amount: number;
priorityFee: number;
expectedSol: number;
slippage: number;
poolId: string;
wallet: WalletContextState;
program: Program<BoostFun>;
}) {
const pdas = new Pdas(input.program.programId);
const seller = input.wallet.publicKey;
if (!seller) throw new Error('Wallet not found');

const poolState = new web3.PublicKey(input.poolId);  
const mainStateInfo = await program.account.mainState.fetch(pdas.mainState);

const poolInfo = await program.account.poolState.fetch(poolState);  
const { baseMint, quoteMint } = poolInfo;

const sellAmount = new BN(input.amount);  
const expectedSol = new BN(input.expectedSol);  
const slippage = new BN(input.slippage);

const sellerBaseAta = getAssociatedTokenAddressSync(baseMint, seller);  
const sellerQuoteAta = getAssociatedTokenAddressSync(quoteMint, seller);  
const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolState, true);  
const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolState, true);  
const feeQuoteAta1 = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient1, true);  
const feeQuoteAta2 = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient2);

const transactionSignature = await input.program.methods  
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
        tokenProgram: web3.TOKEN_PROGRAM_ID,  
        systemProgram: web3.SystemProgram.programId,  
        associatedTokenProgram: web3.ASSOCIATED_TOKEN_PROGRAM_ID,  
    })  
    .rpc();

console.log('Transaction Signature:', transactionSignature);  
}
```

