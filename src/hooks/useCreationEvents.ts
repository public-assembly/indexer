import { SEPOLIA_ADDRESSES } from '../lib/addresses';
import { publicClient } from '../wagmi';
import { erc721PressFactory_abi } from '../contracts/erc721PressFactory_abi';
import { useState, useEffect } from 'react';
import type { PublicClient, Hex } from 'viem';

type Props = {
  providerForQuery: PublicClient;
  blockStart: bigint;
};

export const useCreationEvents = async ({
  providerForQuery,
  blockStart,
}: Props) => {
  const [creationEvents, setCreationEvents] = useState();

  useEffect(() => {
    const getEvents = async () => {
      if (!providerForQuery) return;
      try {
        const filter = await publicClient.createContractEventFilter({
          abi: erc721PressFactory_abi,
          address: SEPOLIA_ADDRESSES.ERC721.ERC721_PRESS_FACTORY_PROXY as Hex,
          eventName: 'Create721Press',
          fromBlock: blockStart,
          toBlock: 'latest',
          // A filter can be scoped to given indexed arguments:
          // args: { from: "", to: "" }
        });
        const logs = await publicClient.getFilterChanges({ filter });

        console.log('New creation events:', logs);
        // @ts-ignore
        setCreationEvents(logs);

        // for (let i = 0; i < newTokenMintedEvents.length; i++) {
        //     // @ts-ignore
        //     if (newTokenMintedEvents[i].args[0].toString() == tokenId.toString()) {
        //         const block = await providerForQuery.getBlock(newTokenMintedEvents[i].blockNumber)
        //         // @ts-ignore
        //         setTokenCreated(block.timestamp * 1000)
        //         // @ts-ignore
        //         setTokenCreator(newTokenMintedEvents[i].args[1].toString())
        //         return
        //     }
        // }
      } catch (e: any) {
        // TODO: add in error handling
      }
    };
    getEvents();
  }, [providerForQuery]);

  return { creationEvents };
};

// // Emitted when a new Press is created from ERC721PressFactoryProxy
// var eventAbi =
//     ['event Create721Press(address indexed newPress, address creator, address indexed initialOwner, address indexed initialLogic, address initialRenderer, bool soulbound)'];

// if (!providerForQuery) return
// // const filter = await publicClient.createContractEventFilter({
// //     abi: eventAbi
// // })
// const filter = await publicClient.createContractEventFilter({
//     abi: erc721PressFactory_abi,
//     address: SEPOLIA_ADDRESS.ERC721_PRESS_FACTORY_PROXY,
//     eventName: 'Create721Press',
//     fromBlock: blockStart,
//     // args: { from: "", to: "" }
// })
// return filter
