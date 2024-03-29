import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Web3Context } from '../../web3';
import axios from 'axios';

const Navbar = ({
  username,
  twitterUsername,
}: {
  username?: string;
  twitterUsername?: string | null;
}) => {
  const { account, connectWeb3, disconnectWeb3 } = useContext(Web3Context);

  // const getTwitterEndpoint = async () => {
  //   const response = await axios.get(import.meta.env.VITE_TWITTER_ENDPOINT);
  //   const url = response.data.auth_url;
  //   window.location.href = url;
  // };

  useEffect(() => {
    if (localStorage.getItem('logged') === 'yes') {
      connectWeb3();
    }
  }, []);

  useEffect(() => {
    const executeTwitterActions = async () => {
      if (twitterUsername && account) {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/addTweetsToAccount?wallet=${encodeURIComponent(
            account,
          )}&twitterUsername=${encodeURIComponent(twitterUsername)}`,
        );
      }
    };
    executeTwitterActions();
  }, [account]);

  return (
    <header className="w-screen bg-[#0a0810] fixed top-0 left-0 flex flex-col md:flex-row items-center justify-between z-50">
      <div className="w-screen flex md:h-[101px] items-center justify-between pt-8 pb-1 px-8 md:px-14 md:py-0 gap-12">
        <div className="flex items-center gap-1">
          <img src="images/vanar-logo-full.svg" alt="Logo" className="w-4/5" />
        </div>
        <div className="hidden md:flex justify-between items-center gap-16 text-2xl">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
          >
            <h1>Campaign</h1>
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
          >
            <h1>Leaderboard</h1>
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          {username && !!account && <div className="text-white mx-10">@{username}</div>}
          <button
            className=" md:h-12 text-xs md:text-[18px] min-w-fit w-fit bg-white text-black font-semibold py-1 md:py-3 px-2 md:px-6 text-nowrap rounded-full opacity-100 "
            onClick={() => (!account ? connectWeb3() : disconnectWeb3())}
          >
            {!account ? 'Connect Wallet' : 'Disconnect'}
          </button>
        </div>
      </div>
      <div className="w-full flex md:hidden items-center justify-evenly gap-4 text-lg">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Campaign</h1>
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? 'text-[#A08CFF] font-bold' : 'text-[#39383a]')}
        >
          <h1>Leaderboard</h1>
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
