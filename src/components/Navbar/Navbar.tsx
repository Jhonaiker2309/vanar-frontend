import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Web3Context } from '../../web3';

const Navbar = ({ username }: { username?: string }) => {
  const { account, connectWeb3, disconnectWeb3 } = useContext(Web3Context);
  useEffect(() => {
    if (localStorage.getItem('logged') === 'yes') {
      connectWeb3();
    }
  }, []);
  return (
    <header className="w-screen h-[101px] bg-[#0a0810] fixed top-0 left-0 flex items-center justify-between px-8 md:px-14 gap-12 z-50">
      <div className="flex items-center gap-1">
        <img src="images/vanar-logo-full.svg" alt="Logo" className="w-4/5" />
      </div>
      <div className="flex justify-between items-center gap-16 text-2xl">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Campaign</h1>
        </NavLink>
        <NavLink
          to="/claim"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Claim Reward</h1>
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Leaderboard</h1>
        </NavLink>
      </div>
      <div className=" flex items-center">
        {username && !!account && <div className="text-white mx-10">@{username}</div>}
        <button
          className=" text-xs md:text-[18px] min-w-fit w-fit bg-white text-black font-semibold py-2 md:py-3 px-2 md:px-6 rounded-full opacity-100 "
          onClick={() => (!account ? connectWeb3() : disconnectWeb3())}
        >
          {!account ? 'Connect Wallet' : 'Disconnect'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
