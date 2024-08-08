import { useState, useEffect } from 'react';
import RewardCard from '../RewardCard/RewardCard';

interface Reward {
  name: string;
  claimed?: number;
  total?: number;
  video: string;
}

interface PrizeInfo {
  deliveredCount: number;
  total: number;
  name: string;
  video: string;
  prizeClass: string;
}

interface RewardsBreakdownProps {
  prizesInfo: PrizeInfo[];
}

const RewardsBreakdown = ({ prizesInfo }: RewardsBreakdownProps) => {
  const [currentTier, setCurrentTier] = useState('gold');
  const [tierRewards, setTierRewards] = useState<Reward[]>([]);

  // Map of tier names to their respective colors
  const tierColors: { [key: string]: string } = {
    gold: 'text-[#FFD700]',
    platinum: 'text-[#FF9F30]',
    silver: 'text-[#C0C0C0]',
  };

  useEffect(() => {
    const rewards = prizesInfo
      .filter(prize => prize.prizeClass.toLowerCase() === currentTier)
      .map(prize => ({
        name: prize.name,
        claimed: prize.deliveredCount,
        total: prize.total,
        video: prize.video,
      }));

    setTierRewards(rewards);
  }, [currentTier, prizesInfo]);

  return (
    <div
      className={`flex flex-col items-center justify-start gap-16 ${
        (currentTier === 'gold' || currentTier === 'silver') && 'pb-36'
      }`}
    >
      <div className="flex items-center justify-center md:gap-2">
        <img src="/images/V2/icon-line.svg" alt="icon-line" />
        <h1 className="font-bold text-center text-2xl md:text-[38px] text-white">
          Rewards Breakdown
        </h1>
        <img src="/images/V2/icon-line.svg" alt="icon-line" />
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-16">
        {['gold', 'platinum', 'silver'].map(tier => (
          <button
            key={`tier-${tier}`}
            className={`flex flex-col items-center justify-center z-40 ${
              currentTier === tier ? tierColors[tier] + ' font-bold' : 'text-[#ADADAD]'
            }`}
            disabled={currentTier === tier}
            onClick={() => setCurrentTier(tier)}
          >
            <p className="text-xl md:text-[34px] capitalize">{tier}</p>
          </button>
        ))}
      </div>
      <div className="flex gap-8 flex-wrap items-center justify-center">
        {tierRewards.map((reward, index) => (
          <RewardCard
            key={`${reward.name}-${index}`}
            name={reward.name}
            claimed={reward.claimed}
            total={reward.total}
            video={reward.video}
            type={currentTier}
          />
        ))}
      </div>
    </div>
  );
};

export default RewardsBreakdown;
