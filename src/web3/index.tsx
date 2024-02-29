import React, { useReducer, useCallback, createContext, ReactNode } from 'react';
//import { MetaMaskInpageProvider } from '@metamask/providers';
import { Web3Reducer } from './reducer';
import { ethers } from 'ethers';
import contractABI from './abis/VanarNFTHandler.json';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

interface Web3StateProps {
  account: string | null;
  networkId: number | null;
  contract: ethers.Contract | null;
  mintError: string | null;
}
interface Web3ContextValue extends Web3StateProps {
  connectWeb3: () => void;
  disconnectWeb3: () => void;
  setAccount: (account: string) => void;
  setNetworkId: (networkId: number) => void;
  setMintError: (mintError: string) => void;
  mintNFT: (account: string | null) => void;
  checkIfAlreadyMinted: (timestamp: number) => Promise<boolean>;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialState: Web3StateProps = {
  account: null,
  networkId: null,
  contract: null,
  mintError: null,
};

export const Web3Context = createContext<Web3ContextValue>({} as Web3ContextValue);

export const Web3Provider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const setAccount = useCallback(
    (account: string | null): void => {
      dispatch({
        type: 'SET_ACCOUNT',
        payload: account || '',
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
    (contract: ethers.Contract): void => {
      dispatch({
        type: 'SET_CONTRACT',
        payload: contract,
      });
    },
    [dispatch],
  );

  const setMintError = useCallback(
    (mintError: string): void => {
      dispatch({
        type: 'SET_MINT_ERROR',
        payload: mintError,
      });
    },
    [dispatch],
  );

  const checkIfAlreadyMinted = useCallback(
    async (timestamp: number) => {
      if (!state.account || !state.contract) {
        return false;
      }

      return await state.contract.getAlreadyMintedTimestampNFT(state.account, timestamp);
    },
    [state.account, state.contract],
  );

  const connectWeb3 = useCallback(async () => {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      await ethersProvider.send('eth_requestAccounts', []);
      // await window.ethereum.request({
      //   method: 'wallet_requestPermissions',
      //   params: [
      //     {
      //       eth_accounts: {},
      //     },
      //   ],
      // });

      if ((await ethersProvider.getNetwork()).chainId !== 78600) {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13308',
              rpcUrls: ['https://rpc-vanguard.vanarchain.com/'],
              chainName: 'Vanguard Testnet',
              nativeCurrency: {
                name: 'VG',
                symbol: 'VG',
                decimals: 18,
              },
              blockExplorerUrls: ['https://explorer-vanguard.vanarchain.com/'],
            },
          ],
        });
      }

      const userAddress = await ethersProvider.getSigner().getAddress();
      const contractAddress: string = import.meta.env.VITE_CONTRACT_ADDRESS || '';

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        ethersProvider.getSigner(),
      );

      setContract(contract);
      setAccount(userAddress);
      setNetworkId(78600);

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

  const disconnectWeb3 = useCallback(async () => {
    setAccount(null);
  }, [setAccount, setNetworkId]);

  const mintNFT = async (account: string | null, counter: number | undefined = 0) => {
    const urlTimestampId: string = `${import.meta.env.VITE_BACKEND_URL}/getTimestampId`;
    const urlSignature: string = `${import.meta.env.VITE_BACKEND_URL}/signature`;

    const axiosTimestamp = await axios.get(urlTimestampId);
    const timestampId = axiosTimestamp.data.timestampId;

    const axiosResponse = await axios.get(urlSignature + '?account=' + account);
    const data = axiosResponse.data;
    try {
      if (data.signature) {
        const signature = data.signature;
        const { contract } = state;
        setMintError('');
        await contract.mint(timestampId, signature);
      } else if (data.message) {
        toastr.error(data.message);
        setMintError(data.message);
      }
    } catch (e) {
      if (counter < 9) {
        setTimeout(() => {
          mintNFT(account, counter + 1);
        }, 500);
        return;
      }
      toastr.error('Unknown error');
      console.log(e);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        ...state,
        setAccount,
        setNetworkId,
        connectWeb3,
        mintNFT,
        setMintError,
        disconnectWeb3,
        checkIfAlreadyMinted,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
