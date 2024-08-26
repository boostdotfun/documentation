import { web3 } from '@coral-xyz/anchor'
import { Seeds } from './constants'

export class Pdas {
	programId: web3.PublicKey
	mainState: web3.PublicKey
	constructor(programId: web3.PublicKey) {
		this.programId = programId
		this.mainState = web3.PublicKey.findProgramAddressSync([Seeds.main], this.programId)[0]
	}
	getPoolStateAccount({
		baseMint,
		quoteMint,
		owner
	}: {
		baseMint: web3.PublicKey
		quoteMint: web3.PublicKey
		owner: web3.PublicKey
	}) {
		return web3.PublicKey.findProgramAddressSync(
			[Seeds.pool, baseMint.toBuffer(), quoteMint.toBuffer()],
			this.programId
		)[0]
	}
}
