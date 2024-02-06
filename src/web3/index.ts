import React, { useReducer, useEffect, useCallback, createContext, ReactNode } from "react";
import { Web3Reducer } from "./reducer";
import { providers, ethers } from "ethers";
import Web3Modal from "web3modal";

interface Web3StateProps {
  account: string | null;
  networkId: number | null;
}
interface Web3ContextValue extends Web3StateProps {
  setAccount: (account: string) => void;
  setNetworkId: (networkId: number) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialState: Web3StateProps = {
  account: null,
  networkId: null,
};

export const Web3Context = createContext<Web3ContextValue >({} as Web3ContextValue);


export const Web3Provider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const setAccount = (account: string):void => {
    dispatch({
      type: "SET_ACCOUNT",
      payload: account,
    });
  };

  const setNetworkId = (networkId: number):void => {
    dispatch({
      type: "SET_NETWORK_ID",
      payload: networkId,
    });
  };

  const connectWeb3 = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        theme: "light",
      });

      const provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      const network = await ethersProvider.getNetwork();
      const networkId = network.chainId;

      setAccount(userAddress);
      setNetworkId(networkId);

      window.ethereum.on("chainChanged", () => {
        document.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        document.location.reload();
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }, [setAccount, setNetworkId]);

  useEffect(() => {
    connectWeb3();
  }, [connectWeb3]);

  return (
    <Web3Context.Provider value={{value, setAccount, setNetworkId }}>
      {children}
    </Web3Context.Provider> 
  );
};
