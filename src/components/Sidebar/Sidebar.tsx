import { useContext, useRef, useEffect, useState } from 'react'; // Import useState
import { Web3Context } from '../../web3';

const SideImage = ({ nft }: SideImageProps) => {
  const { account, mintNFT } = useContext(Web3Context);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { name, video, experienceNeeded } = nft;
  const [nftVideo, setNftVideo] = useState<string>(video);

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

  return (
    <div className="w-full md:w-1/3 h-full flex flex-col justify-center md:justify-start items-center bg-black opacity-90 md:fixed md:top-[101px] md:right-0 p-8 gap-1">
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
        <p className="text-sm md:text-lg text-white">{experienceNeeded}XP</p>
        <button
          className="w-4/5 bg-[#A08CFF] text-black text-sm md:text-lg font-bold rounded-full py-1  md:py-4 text-center z-20"
          onClick={() => mintNFT(account)}
        >
          {account ? 'Claim Reward' : 'Connect your account'}
        </button>
      </div>
    </div>
  );
};

interface SideImageProps {
  nft: { video: string; name: string; experienceNeeded: number };
}

export default SideImage;