import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import SideImage from './components/SideImage/SideImage';

const App = () => {
  return (
    <div className="w-screen h-screen background overflow-scroll fixed">
      <Navbar />
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="z-40">
          <MainSection />
        </div>
        <div className="z-10">
          <SideImage />
        </div>
      </div>
    </div>
  );
};

export default App;
