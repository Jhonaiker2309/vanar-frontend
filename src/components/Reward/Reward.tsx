import { useEffect, useRef, useState } from 'react';
// import { Web3Context } from '../../web3';
// import { utils } from 'ethers';
// import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

interface Prize {
  prizeWon: boolean;
  name?: string;
  prizeClass?: 'Platinum' | 'Gold' | 'Silver';
  tokenAddress?: string;
  nftAddress?: string;
  tokenAmount?: number;
  tokenDecimals?: number;
  prizeType?: string;
  prizePartner?: string;
  transactionRandomNumber?: number;
  video: string;
  signature?: string;
}

interface RewardProps {
  spin: number;
  prize: Prize | null;
  handleHideReward: () => void;
  spinAgain: () => void;
  experience: number;
}

const Reward = ({ spin, prize, handleHideReward, spinAgain, experience }: RewardProps) => {
  // const { rouletteContract, account, convertToNumberString } = useContext(Web3Context);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(prize);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>('');
  const dontHaveExperience = experience < 20;

  useEffect(() => {
    setCurrentPrize(prize);
    setCurrentVideo(prize?.video);
  }, [prize]);

  const tryAgain = () => {
    setCurrentPrize(null);
    handleHideReward();
    spinAgain();
    setCurrentPrize(prize);
  };

  const closeModal = () => {
    handleHideReward();
    setCurrentPrize(null);
  };

  // const claimPrize = async (prize: Prize | null) => {
  //   if (!(rouletteContract && account && prize)) return;
  //   try {
  //     let tokenAmount;
  //     if ((prize.prizeType == 'erc20' || prize.prizeType == 'mix') && prize.tokenAmount) {
  //       tokenAmount = utils.parseUnits(
  //         convertToNumberString(prize.tokenAmount),
  //         prize.tokenDecimals,
  //       );
  //     }
  //     switch (prize.prizeType) {
  //       case 'erc721':
  //         await rouletteContract.mintERC721(
  //           account,
  //           prize.nftAddress,
  //           prize.transactionRandomNumber,
  //           prize.signature,
  //         );
  //         break;

  //       case 'erc20':
  //         await rouletteContract.transferERC20(
  //           account,
  //           prize.tokenAddress,
  //           tokenAmount,
  //           prize.transactionRandomNumber,
  //           prize.signature,
  //         );
  //         break;

  //       case 'mix':
  //         await rouletteContract.mixTransaction(
  //           account,
  //           prize.tokenAddress,
  //           prize.nftAddress,
  //           tokenAmount,
  //           prize.transactionRandomNumber,
  //           prize.signature,
  //         );
  //         break;

  //       default:
  //         console.log('Unknown prize type');
  //         break;
  //     }
  //     handleHideReward();
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (e: any) {
  //     const errorMessage = e.reason || e.message || 'Unknown error occurred';
  //     toastr.error(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
  //     handleHideReward();
  //   }
  // };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10 relative md:gap-20">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-white text-3xl md:text-[46px] font-bold uppercase light-text">
          {dontHaveExperience
            ? 'Thanks for playing'
            : currentPrize?.prizeWon
            ? 'Congratulations'
            : 'Try Again'}
        </h1>
        <div className={`px-10 text-center ${dontHaveExperience && 'pt-8'}`}>
          <p className="text-white text-lg">
            {dontHaveExperience
              ? 'Your VP points are over, thanks for taking part in our even, we hope you enjoy your rewards.'
              : !currentPrize?.prizeWon
              ? 'Sorry! You haven’t won any reward. Please try another spin to win the Rewards'
              : currentPrize?.prizeClass === 'Platinum'
              ? 'You have won Platinum Reward.'
              : currentPrize?.prizeClass === 'Silver'
              ? 'You have won Silver Reward.'
              : 'You have won Gold Reward.'}
          </p>
          {dontHaveExperience ? (
            <p className="text-white text-sm md:text-lg">
              Don't forget to claim your rewards and follow us for future events
            </p>
          ) : currentPrize?.prizeClass === 'Silver' ? (
            <p className="text-white text-sm md:text-lg">
              Try more spins to get High tier rewards (Gold, Platinum).
            </p>
          ) : (
            <p className="text-white text-sm md:text-lg">
              Try more spins to get High tier rewards (Platinum).
            </p>
          )}
        </div>
      </div>

      {(!currentPrize?.prizeWon || dontHaveExperience) && (
        <img
          className="pt-24 absolute z-0 grayscale"
          src={`images/V2/image-spinwheel.svg`}
          alt="icon"
        />
      )}
      {currentPrize?.prizeClass && (
        <div
          className={`border-gradient-${currentPrize?.prizeClass?.toLowerCase()} w-[288px] md:w-[320px] md:overflow-hidden md:-mt-24`}
        >
          <video ref={videoRef} loop muted={true} autoPlay className="rounded-[14px]">
            <source src={currentVideo} type="video/mp4" />
          </video>
        </div>
      )}
      {!dontHaveExperience && (
        <div className="w-full flex flex-col items-center justify-center gap-4 relative pb-12">
          <div className="flex flex-col md:flex-row gap-2  md:gap-8">
            <div className="w-[174px] h-[50px] rounded-full border-gradient flex items-center justify-center">
              <button
                className="w-full h-[90%] bg-[#03D9AF] rounded-full font-bold text-[18px] flex items-center justify-center m-1 hover:bg-[#03d9af1a] hover:text-white transition-all duration-300"
                onClick={tryAgain}
              >
                Spin Again
              </button>
            </div>
            <div className="w-[174px] h-[50px] rounded-full border-gradient-white flex items-center justify-center">
              <button
                className="w-full h-[90%] bg-white rounded-full font-bold text-[18px] flex items-center justify-center m-1 hover:bg-[#03d9af1a] hover:text-white transition-all duration-300"
                onClick={() => closeModal()}
              >
                Go back
              </button>
            </div>
          </div>
          {currentPrize?.prizeWon && (
            <>
              <p className="text-white text-xs">Your rewards will soon be sent to your wallet.</p>
            </>
            // <div className="w-[174px] h-[50px] rounded-full border-gradient-white flex items-center justify-center">
            //   <button
            //     className="w-full h-[90%] bg-white rounded-full font-bold text-[18px] flex items-center justify-center m-1 hover:bg-[#03d9af1a] hover:text-white transition-all duration-300"
            //     onClick={() => claimPrize(currentPrize)}
            //   >
            //     Mint now
            //   </button>
            // </div>
          )}
          {spin >= 5 && (
            <p className="w-5/6 md:w-1/3 bottom-0 text-center text-xs text-white absolute">
              Get 5th Spin today by sharing your reward on twitter
            </p>
          )}
        </div>
      )}
      {dontHaveExperience && (
        <div className="w-[174px] h-[50px] rounded-full border-gradient-white flex items-center justify-center">
          <button
            className="w-full h-[90%] bg-white rounded-full font-bold text-[18px] flex items-center justify-center m-1 hover:bg-[#03d9af1a] hover:text-white transition-all duration-300"
            onClick={() => closeModal()}
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default Reward;
