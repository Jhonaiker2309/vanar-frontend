import { useRef } from 'react';

interface RewardCardProps {
  name: string;
  claimed: number;
  total: number;
  video: string;
  type: number;
}

const RewardCard = ({ name, claimed = 0, total = 0, video, type }: RewardCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine the border gradient class based on type
  let borderClass = '';
  if (type === 0) {
    borderClass = 'border-gradient-gold';
  } else if (type === 1) {
    borderClass = 'border-gradient-platinum';
  } else {
    borderClass = 'border-gradient-silver';
  }

  return (
    <div className={`w-[400px] p-2 rounded-2xl ${borderClass}`}>
      <div className="w-full h-[260px] rounded-[14px] overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted={true}
          autoPlay
          className="w-[384px] rounded-[14px] relative z-0 -mt-16"
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
