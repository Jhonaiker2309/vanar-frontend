import { useContext, useState, useEffect } from 'react';
import { Web3Context } from '../web3';
import axios from 'axios';

const Leaderboard = () => {
  const { account } = useContext(Web3Context);
  const [top, setTop] = useState<LeaderboardDataProps[]>([]);
  const [myRank, setMyRank] = useState(0);
  const myAccount: string = account || '';

  const getRankedData = async () => {
    try {
      const urlRankedData: string = import.meta.env.VITE_BACKEND_URL + '/rankedList';
      const axiosData = await axios.get(urlRankedData);
      setTop(axiosData.data.sortedList.slice(0, 20));
    } catch (e) {
      setTop([]);
    }
  };

  const getUserRank = async () => {
    try {
      const previousRankStr = localStorage.getItem('myRank');
      const previousRank = previousRankStr ? parseInt(previousRankStr) : null;
      const previousTimestamp = localStorage.getItem('checkpoint');
      const storedTimestamp = previousTimestamp ? new Date(previousTimestamp) : null;

      if (account) {
        const currentTime = new Date();
        const diffInMs = storedTimestamp ? currentTime.getTime() - storedTimestamp.getTime() : null;
        const diffInHours = diffInMs !== null ? diffInMs / (1000 * 60 * 60) : null;

        if (previousRank !== null && diffInHours !== null && diffInHours < 12) {
          setMyRank(previousRank);
        } else {
          const response = await axios.get(
            `https://staging-vanar-backend.vercel.app/individual-ranking/${account}`,
          );
          const rank = response.data;
          const timestamp = new Date().toISOString();
          localStorage.setItem('myRank', rank.rank.toString());
          localStorage.setItem('checkpoint', timestamp);
          setMyRank(rank.rank);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRankedData();
    getUserRank();
  }, [myRank, account]);

  return (
    <>
      <div className="w-full h-screen absolute pt-40 pb-10">
        <div className="w-full h-full flex items-center flex-col gap-8 overflow-scroll">
          <div className="px-8 pt-8 bg-[#A08CFF] bg-opacity-10 rounded-[25px] w-5/6 md:w-2/3 h-screen md:h-full overflow-hidden pb-12">
            <div className="flex flex-col md:flex-row justify-between items-center pb-10  md:pb-6 gap-4 md:gap-10 ">
              <div className="flex flex-col md:flex-row items-center gap-6 text-white">
                <h1 className="text-4xl font-bold">Leaderboard</h1>
                <div className="h-12 flex justify-center items-center text-xs md:text-[18px] min-w-fit w-full md:w-fit bg-[#A08CFF] bg-opacity-20 text-white ring-1 ring-[#A08CFF] py-2 md:py-3 px-2 md:px-6 rounded-full gap-2 button-light">
                  <p className="text-nowrap">Your Rank:</p>
                  <p className="text-nowrap text-2xl font-bold">{myRank}</p>
                </div>
              </div>
            </div>
            <div className="w-full h-screen flex flex-col overflow-scroll gap-2">
              <div className="w-full flex justify-evenly bg-[#A08CFF] font-semibold bg-opacity-10 text-[#A08CFF] px-4 md:px-0  py-5 rounded-xl ring-1 ring-inset ring-[#A08CFF] ring-opacity-50 shadow-[#A08CFF] box-light">
                <p className="w-1/3 md:w-full text-xs md:text-base text-center">POSITION</p>
                <p className="w-full text-xs md:text-base text-center">POINTS / VP</p>
                <p className="w-full text-xs md:text-base text-center">WALLET ADDRESS</p>
              </div>
              <div className="w-full min-h-fit flex flex-col gap-2 mb-[485px] md:pb-12 overflow-scroll">
                {top?.map(rank => {
                  const { position, experience, account } = rank;
                  const myRaking =
                    myAccount?.toLowerCase() == account ? account?.toLowerCase() : '';
                  return (
                    <div
                      key={`ranking-${position}`}
                      className={`w-full flex justify-evenly  font-semibold  text-white py-5 rounded-xl ${
                        myRaking ? 'bg-[#A08CFF] bg-opacity-40' : 'bg-[#A08CFF] bg-opacity-5'
                      } `}
                    >
                      <p className="w-1/2 md:w-full text-xs md:text-base text-center">{position}</p>
                      <p className="w-full text-xs md:text-base text-center">{experience}</p>
                      <p className="w-full text-xs md:text-base text-center">
                        {formatWallet(account)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-1/3 px-8 py-4 bg-[#A08CFF] bg-opacity-10 rounded-[25px] w-5/6 md:w-2/3 text-white flex flex-col gap-2 md:gap-4">
            <h1 className="text-sm md:text-2xl font-bold ">1. How Leaderboard Works?</h1>
            <p className="w-full text-[10px] md:text-base font-base opacity-50 pb-8 md:pb-2">
              The points on a leaderboard may be different from one event to another, check with
              Event Organizer on what scoring system they are using. Some events will score based on
              Placement, by Points or cumulative. Score by placement, 1st place receives 1 point;
              2nd receives 2 points, etc.
            </p>
          </div>
        </div>
      </div>
    </>
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

interface LeaderboardDataProps {
  position: number;
  experience: number;
  account: string;
}
