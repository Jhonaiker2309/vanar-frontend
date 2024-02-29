import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import medal_gold from '/public/images/medal-gold.svg';
import medal_silver from '/public/images/medal-silver.svg';
import medal_bronze from '/public/images/medal-bronze.svg';

const Ranking = ({ top }: RankingProps) => {
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const ens = new ethers.Contract(
        '0x314159265dd8dbb310642f98f50c066173c1259b',
        ['function name(address) view returns (string)'],
        provider,
      );

      const fetchedUsernames = await Promise.all(
        top.slice(0, 5).map(async player => {
          try {
            const name = await ens.name(player.account);
            return name || formatWallet(player.account);
          } catch (error) {
            return formatWallet(player.account);
          }
        }),
      );
      setUsernames(fetchedUsernames);
    };

    if (window.ethereum) {
      fetchUsernames();
    }
  }, [top]);

  return (
    <div className="w-full flex flex-col justify-center items-center p-8 md:pb-40 text-white">
      <h1 className="text-[28px] md:text-[44px] font-semibold">Top VP earned</h1>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center text-[18px] md:text-[24px] font-semibold gap-8">
          <div className="w-1/6 flex justify-center font-semibold">Rank</div>
          <div className="w-full flex justify-start">Account</div>
          <p className="w-1/6 text-nowrap">Total VP</p>
        </div>
        {top.map((player, index) => {
          const { experience } = player;
          return (
            <div
              key={`top-player-${index + 1}`}
              className="w-full flex justify-between items-center text-[16px] md:text-[18px] font-semibold gap-8 py-2"
            >
              <div className="w-1/6 flex items-center justify-center">
                {index < 3 ? (
                  <img
                    className="w-14"
                    src={index === 0 ? medal_gold : index === 1 ? medal_silver : medal_bronze}
                  />
                ) : (
                  <p className=" text-3xl">{index + 1}</p>
                )}
              </div>
              <div className="w-full flex justify-start">
                <p className="pl-5">{usernames[index]}</p>
              </div>
              <div className="w-1/6 flex justify-center items-center">{experience}VP</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface RankingProps {
  top: { account: string; experience: number }[];
}

export default Ranking;

const formatWallet = (wallet: string) => {
  if (wallet.length < 7) {
    return wallet;
  }
  const formattedWallet = `${wallet.slice(0, 5)}...${wallet.slice(-4)}`;
  return formattedWallet;
};
