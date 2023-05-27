'use client'

import { getDefaultConfig } from 'connectkit'
import { createConfig, configureChains } from 'wagmi'
import { sepolia } from 'wagmi/chains';
import { createPublicClient, http } from 'viem'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const walletConnectID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

const { chains } = configureChains(
	[sepolia],
	[
    alchemyProvider({ apiKey: alchemyKey as string }),
		publicProvider(),
	],
)

export const config = createConfig(
  getDefaultConfig({
      alchemyId: alchemyKey as string,
      walletConnectProjectId: walletConnectID as string,
      appName: "baby-indexer",
      autoConnect: true,
      chains
  }),
)

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

