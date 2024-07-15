import { useRef } from 'react';

interface RewardCardProps {
  name: string | undefined;
  claimed: number | undefined;
  total: number | undefined;
  video: string | undefined;
  type: string | undefined;
}

const RewardCard = ({ name, claimed, total, video, type }: RewardCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine the border gradient class based on type
  let borderClass = '';
  if (type === 'gold') {
    borderClass = 'border-gradient-gold';
  } else if (type === 'platinum') {
    borderClass = 'border-gradient-platinum';
  } else {
    borderClass = 'border-gradient-silver';
  }

  return (
    <div
      className={`w-full md:w-[400px] p-2 rounded-2xl ${borderClass} bg-black  md:bg-transparent`}
    >
      <div className="w-full h-[260px] rounded-[14px] overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted={true}
          autoPlay
          className="w-full md:w-[384px] rounded-[14px] relative z-0 -mt-16"
        >
          <source src={`videos/video-${video}.mp4`} type="video/mp4" />
        </video>
      </div>
      <h1 className="text-white font-semibold text-[32px] px-4">{name}</h1>
      <div className="flex justify-between items-center px-4 pb-4">
        <div className="flex items-center gap-4">
          <p className="text-[#ADADAD]">Remaining Rewards</p>
          <p className="text-white font-semibold">
            {claimed}/{total}
          </p>
        </div>
        <img src="/images/V2/icon-increase.svg" alt="Icon increase" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default RewardCard;
