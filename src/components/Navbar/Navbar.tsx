import { useContext } from 'react';
import { Web3Context } from '../../web3';

const Navbar = () => {
  const { account, connectWeb3 } = useContext(Web3Context);
  return (
    <header className="w-screen h-[101px] bg-black opacity-90 fixed top-0 left-0 flex items-center justify-between px-14 z-50">
      <div className="hidden md:flex items-center gap-1">
        <img src="images/vanar-logo-full.svg" alt="Logo" />
      </div>
      <div className="flex md:hidden items-center gap-1">
        {/* We need this logo to be provided  */}
        <img src="images/vanar-logo.svg" alt="Logo" />
      </div>
      {!account && (
        <button
          className="text-xs md:text-[18px] w-fit bg-white text-black font-semibold py-3 px-2 md:px-6 rounded-full opacity-100 "
          onClick={() => connectWeb3()}
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Navbar;
