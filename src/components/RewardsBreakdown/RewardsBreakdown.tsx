import { useState } from 'react';
import RewardCard from '../RewardCard/RewardCard';

const RewardsBreakdown = () => {
  const [currentTier, setCurrentTier] = useState('gold');
  const [tierRewards, setTierRewards] = useState(0);

  return (
    <div
      className={`flex flex-col items-center justify-start gap-16 
    ${currentTier === 'gold' && 'pb-36'}
    `}
    >
      <div className="flex items-center justify-center gap-2">
        <img src="/images/V2/icon-line.svg" />
        <h1 className="font-bold text-[38px] text-white">RewardsBreakdown</h1>
        <img src="/images/V2/icon-line.svg" />
      </div>
      <div className="flex items-center justify-center gap-16">
        {tiers.map((tier, index) => {
          const { name, color, outcome } = tier;
          return (
            <button
              key={`tier-${name}`}
              className="flex flex-col items-center justify-center z-40"
              disabled={currentTier === name}
              onClick={() => {
                setCurrentTier(name);
                setTierRewards(index);
              }}
            >
              <p
                className={`text-[34px] capitalize ${
                  currentTier === name ? `${color} font-bold` : 'text-[#ADADAD]'
                }`}
              >
                {name}
              </p>
              <p
                className={`${
                  currentTier === name ? `text-white font-semibold` : 'text-[#ADADAD]'
                }`}
              >
                {outcome} Outcome
              </p>
            </button>
          );
        })}
      </div>
      {
        <div className="flex gap-8 flex-wrap items-center justify-center">
          {tiers[tierRewards].rewards.map(reward => {
            const { name, claimed, total, video } = reward;
            return (
              <RewardCard
                key={`video-${name}`}
                name={name}
                claimed={claimed}
                total={total}
                video={video}
                type={tierRewards}
              />
            );
          })}
        </div>
      }
    </div>
  );
};

export default RewardsBreakdown;

const tiers = [
  {
    name: 'gold',
    color: 'text-[#FFD700]',
    outcome: '20%',
    rewards: [
      { name: 'Vanar', claimed: 0, total: 1000, video: 'vanar' },
      { name: 'PVP', claimed: 0, total: 1000, video: 'pvp' },
      { name: 'Auriswap', claimed: 0, total: 1000, video: 'auriswap' },
      { name: 'Bazaa', claimed: 0, total: 1000, video: 'bazaa' },
      { name: 'Maians', claimed: 0, total: 1000, video: 'maians' },
      { name: 'SpaceId', claimed: 0, total: 1000, video: 'spaceid' },
      { name: 'Nitro Leage', claimed: 0, total: 1000, video: 'nitro' },
    ],
  },
  {
    name: 'platinum',
    color: 'text-[#FF9F30]',
    outcome: '10%',
    rewards: [{ name: 'Vanar Jackpot', claimed: 0, total: 1000, video: 'jackpot' }],
  },
  {
    name: 'silver',
    color: 'text-[#C0C0C0]',
    outcome: '15%',
    rewards: [
      { name: 'Auriswap', claimed: 0, total: 1000, video: 'auriswap' },
      { name: 'Bazaa', claimed: 0, total: 1000, video: 'bazaa' },
      { name: 'Maians', claimed: 0, total: 1000, video: 'maians' },
      { name: 'Nitro Leage', claimed: 0, total: 1000, video: 'nitro' },
    ],
  },
];
