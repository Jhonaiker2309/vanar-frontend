import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import SideImage from './components/SideImage/SideImage';

const App = () => {
  return (
    <div className="w-screen h-screen background overflow-scroll fixed">
      <Navbar />
      <SideImage />
      <MainSection />
    </div>
  );
};

export default App;
