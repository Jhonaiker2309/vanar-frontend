import { useRef, useEffect, useState, useContext } from 'react';
import TimerAndTries from '../components/Timer-and-Tries/TimerAndTries';
import Mechanics from '../components/Mechanics/Mechanics';
import axios from 'axios';
import RewardsBreakdown from '../components/RewardsBreakdown/RewardsBreakdown';
import RewardModal from '../components/Modal/RewardModal';
import Reward from '../components/Reward/Reward';
import { Web3Context } from '../web3';
import Spinwheel from '../components/Spinwheel/Spinwheel';

interface PrizeProps {
  signature: string;
  _amount: number;
  _isNFT: boolean;
  _nftId: number;
  _tokenAddress: string;
  _transactionNumber: number;
  _userAddress: string;
  prizeWon: boolean;
  prizeClass: 'Platinum' | 'Gold' | 'Silver';
  prizePartner: string;
  video: string;
}

const SpinWheel = () => {
  const { account, connectWeb3 } = useContext(Web3Context);
  const [displayReward, setDisplayReward] = useState<boolean>(false);
  const [futureTime, setFutureTime] = useState<Date>(new Date());
  const targetDivRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLImageElement>(null);
  const spinnerRef2 = useRef<HTMLImageElement>(null);
  const [currentSpin, setCurrentSpin] = useState<number>(0);
  const [experience, setExperience] = useState<number>(0);
  const [todayTweetAdded, setTodayTweetAdded] = useState<boolean>(false)
  const [lastSpinTime, setLastSpinTime] = useState<number>(0);
  const [prize, setPrize] = useState<PrizeProps | null>(null);
  const [cardPrizes, setCardPrizes] = useState([]);
  const [rewardsOverForToday, setRewardsOverForToday] = useState(false);

  useEffect(() => {
    if (account) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/getUserData/${account}`)
        .then(response => {
          setExperience(response?.data?.experience);
          setCardPrizes(response?.data?.prizesDelivered);
          setCurrentSpin(response?.data?.amountOfSpinsOfToday);
          setTodayTweetAdded(response?.data?.todayTweetAdded);
          setFutureTime(new Date(response?.data?.nextRestart));
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [account]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const state = urlParams.get('state');
    if (account && username && state) {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/tweetAdded/${account}`);
    }
  }, [account]);

  const scrollToRewards = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSpinWheelLogic = () => {
    if (
      account &&
      (currentSpin < 4 || (currentSpin == 4 && todayTweetAdded)) &&
      (experience >= 40 || (experience >= 20 && currentSpin !== 4))
    ) {
      const currentTime = Date.now();
      if (currentTime - lastSpinTime >= 4000) {
        if (spinnerRef.current && spinnerRef2.current) {
          spinnerRef.current.classList.add('spin');
          spinnerRef2.current.classList.add('spin');
          setTimeout(() => {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/spinRoulette/${account}`).then(data => {
              setPrize(data.data.prize);
              setDisplayReward(true);
              if (data.data.message === 'You dont have more spin tries') {
                setRewardsOverForToday(true);
              }
              // Update currentSpin after spinning
              setCurrentSpin(prevSpin => prevSpin + 1);
            });
            //setDisplayReward(true);
            spinnerRef.current?.classList.remove('spin');
            spinnerRef2.current?.classList.remove('spin');
          }, 4000);
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
      <div className="w-screen lx:h-screen flex flex-col xl:flex-row items-center justify-between pt-56 lg:pt-40 xl:pt-10 px-4 lg:px-[50px] relative">
        <Mechanics spined={currentSpin} todayTweetAdded={todayTweetAdded}/>

        <div className="w-[300px] md:w-[500px] lg:w-[800px] xl:min-w-[450px] ">
          <Spinwheel
            handleSpinWheelLogic={handleSpinWheelLogic}
            spinnerRef={spinnerRef}
            spinnerRef2={spinnerRef2}
            currentSpin={currentSpin}
          />
        </div>

        <TimerAndTries futureTime={futureTime} currentSpin={currentSpin} />
        <div className="w-screen absolute flex justify-center bottom-5 left-0">
          <div
            className="hidden w-screen xl:flex flex-col items-center justify-center gap-4 cursor-pointer"
            onClick={scrollToRewards}
          >
            <img src="images/V2/icon-chevron-down.svg" alt="icon" />
            <p className="text-[#4a4a4a]">Reward Breakdown</p>
          </div>
        </div>
      </div>
      {/* Modal */}
      {displayReward && (
        <RewardModal show={displayReward} onClose={handleHideReward}>
          <Reward
            prize={prize}
            spin={currentSpin}
            handleHideReward={handleHideReward}
            spinAgain={handleSpinWheelLogic}
            experience={experience}
            rewardsOverForToday={rewardsOverForToday}
          />
        </RewardModal>
      )}

      {/* Second section: RewardsBreakdown and Footer */}
      <div
        className="w-screen h-screen flex items-start justify-center px-[50px] pt-8 lg:pt-0"
        ref={targetDivRef}
      >
        <RewardsBreakdown prizesInfo={cardPrizes} />
      </div>
    </>
  );
};

export default SpinWheel;
