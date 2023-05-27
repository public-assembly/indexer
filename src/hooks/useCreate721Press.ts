
'use client' 

import { erc721PressFactory_abi } from "../contracts/erc721PressFactory_abi";
import { SEPOLIA_ADDRESSES } from "../lib/addresses";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

type Props = {
    channelName: string,
    initialOwner: string,
    logicInit: string,
    onSuccessCB?: Function
};

export function useCreate721Press({channelName, initialOwner, logicInit, onSuccessCB }: Props) {

    const configuration = {
        fundsRecipient: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        primarySaleFeeRecipient: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        maxSupply: BigInt("18446744073709551615"),
        royaltyBPS: 0,
        primarySaleFeeBPS: 0,
    }

    const channelNameInput = channelName ? channelName : ""
    const initialOwnerInput = initialOwner ? initialOwner : ""
    const logicInitInput = logicInit ? logicInit : ""

    const validTxn = !channelNameInput || !initialOwnerInput || !logicInitInput ? false : true   

    const { config, error } = usePrepareContractWrite({
        address: SEPOLIA_ADDRESSES.ERC721.ERC721_PRESS_FACTORY as `0x${string}`, 
        abi: erc721PressFactory_abi,
        functionName: "createPress",
        args: [
            channelNameInput,
            "DEFAULT",
            initialOwnerInput as `0x${string}`,
            SEPOLIA_ADDRESSES.ERC721.CURATION_LOGIC as `0x${string}`,
            logicInitInput as `0x${string}`,
            SEPOLIA_ADDRESSES.ERC721.CURATION_METADATA_RENDERER as `0x${string}`,
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            true,
            configuration            
        ],
        enabled: validTxn,
    })
    
    console.log("create channel prep config error", error)

    const { 
        write,
        data,
        error: writeError,
        isError,
        isLoading,
        isSuccess,
        status
    } = useContractWrite(config)      

    // Wait for data from createChannel call
    const { data: createChannelData, isLoading: createChannelLoading } = useWaitForTransaction({
        hash:  data?.hash,
        onSuccess() {
            if (!!onSuccessCB) {
                onSuccessCB?.()
            } else {
                return
            }            
        }
    })           

    return {
        config,
        error,
        write,
        writeError,
        data,
        isError,
        isLoading,
        isSuccess,
        status,
        createChannelData,
        createChannelLoading
    }
}

export default useCreate721Press