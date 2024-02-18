import { useState, useEffect } from 'react';
import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import SideImage from './components/SideImage/SideImage';

const App = () => {
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
        console.log(data);
        setNftVideo({ video: data.currentVideo, name: data.currentNFT.name });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen background overflow-scroll fixed">
      <Navbar />
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="z-40">
          <MainSection />
        </div>
        <div className="z-10">
          <SideImage nft={nftVideo} />
        </div>
      </div>
    </div>
  );
};

export default App;
