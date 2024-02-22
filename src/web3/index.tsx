import React, { useReducer, useCallback, createContext, ReactNode } from 'react';
//import { MetaMaskInpageProvider } from '@metamask/providers';
import { Web3Reducer } from './reducer';
import { providers, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import contractABI from "./abis/VanarNFTHandler.json"
import axios from "axios"

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Web3StateProps {
  account: string | null;
  networkId: number | null;
  contract: any | null;
}
interface Web3ContextValue extends Web3StateProps {
  connectWeb3: () => void;
  setAccount: (account: string) => void;
  setNetworkId: (networkId: number) => void;
  mintNFT: (account: string | null) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialState: Web3StateProps = {
  account: null,
  networkId: null,
  contract: null
};

export const Web3Context = createContext<Web3ContextValue>({} as Web3ContextValue);

export const Web3Provider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const setAccount = useCallback(
    (account: string): void => {
      dispatch({
        type: 'SET_ACCOUNT',
        payload: account,
      });
    },
    [dispatch],
  );

  const setNetworkId = useCallback(
    (networkId: number): void => {
      dispatch({
        type: 'SET_NETWORK_ID',
        payload: networkId,
      });
    },
    [dispatch],
  );

  const setContract = useCallback(
    (contract: any): void => {
      dispatch({
        type: 'SET_CONTRACT',
        payload: contract,
      });
    },
    [dispatch],
  );

  const connectWeb3 = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        theme: 'light',
      });

      const provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      const network = await ethersProvider.getNetwork();
      const networkId = network.chainId;
      const contractAddress: string = "0x113e98baA82C50647c5cd9F760984BCd61E762A1" /*process.env.REACT_APP_CONTRACT_ADDRESS*/
      
      const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider.getSigner());

      setContract(contract)
      setAccount(userAddress);
      setNetworkId(networkId);

      window.ethereum?.on('chainChanged', () => {
        document.location.reload();
      });

      window.ethereum?.on('accountsChanged', () => {
        document.location.reload();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }, [setAccount, setNetworkId]);

  const mintNFT = async (account: string | null) => {
    
    const urlTimestampId: string = /*process.env.REACT_APP_BACKEND_URL*/ "https://vanar-backend.vercel.app" + "/getTimestampId"
    const urlSignature: string = /*process.env.REACT_APP_BACKEND_URL*/ "https://vanar-backend.vercel.app" + "/signature"

    try {
      const axiosTimestamp = await axios.get(urlTimestampId)
      const timestampId = axiosTimestamp.data.timestampId
      
      console.log(account, timestampId)
      const axiosSignature = await axios.post(urlSignature, {account, timestampId})
      const signature = axiosSignature.data.signature
      
      const { contract } = state 

      console.log(timestampId, signature)

      await contract.mint(timestampId, signature)

    } catch(e){
      console.log(e)
    }
  }

  return (
    <Web3Context.Provider value={{ ...state, setAccount, setNetworkId, connectWeb3, mintNFT }}>
      {children}
    </Web3Context.Provider>
  );
};
