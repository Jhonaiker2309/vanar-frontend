import {useContext} from 'react'
import {Web3Context} from "../../web3"

const Navbar = () => {
  const { account, connectWeb3 } = useContext(Web3Context)
  return (
    <header className="w-screen h-[101px] bg-[#1c1a23] opacity-80 fixed top-0 flex items-center justify-between px-8 z-50">
      <div className="flex items-center">
        <img src="images/vanar_logo.png" alt="Logo" />
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2">
          Vanguard
        </button>
        <p className="text-white ml-2 border-l border-white p-2">TESTNET</p>
      </div>
      {!account && <button
        className="bg-white text-black font-semibold py-2 px-6 rounded-full opacity-100"
        onClick={() => connectWeb3()}
      >
        Connect Wallet
      </button>}
    </header>
  );
};

export default Navbar;
