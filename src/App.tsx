import { useState, useEffect } from 'react';
import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import SideImage from './components/SideImage/SideImage';

const App = () => {
  const [mainSectionData, setMainSectionData] = useState<{
    totalWeeks: number;
    currentWeek: number;
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
    isFinished: false,
    tasks: [{ isCompleted: false, experience: 0, logo: '', text: '', isBonus: false }],
  });

  const [nftVideo, setNftVideo] = useState<{ video: string; name: string }>({
    video: '',
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://vanar-backend.vercel.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMainSectionData({
          totalWeeks: data.numberOfWeeks,
          currentWeek: data.currentWeekData.week,
          isFinished: data.finished,
          tasks: data.currentWeekData.tasks,
        });
        setNftVideo({ video: data.currentVideo, name: data.currentNFT.name });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  console.log(mainSectionData);

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
