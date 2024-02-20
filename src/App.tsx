import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import SideImage from './components/SideImage/SideImage';
import { Web3Context } from './web3';

const App = () => {
  const { account } = useContext(Web3Context);
  const [mainSectionData, setMainSectionData] = useState<{
    totalWeeks: number;
    currentWeek: number;
    currentStatus: string;
    isFinished: boolean;
    tasks: {
      isCompleted: boolean;
      experience: number;
      link?: string;
      logo: string;
      text: string;
      isBonus?: boolean;
    }[];
  }>({
    totalWeeks: 0,
    currentWeek: 0,
    currentStatus: 'Blocked',
    isFinished: false,
    tasks: [{ isCompleted: false, experience: 0, logo: '', text: '', isBonus: false }],
  });

  const [nftVideo, setNftVideo] = useState<{ video: string; name: string }>({
    video: '',
    name: '',
  });

  // This function fetch all the data for the page. It takes the account as param for display the correct data.
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = account
        ? `https://vanar-backend.vercel.app/${account}`
        : 'https://vanar-backend.vercel.app';

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const mainData = {
          totalWeeks: data.numberOfWeeks,
          currentWeek: data.currentWeekData.week,
          isFinished: data.finished,
          currentStatus: data.currentWeekData.status,
          tasks: data.currentWeekData.tasks,
        };
        setMainSectionData(mainData);
        const nftData = {
          video: data.currentVideo,
          name: data.currentNFT.name,
        };
        setNftVideo(nftData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [account, setMainSectionData, setNftVideo]);

  return (
    <div className="w-screen h-screen background overflow-scroll fixed">
      <Navbar />
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="z-40">
          <MainSection data={mainSectionData} />
        </div>
        <div className="z-10">
          <SideImage nft={nftVideo} />
        </div>
      </div>
    </div>
  );
};

export default App;
