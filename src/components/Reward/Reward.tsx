import { useRef, useContext } from 'react';
import { Web3Context } from '../../web3';

interface Prize {
  signature: string;
  _amount: number;
  _isNFT: boolean;
  _nftId: number;
  _tokenAddress: string;
  _transactionNumber: number;
  _userAddress: string;
}

interface RewardProps {
  type: string;
  spin: number;
  video?: string;
  prize: Prize | null;
  handleHideReward: () => void;
}

const Reward = ({ type, video, spin, prize, handleHideReward }: RewardProps) => {
  const { rouletteContract } = useContext(Web3Context);
  const videoRef = useRef<HTMLVideoElement>(null);

  const claimReward = (): void => {
    if (prize && rouletteContract) {
      const { _userAddress, _transactionNumber, _tokenAddress, _nftId, signature } = prize;
      rouletteContract
        .transferERC721(_userAddress, _tokenAddress, _nftId, _transactionNumber, signature)
        .then(() => {
          console.log(prize);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10 relative md:gap-20">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-white text-3xl md:text-[46px] font-bold uppercase light-text">
          {type === 'fail' ? 'Try Again' : type === 'alert' ? 'Alert' : 'Congratulations'}
        </h1>
        <div className="px-10 text-center">
          <p className="text-white text-lg">
            {type === 'fail'
              ? 'Please Try another Spin to Win the Rewards, Respectively: '
              : type === 'alert'
              ? 'Sorry! You haven’t won any reward. Next Daily Spin in:'
              : type === 'bronze'
              ? 'You have won Bronze Reward.'
              : type === 'silver'
              ? 'You have won Silver Reward.'
              : 'You have won Gold Reward.'}
          </p>
          {type === 'fail' ? (
            <p className="text-white text-sm md:text-lg font-bold">Silver, Gold, Platinum</p>
          ) : type === 'alert' ? (
            <p className="text-white text-sm md:text-lg">Silver, Gold, Platinum</p>
          ) : type === 'silver' ? (
            <p className="text-white text-sm md:text-lg">
              Try more spins to get High tier rewards (Gold, Platinum).
            </p>
          ) : (
            type === 'gold' && (
              <p className="text-white text-sm md:text-lg">
                Try more spins to get High tier rewards (Platinum).
              </p>
            )
          )}
        </div>
      </div>
      {type === 'fail' && (
        <img
          className="pt-24 absolute z-0 grayscale"
          src={`images/V2/image-spinwheel.svg`}
          alt="icon"
        />
      )}
      {type === 'platinum' && (
        <div className="border-gradient-bronze w-[288px] md:w-[320px] md:overflow-hidden md:-mt-24">
          <video ref={videoRef} loop muted={true} autoPlay className=" rounded-[14px]">
            <source src={`videos/video-${video}.mp4`} type="video/mp4" />
          </video>
        </div>
      )}
      {type === 'silver' && (
        <div className="border-gradient-silver w-[288px] md:w-[320px] md:overflow-hidden md:-mt-24">
          <video ref={videoRef} loop muted={true} autoPlay className=" rounded-[14px]">
            <source src={`videos/video-${video}.mp4`} type="video/mp4" />
          </video>
        </div>
      )}
      {type === 'gold' && (
        <div className="border-gradient-gold w-[288px] md:w-[320px] md:overflow-hidden md:-mt-24">
          <video ref={videoRef} loop muted={true} autoPlay className=" rounded-[14px]">
            <source src={`videos/video-${video}.mp4`} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="w-full flex flex-col items-center justify-center gap-4 relative pb-12">
        <div className="flex flex-col md:flex-row gap-2  md:gap-8">
          <div className="w-[174px] h-[50px] rounded-full border-gradient flex items-center justify-center">
            <button
              className="w-full h-[90%] bg-[#03D9AF] rounded-full font-bold text-[18px] flex items-center justify-center m-1 hover:bg-[#03d9af1a] hover:text-white transition-all duration-300"
              onClick={() => claimReward()}
            >
              Claim Reward
            </button>
          </div>
          <div className="w-[174px] h-[50px] rounded-full border-gradient flex items-center justify-center">
            <button
              className="w-full h-[90%] bg-[#03D9AF] rounded-full font-bold text-[18px] flex items-center justify-center m-1 hover:bg-[#03d9af1a] hover:text-white transition-all duration-300"
              onClick={() => handleHideReward()}
            >
              Spin Again
            </button>
          </div>
        </div>
        {spin >= 5 && (
          <p className="w-5/6 md:w-1/3 bottom-0 text-center text-xs text-white absolute">
            Get 5th Spin today by sharing your reward on twitter
          </p>
        )}
      </div>
    </div>
  );
};

export default Reward;
