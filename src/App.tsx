import { useState, useEffect, useContext } from 'react';
import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Web3Context } from './web3';
import { MainSectionData, NftData, fetchData } from './utils/fetchData';
import { FAQ } from './components/FAQ/FAQ';
import Modal from './components/Modal/Modal';
import Input from './components/Input/Input';
import axios from 'axios';

const App = () => {
  const { account } = useContext(Web3Context);
  const [userName, setUserName] = useState('');
  const [openModal, setOpenModal] = useState(false);

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
    if (account) {
      axios
        .get(`https://staging-vanar-backend.vercel.app/getUsername/${account}`)
        .then(response => {
          const fetchedUsername = response?.data?.username;
          if (fetchedUsername) {
            setUserName(fetchedUsername);
          } else {
            setOpenModal(true);
          }
        })
        .catch(error => {
          console.error('Error fetching username:', error);
        });
    }
  }, [account]);

  useEffect(() => {
    fetchData(account, setMainSectionData, setNftVideo);
  }, [account]);

  return (
    <div className="w-screen h-screen background overflow-scroll fixed">
      <Navbar username={userName} />
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

      <Modal show={openModal} onClose={setOpenModal}>
        <>
          <div className="w-full relative flex justify-center items-center">
            <div className="absolute w-full h-full bg-black opacity-85 z-40" />
            <img src="/images/background-faq.svg" />
            <h1 className="text-2xl md:text-[56px] text-white text-center z-50 absolute leading-10 pt-20 md:pt-0  px-20">
              Create your username
            </h1>
          </div>
          <div className="flex justify-center pt-28 md:pt-20 px-4">
            <Input setOpenModal={setOpenModal} />
          </div>
        </>
      </Modal>
    </div>
  );
};

export default App;
