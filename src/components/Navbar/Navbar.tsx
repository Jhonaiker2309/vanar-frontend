import { useContext } from 'react';
import { Web3Context } from '../../web3';

const Navbar = () => {
  const { account, connectWeb3 } = useContext(Web3Context);
  return (
    <header className="w-screen h-[101px] bg-[#0b0b0b] opacity-95 absolute top-0 left-0 border-b-2 border-b-[#4b4b4b] flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-1">
        <img src="images/vanar-logo.png" alt="Logo" />
        <div className="flex items-start gap-4">
          <button className="bg-[#a08cff] text-black font-bold py-1 px-2 rounded-lg ml-2">
            VANGUARD
          </button>
          <div className="w-0.5 h-8 bg-[#4b4b4b]"></div>
          <p className="text-white font-semibold">TESTNET</p>
        </div>
      </div>
      {!account && (
        <button
          className="bg-white text-black font-semibold py-2 px-6 rounded-full opacity-100"
          onClick={() => connectWeb3()}
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Navbar;
