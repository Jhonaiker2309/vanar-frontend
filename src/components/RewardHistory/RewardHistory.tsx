import { useState, useEffect } from 'react';
import 'toastr/build/toastr.min.css';

interface Prize {
  prizeWon: boolean;
  name: string;
  prizeClass: 'Platinum' | 'Gold' | 'Silver';
  tokenAddress?: string;
  nftAddress?: string;
  tokenAmount?: number;
  tokenDecimals?: number;
  prizeType: string;
  prizePartner: string;
  transactionRandomNumber?: number;
  date: string;
  signature: string;
  claimed?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  index?: any;
}

interface RewardHistoryProps {
  rewards: Prize[];
}

export const RewardHistory = ({ rewards }: RewardHistoryProps) => {
  const [view, setView] = useState<'all' | 'available' | 'minted'>('all');
  const [filteredRewards, setFilteredRewards] = useState<Prize[]>([]);

  useEffect(() => {
    const newFilteredRewards = rewards.filter(reward => {
      if (view === 'all') return true;
      if (view === 'available') return !reward.claimed;
      if (view === 'minted') return reward.claimed;
    });
    setFilteredRewards(newFilteredRewards);
  }, [rewards, view]);

  return (
    <div className="w-full h-full pt-20 flex flex-col items-center gap-8 px-8">
      <div className="pb-8 border-b-2 border-[#EDEDEEBD] w-full">
        <h1 className="text-[34px] font-bold text-center">Reward History</h1>
        <div />
        <div className="w-full flex items-center pt-8 gap-4">
          <button
            onClick={() => setView('all')}
            className={`py-2 px-8  rounded-xl text-xs md:text-base ${
              view === 'all' ? 'bg-black text-white' : 'text-black bg-[#EDEDEE]'
            }`}
          >
            Earned Rewards
          </button>
          {/* <button
            onClick={() => setView('available')}
            className={`py-2 px-8  rounded-xl text-xs md:text-base ${
              view === 'available' ? 'bg-black text-white' : 'text-black bg-[#EDEDEE]'
            }`}
          >
            Available Rewards
          </button>
          <button
            onClick={() => setView('minted')}
            className={`py-2 px-8  rounded-xl text-xs md:text-base ${
              view === 'minted' ? 'bg-black text-white' : 'text-black bg-[#EDEDEE]'
            }`}
          >
            Minted Rewards
          </button> */}
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

const Reward = ({ name, prizeClass, prizePartner, date, claimed }: Prize) => {
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

  const backgroundprizeClass: { [key: string]: string } = {
    Gold: 'bg-[#FFCE00]',
    Silver: 'bg-[#DCDCDC]',
    Platinum: 'bg-[#FF9F30]',
  };

  return (
    <div className="flex border-b-2 border-[#EDEDEEBD] w-full pb-8">
      <div className="w-full flex flex-col items-start gap-2 px-8">
        <div className="w-full flex justify-start items-center gap-2">
          <p className="font-bold text-[22px]">{name}</p>
          <div className={`py-1 px-4 rounded-full ${backgroundprizeClass[prizeClass]}`}>
            <p className="text-sm capitalize">{prizeClass}</p>
          </div>
        </div>
        <p className="">{prizePartner}</p>
        <p className="">{formatDate(date)}</p>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        {claimed && (
          <div className="flex items-center gap-2">
            <img src="/images/V2/icon-check-green.svg" alt="claimed" />
            <p className="text-[#01604D]">Claimed</p>
          </div>
        )}
      </div>
    </div>
  );
};
