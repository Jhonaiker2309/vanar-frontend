import { useState } from 'react';

interface RewardProps {
  index?: number;
  name: string;
  tier: string;
  date: Date;
  claimed: boolean;
}

interface RewardHistoryProps {
  rewards: RewardProps[];
}

export const RewardHistory = ({ rewards }: RewardHistoryProps) => {
  const [view, setView] = useState<'all' | 'available' | 'minted'>('all');

  const filteredRewards = rewards.filter(reward => {
    if (view === 'all') return true;
    if (view === 'available') return !reward.claimed;
    if (view === 'minted') return reward.claimed;
  });

  return (
    <div className="w-full h-full pt-20 flex flex-col items-center gap-8 px-8">
      <div className="pb-8 border-b-2 border-[#EDEDEEBD] w-full">
        <h1 className="text-[34px] font-bold text-center">Reward History</h1>
        <div />
        <div className="flex items-center pt-8 gap-4">
          <button
            onClick={() => setView('all')}
            className={`py-2 px-8 rounded-xl ${
              view === 'all' ? 'bg-black text-white' : 'text-black bg-[#EDEDEE]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setView('available')}
            className={`py-2 px-8 rounded-xl ${
              view === 'available' ? 'bg-black text-white' : 'text-black bg-[#EDEDEE]'
            }`}
          >
            Available rewards
          </button>
          <button
            onClick={() => setView('minted')}
            className={`py-2 px-8 rounded-xl ${
              view === 'minted' ? 'bg-black text-white' : 'text-black bg-[#EDEDEE]'
            }`}
          >
            Minted Rewards
          </button>
        </div>
      </div>

      <div className="w-full h-3/5 pb-8 flex flex-col gap-4 overflow-scroll z-50">
        {filteredRewards.map((reward, index) => (
          <Reward key={`reward-${index}`} index={index} {...reward} />
        ))}
      </div>
    </div>
  );
};

const Reward = ({ name, tier, date, claimed }: RewardProps) => {
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);

    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix = suffixes[day % 10 > 3 || (day % 100 >= 11 && day % 100 <= 13) ? 0 : day % 10];

    return `${month} ${day}${suffix}, ${year}, ${hours}:${minutes}${ampm}`;
  };

  const handleClaimReward = () => {
    console.log('Claiming reward');
  };

  const backgroundTier: { [key: string]: string } = {
    gold: 'bg-[#FFCE00]',
    silver: 'bg-[#DCDCDC]',
    platinum: 'bg-[#FF9F30]',
  };

  return (
    <div className="flex border-b-2 border-[#EDEDEEBD] w-full pb-8">
      <div className="w-full flex flex-col items-start gap-2 px-8">
        <div className="w-full flex justify-start items-center gap-2">
          <p className="font-bold text-[22px]">{name}</p>
          <div className={`py-1 px-4 rounded-full ${backgroundTier[tier]}`}>
            <p className="text-sm capitalize">{tier}</p>
          </div>
        </div>
        <p className="">{formatDate(date)}</p>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        {claimed ? (
          <div className="flex items-center gap-2">
            <img src="/images/V2/icon-check-green.svg" alt="claimed" />
            <p className="text-[#01604D]">Claimed</p>
          </div>
        ) : (
          <button className="flex items-center gap-2" onClick={handleClaimReward}>
            <p>Claim now</p>
            <img src="/images/V2/icon-go.svg" alt="claimed" />
          </button>
        )}
      </div>
    </div>
  );
};

// const EarnedRewards = [
//   {
//     name: 'Vanar',
//     tier: 'gold',
//     date: new Date(),
//     claimed: false,
//   },
//   {
//     name: 'Nitro League',
//     tier: 'silver',
//     date: new Date(),
//     claimed: true,
//   },
//   {
//     name: 'Vanar',
//     tier: 'platinum',
//     date: new Date(),
//     claimed: true,
//   },
//   {
//     name: 'Jackpot',
//     tier: 'gold',
//     date: new Date(),
//     claimed: true,
//   },
//   {
//     name: 'Vanar',
//     tier: 'gold',
//     date: new Date(),
//     claimed: true,
//   },
//   {
//     name: 'Nitro League',
//     tier: 'silver',
//     date: new Date(),
//     claimed: true,
//   },
//   {
//     name: 'Vanar',
//     tier: 'platinum',
//     date: new Date(),
//     claimed: true,
//   },
//   {
//     name: 'Jackpot',
//     tier: 'gold',
//     date: new Date(),
//     claimed: true,
//   },
// ];
