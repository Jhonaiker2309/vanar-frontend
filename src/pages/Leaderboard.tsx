import { useContext } from 'react';
import { Web3Context } from '../web3';
import SearchBar from '../components/SearchBar/SearchBar';

const Leaderboard = () => {
  const { account } = useContext(Web3Context);
  return (
    <div className="p-8 bg-[#A08CFF] bg-opacity-10 rounded-[25px] w-2/3 h-2/3 overflow-hidden">
      <div className="flex justify-between items-center pb-4 gap-10 ">
        <div className="flex items-center gap-6 text-white">
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <div className="h-12 flex justify-center items-center text-xs md:text-[18px] min-w-fit w-fit bg-[#A08CFF] bg-opacity-20  text-white ring-1 ring-[#A08CFF] py-2 md:py-3 px-2 md:px-6 rounded-full gap-2 button-light">
            <p className="text-nowrap">Your Rank:</p>
            <p className="text-nowrap text-2xl font-bold">12th</p>
          </div>
        </div>
        <SearchBar />
      </div>
      <div className="w-full h-full flex flex-col p-4 overflow-scroll gap-2 pb-12">
        <div className="w-full flex justify-evenly bg-[#A08CFF] font-semibold  bg-opacity-10 text-[#A08CFF] py-5 rounded-xl ring-1 ring-inset ring-[#A08CFF] ring-opacity-50 shadow-[#A08CFF] box-light">
          <p className="w-full text-center">POSITION</p>
          <p className="w-full text-center">POINTS / VP</p>
          <p className="w-full text-center">WALLET ADDRESS</p>
        </div>
        {ranking.map(rank => {
          const { position, points, wallet } = rank;
          const myRaking = wallet.toLowerCase() === account?.toLowerCase();
          return (
            <div
              className={`w-full flex justify-evenly  font-semibold  text-white py-5 rounded-xl ${
                myRaking ? 'bg-[#A08CFF] bg-opacity-40' : 'bg-[#A08CFF] bg-opacity-5'
              } `}
            >
              <p className="w-full text-center">{position}</p>
              <p className="w-full text-center">{points}</p>
              <p className="w-full text-center">{formatWallet(wallet)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;

const formatWallet = (wallet: string) => {
  if (wallet.length < 7) {
    return wallet;
  }
  const formattedWallet = `${wallet.slice(0, 5)}...${wallet.slice(-4)}`;
  return formattedWallet;
};

const ranking = [
  {
    position: 1,
    points: 100,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 2,
    points: 100,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 3,
    points: 80,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 4,
    points: 50,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 5,
    points: 20,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 6,
    points: 0,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 6,
    points: 0,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 7,
    points: 0,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 8,
    points: 0,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 9,
    points: 0,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
  {
    position: 10,
    points: 0,
    wallet: '0xeEFBbce954c10278bBE926B06bd5c1cF91661433',
  },
];
