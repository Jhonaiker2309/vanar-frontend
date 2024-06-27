import { useRef, useEffect, useState, useContext } from 'react';
import TimerAndTries from '../components/Timer-and-Tries/TimerAndTries';
import Mechanics from '../components/Mechanics/Mechanics';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import RewardsBreakdown from '../components/RewardsBreakdown/RewardsBreakdown';
import RewardModal from '../components/Modal/RewardModal';
import Reward from '../components/Reward/Reward';
import { Web3Context } from '../web3';

interface Prize {
  signature: string;
  _amount: number;
  _isNFT: boolean;
  _nftId: number;
  _tokenAddress: string;
  _transactionNumber: number;
  _userAddress: string;
}

const SpinWheel = () => {
  const { account, connectWeb3 } = useContext(Web3Context);
  const [displayReward, setDisplayReward] = useState<boolean>(false);
  const [futureTime, setFutureTime] = useState<Date>(new Date());
  const targetDivRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLImageElement>(null);
  const [lastSpinTime, setLastSpinTime] = useState(0);
  const [prize, setPrize] = useState<Prize | null>(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/roulette/${account}`)
      .then(response => {
        setFutureTime(response?.data?.futureTime);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const scrollToRewards = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSpinWheelLogic = () => {
    if (account) {
      const currentTime = Date.now();
      if (currentTime - lastSpinTime >= 10000) { // 10000 ms = 10 segs
        if (spinnerRef.current) {
          spinnerRef.current.classList.add('spin');
          setTimeout(() => {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/spinRoulette/${account}`).then(data => {
              setPrize(data.data.prize);
              setDisplayReward(true);
            })
            //setDisplayReward(true);
            spinnerRef.current?.classList.remove('spin'); // Optional chaining here

          }, 2000);
        }
        setLastSpinTime(currentTime);
      }
    } else {
      connectWeb3();
    }
  };  

  const handleHideReward = () => {
    setDisplayReward(false);
  };

  return (
    <>
      {/* First section: Mechanics and TimerAndTries */}
      <div className="w-screen h-screen flex items-center justify-between px-[50px] relative">
        <Mechanics />

        <div className="relative items-center justify-center flex">
          <img
            src="/images/V2/spinwheel-center.svg"
            alt="spinner"
            className="absolute -mt-[70px]"
            ref={spinnerRef}
          />
          <img
            src="/images/V2/icon-polygon.svg"
            alt="placeholder"
            className="absolute top-[140px]"
          />
          <button
            className="-mt-[75px] ml-[6px] absolute rounded-full spin-button w-[120px] aspect-square"
            onClick={handleSpinWheelLogic}
          >
            <p className="text-white text-[26px] font-bold uppercase light-text">Spin Now</p>
          </button>
          <img src="/images/V2/placeholder-spinwheel.svg" alt="placeholder" className="" />
        </div>

        <TimerAndTries futureTime={futureTime} />
        <div className="w-screen absolute flex justify-center bottom-5 left-0">
          <div
            className="w-screen flex flex-col items-center justify-center gap-4 cursor-pointer"
            onClick={scrollToRewards}
          >
            <img src="images/V2/icon-chevron-down.svg" alt="icon" />
            <p className="text-[#4a4a4a]">Reward Breakdown</p>
          </div>
        </div>
      </div>
      {/* Modal */}
      {displayReward && (
        <RewardModal show={displayReward} /*onClose={handleHideReward}*/>
          <Reward type={'gold'} video="vanar" spin={5} prize={prize} handleHideReward={handleHideReward}/>
        </RewardModal>
      )}

      {/* Second section: RewardsBreakdown and Footer */}
      <div
        className="w-screen h-screen flex items-center justify-center px-[50px] relative"
        ref={targetDivRef}
      >
        <RewardsBreakdown />
        <Footer />
      </div>
    </>
  );
};

export default SpinWheel;
