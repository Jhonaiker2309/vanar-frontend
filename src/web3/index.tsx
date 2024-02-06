import React, { useReducer, useEffect, useCallback, createContext, ReactNode } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Web3Reducer } from './reducer';
import { providers, ethers } from 'ethers';
import Web3Modal from 'web3modal';

// DETALLES, LEER Y BORRAR
// 1. Al ser un archivo que regresa JSX, typescrip solo no puede hacer nada y por eso te explota en el return. Cambie la extension a tsx
// 2. Ethereum fue removido de windows, por lo tanto hay que setearlo de nuevo, esto es mas web3 duro asi que JA es quien puede darte el full visto bueno, porque la declaracion deberia ir en un .env
// 3. En el context provider deberia ir state, porque para eso lo estas definiendo en el "value", el estado de la Web3
// 4. Hay un warning con setNetworkID y account, los coloque dentro de un callback para evitar que se re-renderizen infinitamente.

// Declare window.ethereum to avoid TypeScript errors
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

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

  useEffect(() => {
    connectWeb3();
  }, [connectWeb3]);

  return (
    <Web3Context.Provider value={{ ...state, setAccount, setNetworkId }}>
      {children}
    </Web3Context.Provider>
  );
};
