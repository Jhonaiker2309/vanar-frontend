import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Web3Context } from '../../web3';
import axios from "axios"

const Navbar = ({ username }: { username?: string }) => {
  const { account, connectWeb3, disconnectWeb3 } = useContext(Web3Context);

  const getTwitterEndpoint = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_TWITTER_ENDPOINT);
        console.log('Respuesta de la llamada GET:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al hacer la llamada GET:', error);
        throw error;
    }
  }

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
        {/* <NavLink
          to="/claim"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Claim Reward</h1>
        </NavLink> */}
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Leaderboard</h1>
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        {/* <div className="h-12 flex justify-center items-center text-xs md:text-[18px] min-w-fit w-fit bg-[#A08CFF] bg-opacity-20  text-white ring-1 ring-[#A08CFF] font-semibold py-2 md:py-3 px-2 md:px-6 rounded-full gap-2 button-light shadow-[#A08CFF]">
          <Icon name="thunder" size={24} color="white" />
          <p className="text-nowrap">10VP</p>{' '}
        </div>
        <div className="h-12 flex justify-center items-center text-xs md:text-[18px] min-w-fit w-fit bg-[#A08CFF] bg-opacity-20  text-white ring-1 ring-[#A08CFF] font-semibold py-2 md:py-3 px-2 md:px-6 rounded-full gap-2 button-light shadow-[#A08CFF]">
          <p className="text-nowrap">100 VG Staked</p>{' '}
        </div> */}
        {username && !!account && <div className="text-white mx-10">@{username}</div>}
        <button
          className="h-12 text-xs md:text-[18px] min-w-fit w-fit bg-white text-black font-semibold py-4 md:py-3 px-2 md:px-6 rounded-full opacity-100 "
          onClick={() => (!account ? connectWeb3() : disconnectWeb3())}
        >
          {!account ? 'Connect Wallet' : 'Disconnect'}
        </button>
        <a className="a-button">
        <button
          className=" text-xs md:text-[18px] min-w-fit w-fit bg-white text-black font-semibold py-2 md:py-3 px-2 md:px-6 rounded-full opacity-100 "
          onClick={() => getTwitterEndpoint()}
        >
          Twitter
        </button>
      </a>
      </div>
    </header>
  );
};

export default Navbar;
