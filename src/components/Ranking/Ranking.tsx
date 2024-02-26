import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

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
            const name = await ens.name(player.address);
            return name || formatWallet(player.address);
          } catch (error) {
            console.error('Error fetching username:', error);
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
        {top.slice(0, 5).map((player, index) => {
          const { earnedVP } = player;
          return (
            <div
              key={`top-player-${index + 1}`}
              className="w-full flex justify-between items-center text-[16px] md:text-[18px] font-semibold gap-8 py-2"
            >
              <div className="w-1/6 flex items-center justify-center">
                {index < 3 ? (
                  <img
                    className="w-14"
                    src={`/public/images/medal-${
                      index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'
                    }.svg`}
                  />
                ) : (
                  <p className=" text-3xl">{index + 1}</p>
                )}
              </div>
              <div className="w-full flex justify-start">
                <p>{usernames[index]}</p>
              </div>
              <div className="w-1/6 flex justify-center items-center">{earnedVP}VP</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface RankingProps {
  top: { address: string; earnedVP: number }[];
}

export default Ranking;

const formatWallet = (wallet: string) => {
  if (wallet.length < 7) {
    return wallet;
  }
  const formattedWallet = `${wallet.slice(0, 5)}...${wallet.slice(-4)}`;
  return formattedWallet;
};
