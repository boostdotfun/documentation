Welcome to the Boost.fun Documentation
===================

# Solana Token Trading Program

This project provides a simple example of how to buy and sell tokens from a specified pool on the Solana blockchain using the Anchor framework.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- A Solana wallet with sufficient funds for transactions.
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) installed.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. **Install dependencies:**

   Use npm to install the required dependencies:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add the following:

   ```bash
   RPC_URL=https://api.mainnet-beta.solana.com
   KEYPAIR=YourKeypair
   ```

## Usage

### Buying Tokens

To buy tokens, use the following example code:

```javascript
import { Keypair } from "@solana/web3.js";
import { buyToken } from "./index";

const mint = "So11111111111111111111111111111111111111112";
const keypair = Keypair.fromSecretKey(new Uint8Array([...]));
const amount = 100;

buyToken(mint, keypair, amount)
  .then(() => console.log("Tokens bought successfully"))
  .catch((error) => console.error("Error buying tokens:", error));
```

### Selling Tokens

To sell tokens, use the following example code:

```javascript
import { Keypair } from "@solana/web3.js";
import { sellToken } from "./index";

const mint = "So11111111111111111111111111111111111111112";
const keypair = Keypair.fromSecretKey(new Uint8Array([...]));
const amount = 50;

sellToken(mint, keypair, amount)
  .then(() => console.log("Tokens sold successfully"))
  .catch((error) => console.error("Error selling tokens:", error));
```

### Running the Main File

After setting up your environment and writing your buy/sell logic, you can run your main script using:

```bash
npm run start
```
