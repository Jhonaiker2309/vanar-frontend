import { useContext, useRef, useEffect, useState } from 'react';
import { Web3Context } from '../../web3';

const SideImage = ({ nft, currentWeek }: SideImageProps) => {
  const { account, mintNFT, connectWeb3, checkIfAlreadyMinted } = useContext(Web3Context);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { name, video } = nft;
  const [nftVideo, setNftVideo] = useState<string>(video);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  useEffect(() => {
    setNftVideo(video);
  }, [video]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play();
    }
  }, [nftVideo]);

  useEffect(() => {
    const checkClaimed = async () => {
      setIsClaimed(await checkIfAlreadyMinted(currentWeek));
    };
    checkClaimed();
  }, [account, checkIfAlreadyMinted, currentWeek]);

  return (
    <div className="w-full md:w-1/3 h-full flex flex-col justify-center md:justify-start items-center bg-black opacity-90 md:fixed md:top-[101px] md:right-0 mb-24 md:mb-8 p-0 md:p-8 gap-1 overflow-scroll">
      <div className="w-full flex flex-col justify-center items-center md:mb-24">
        <video
          ref={videoRef}
          loop
          muted={true}
          className="w-4/5 rounded-3xl border-[1px] border-[#f6f6f6] relative z-0"
        >
          <source src={nftVideo} type="video/mp4" />
        </video>
        <div className="w-4/5 -mt-24 md:-mt-36 flex flex-col items-center z-20">
          <p className="text-lg md:text-2xl text-white">{name}</p>
          <button
            className="w-4/5 bg-[#A08CFF] text-black text-sm md:text-lg font-bold rounded-full py-1  md:py-4 text-center z-20"
            onClick={() => {
              account && !isClaimed ? mintNFT(account) : connectWeb3();
            }}
          >
            {!isClaimed && (account ? 'Claim Reward' : 'Connect Wallet')}
            {account && isClaimed && 'Reward Claimed'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface SideImageProps {
  nft: { video: string; name: string; experienceNeeded: number };
  currentWeek: number;
}

export default SideImage;
