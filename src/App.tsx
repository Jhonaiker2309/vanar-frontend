import MainSection from './components/MainSection/MainSection';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="w-screen h-screen background relative overflow-hidden">
      <Navbar />

      <Sidebar />
      <MainSection />
    </div>
  );
};

export default App;
