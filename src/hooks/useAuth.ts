'use client'

import {
    useAccount,
    useDisconnect,
    useNetwork,
    usePublicClient,
    useWalletClient,
    useBalance,
    useEnsName,
    useEnsAvatar,
  } from 'wagmi'
  // @ts-ignore
  import { shortenAddress } from '../utils/shortenAddress'
  
  export function useAuth() {
    const provider = usePublicClient()
  
    const { data: signer } = useWalletClient()
    const { address, isConnecting, isConnected } = useAccount()
    const { data: ensName } = useEnsName({
      address: address,
    })
    const { disconnect } = useDisconnect()
    const { chain } = useNetwork()
    const { data: balance } = useBalance({ address: address })
  
    return {
      provider,
      signer,
      address: address,
      isConnected,
      ensName: ensName || shortenAddress(address),
      displayName: ensName || shortenAddress(address),
      balance: balance,
      loading: isConnecting,
      logout: disconnect,
      chain,
    }
  }