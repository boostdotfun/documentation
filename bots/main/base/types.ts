// @ts-nocheck
import { BoostFun } from '../idl/boost_fun'
import { IdlAccounts } from '@coral-xyz/anchor'

export type BaseRayInput = {
	rpcEndpointUrl: string
}
export type Result<T, E = any> = {
	[x: string]: any
	Ok?: T
	Err?: E
}
export type TxPassResult = {
	txSignature: string
}

export type PoolStateLayout = IdlAccounts<BoostFun>['poolState']
