import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../web3';
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import axios from 'axios';
import LateralModal from '../Modal/LateralModal';
import { FAQ } from '../FAQ/FAQV2';

const Navbar = () => {
  const { account, connectWeb3, disconnectWeb3 } = useContext(Web3Context);
  const [points, setPoints] = useState<number>(0);
  const [username, setUserName] = useState<string>('');
  const [avatarURL, setAvatarURL] = useState<string>('');
  const [shouldBlur, setShouldBlur] = useState<boolean>(false);
  const [shouldChangeColor, setShouldChangeColor] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('logged') === 'yes') {
      connectWeb3();
    }
  }, [connectWeb3]);

  useEffect(() => {
    if (account) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/getUsername/${account}`)
        .then(response => {
          const fetchedUsername = response?.data?.username;
          if (fetchedUsername) {
            setUserName(fetchedUsername);
          }
        })
        .catch(error => {
          const message = `Error fetching username.`;
          console.error(message, error);
        });
      setAvatarURL(generateAvatarURL(account));
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/roulette/${account}`)
        .then(response => {
          setPoints(response?.data?.todayExperience);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      setPoints(0);
    }
  }, []);

  const handleChangeColor: React.MouseEventHandler<HTMLDivElement> = () => {
    setShouldChangeColor(!shouldChangeColor);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <header className="w-screen fixed top-0 left-0 flex items-center justify-between z-50">
      <div className="w-screen flex h-[54px] p-[50px] items-center justify-between gap-12">
        <div className="flex items-center gap-1">
          <img src="images/V2/logo-velocity.svg" alt="Logo" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-12 flex items-center justify-center text-[18px] min-w-[107px] bg-[#03D9AF3D] rounded-full gap-2 border-2 border-white box-light light">
            <img src="images/V2/icon-thunder.svg" alt="Logo" />
            <p className="text-white">{points}VP</p>
          </div>
          {account ? (
            <button
              className="h-[50px] px-2 flex relative justify-between items-center w-[174px] bg-[#03D9AF33] rounded-full"
              onClick={disconnectWeb3}
              onMouseEnter={() => setShouldBlur(true)}
              onMouseLeave={() => setShouldBlur(false)}
            >
              <div
                className={`flex items-center justify-center text-sm text-nowrap gap-2 ${
                  shouldBlur && 'blur-sm'
                }`}
              >
                <img src={avatarURL} alt="Logo" className="rounded-full w-10" />
                <div className="w-full flex flex-col items-start justify-center">
                  <p className="text-white capitalize">{username}</p>
                  <p className="text-[#03D9AF]">{formatWallet(account)}</p>
                </div>
              </div>
              {shouldBlur && (
                <div className="w-full h-full flex items-center justify-center absolute gap-2">
                  <img src="images/V2/icon-disconnect.svg" alt="Logo" />
                  <p className="text-white">Disconnect</p>
                </div>
              )}
            </button>
          ) : (
            <button
              className=" md:h-12 text-xs md:text-[18px] w-[174px] bg-white text-black font-semibold py-1 md:py-3 px-2 md:px-6 text-nowrap rounded-full opacity-100 "
              onClick={connectWeb3}
            >
              {'Connect Wallet'}
            </button>
          )}

          <div
            onMouseEnter={handleChangeColor}
            onMouseLeave={handleChangeColor}
            onClick={handleOpenModal}
          >
            <img
              className="cursor-pointer"
              src={shouldChangeColor ? 'images/V2/icon-info-green.svg' : 'images/V2/icon-info.svg'}
              alt="Logo"
            />
          </div>
        </div>
      </div>
      <LateralModal show={openModal} onClose={handleCloseModal}>
        <FAQ />
      </LateralModal>
    </header>
  );
};

export default Navbar;

const formatWallet = (wallet: string) => {
  if (wallet.length < 7) {
    return wallet;
  }
  const formattedWallet = `${wallet.slice(0, 5)}...${wallet.slice(-4)}`;
  return formattedWallet;
};
