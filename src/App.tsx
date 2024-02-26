import { useState, useEffect, useContext } from 'react';
import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Web3Context } from './web3';
import { MainSectionData, NftData, fetchData } from './utils/fetchData';
import { FAQ } from './components/FAQ/FAQ';

const App = () => {
  const { account } = useContext(Web3Context);
  const [mainSectionData, setMainSectionData] = useState<MainSectionData>({
    totalWeeks: 0,
    currentWeek: 0,
    currentStatus: '',
    isFinished: false,
    tasks: [],
    eventPhases: [],
  });

  const [nftVideo, setNftVideo] = useState<NftData>({
    video: '',
    name: '',
    experienceNeeded: 0,
  });

  useEffect(() => {
    fetchData(account, setMainSectionData, setNftVideo);
  }, [account]);

  return (
    <div className="w-screen h-screen background overflow-scroll fixed">
      <Navbar />
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="z-40">
          <MainSection
            totalWeeks={mainSectionData.totalWeeks}
            currentWeek={mainSectionData.currentWeek}
            currentStatus={mainSectionData.currentStatus}
            tasks={mainSectionData.tasks}
            eventPhases={mainSectionData.eventPhases}
          />
        </div>
        <div className="z-10">
          <Sidebar nft={nftVideo} currentWeek={mainSectionData.currentWeek} />
        </div>
        <div className="display md:hidden z-0">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default App;
