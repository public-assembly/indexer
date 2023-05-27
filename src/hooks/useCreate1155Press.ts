'use client' 

import { erc1155PressFactory_abi } from "../contracts/erc1155PressFactory_abi";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { SEPOLIA_ADDRESSES } from "../lib/addresses";

type Props = {
    channelName: string,
    channelSymbol: string,
    initialOwner: string,
    logicInit: string,
    onSuccessCB?: Function
};

export function useCreate1155Press({channelName, channelSymbol, initialOwner, logicInit, onSuccessCB }: Props) {
    
    const channelNameInput = channelName ? channelName : ""
    const channelSymbolInput = channelSymbol ? channelSymbol : ""
    const initialOwnerInput = initialOwner ? initialOwner : ""
    const logicInitInput = logicInit ? logicInit : ""

    const validTxn = !channelNameInput || !initialOwnerInput || !logicInitInput ? false : true   

    const { config, error } = usePrepareContractWrite({
        address: SEPOLIA_ADDRESSES.ERC1155.ERC1155_PRESS_FACTORY_PROXY as `0x${string}`, 
        abi: erc1155PressFactory_abi,
        functionName: "createPress",
        args: [
            channelNameInput,
            channelSymbolInput,
            initialOwnerInput as `0x${string}`,
            SEPOLIA_ADDRESSES.ERC1155.EDITION_CONTRACT_LOGIC as `0x${string}`,
            logicInitInput as `0x${string}`        
        ],
        enabled: validTxn,
    })
    
    console.log("create collection prep config error", error)

    const { 
        write,
        data,
        error: writeError,
        isError,
        isLoading,
        isSuccess,
        status
    } = useContractWrite(config)      

    // Wait for data from createCollection call
    const { data: createCollectionData, isLoading: createCollectionLoading } = useWaitForTransaction({
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
        createCollectionData,
        createCollectionLoading
    }
}

export default useCreate1155Press