import { useState, useEffect } from 'react';
import RewardCard from '../RewardCard/RewardCard';

interface Reward {
  name: string;
  claimed?: number;
  total?: number;
  video: string;
}

interface Tier {
  name: string;
  color: string;
  outcome: string;
  rewards: Reward[];
}

interface PrizeInfo {
  deliveredCount: number;
  total: number;
  name: string;
  video: string;
}

interface RewardsBreakdownProps {
  prizesInfo: PrizeInfo[];
}

const RewardsBreakdown = ({ prizesInfo }: RewardsBreakdownProps) => {
  const [currentTier, setCurrentTier] = useState('gold');
  const [tierRewards, setTierRewards] = useState<Reward[]>([]);

  const tiers: Tier[] = [
    {
      name: 'gold',
      color: 'text-[#FFD700]',
      outcome: '20%',
      rewards: [
        {
          name: prizesInfo[2]?.name,
          claimed: prizesInfo[2]?.deliveredCount,
          total: prizesInfo[2]?.total,
          video: prizesInfo[2]?.video,
        },
        {
          name: prizesInfo[4]?.name,
          claimed: prizesInfo[4]?.deliveredCount,
          total: prizesInfo[4]?.total,
          video: prizesInfo[4]?.video,
        },
        {
          name: prizesInfo[5]?.name,
          claimed: prizesInfo[5]?.deliveredCount,
          total: prizesInfo[5]?.total,
          video: prizesInfo[5]?.video,
        },
        {
          name: prizesInfo[7]?.name,
          claimed: prizesInfo[7]?.deliveredCount,
          total: prizesInfo[7]?.total,
          video: prizesInfo[7]?.video,
        },
        {
          name: prizesInfo[9]?.name,
          claimed: prizesInfo[9]?.deliveredCount,
          total: prizesInfo[9]?.total,
          video: prizesInfo[9]?.video,
        },
        {
          name: prizesInfo[11]?.name,
          claimed: prizesInfo[11]?.deliveredCount,
          total: prizesInfo[11]?.total,
          video: prizesInfo[11]?.video,
        },
        {
          name: prizesInfo[13]?.name,
          claimed: prizesInfo[13]?.deliveredCount,
          total: prizesInfo[13]?.total,
          video: prizesInfo[13]?.video,
        },
      ],
    },
    {
      name: 'platinum',
      color: 'text-[#FF9F30]',
      outcome: '10%',
      rewards: [
        {
          name: prizesInfo[0]?.name,
          claimed: prizesInfo[0]?.deliveredCount,
          total: prizesInfo[0]?.total,
          video: prizesInfo[0]?.video,
        },
        {
          name: prizesInfo[10]?.name,
          claimed: prizesInfo[10]?.deliveredCount,
          total: prizesInfo[10]?.total,
          video: prizesInfo[10]?.video,
        },
      ],
    },
    {
      name: 'silver',
      color: 'text-[#C0C0C0]',
      outcome: '15%',
      rewards: [
        {
          name: prizesInfo[1]?.name,
          claimed: prizesInfo[1]?.deliveredCount,
          total: prizesInfo[1]?.total,
          video: prizesInfo[1]?.video,
        },
        {
          name: prizesInfo[3]?.name,
          claimed: prizesInfo[3]?.deliveredCount,
          total: prizesInfo[3]?.total,
          video: prizesInfo[3]?.video,
        },
        {
          name: prizesInfo[6]?.name,
          claimed: prizesInfo[6]?.deliveredCount,
          total: prizesInfo[6]?.total,
          video: prizesInfo[6]?.video,
        },
        {
          name: prizesInfo[8]?.name,
          claimed: prizesInfo[8]?.deliveredCount,
          total: prizesInfo[8]?.total,
          video: prizesInfo[8]?.video,
        },
        {
          name: prizesInfo[12]?.name,
          claimed: prizesInfo[12]?.deliveredCount,
          total: prizesInfo[12]?.total,
          video: prizesInfo[12]?.video,
        },
      ],
    },
  ];

  useEffect(() => {
    const tier = tiers.find(tier => tier.name === currentTier);
    if (tier) {
      setTierRewards(tier.rewards);
    }
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
        {tiers.map(tier => (
          <button
            key={`tier-${tier.name}`}
            className="flex flex-col items-center justify-center z-40"
            disabled={currentTier === tier.name}
            onClick={() => setCurrentTier(tier.name)}
          >
            <p
              className={`text-xl md:text-[34px] capitalize ${
                currentTier === tier.name ? `${tier.color} font-bold` : 'text-[#ADADAD]'
              }`}
            >
              {tier.name}
            </p>
            {/*<p
              className={`text-xs md:text-base ${
                currentTier === tier.name ? `text-white font-semibold` : 'text-[#ADADAD]'
              }`}
            >
              {tier.outcome} Outcome
            </p>*/}
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
