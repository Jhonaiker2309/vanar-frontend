import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/NavbarV2';
import SpinWheel from './pages/SpinWheel';

const App = () => {
  //------------------------------------------------------------------------------------------------
  // END OF CAMPAIGN PAGE
  // return (
  //   <div className="w-screen h-screen background overflow-scroll fixed flex flex-col justify-center items-center gap-4">
  //     <div className="w-screen h-screen bg-black opacity-85 absolute gap-4 z-0" />
  //     <div className="flex flex-col z-20 gap-8 px-4">
  //       <img src="/images/vanar-logo-full.svg" />
  //       <h1 className=" text-white text-4xl text-center">
  //         THE VANAR VANGUARD TESTNET CAMPAIGN HAS NOW ENDED
  //       </h1>
  //     </div>
  //     <div className="w-full flex justify-center px-4">
  //       <h1 className="text-white text-center text-2xl z-10">THANK YOU FOR YOUR PARTICIPATION</h1>
  //     </div>
  //   </div>
  // );
  //------------------------------------------------------------------------------------------------

  return (
    <main>
      <Router>
        <Navbar />
        <div className="w-full h-full overflow-scroll background">
          <Routes>
            <Route path="/" element={<SpinWheel />} />
            {/* -------------------------------------------------------------------------- */
            /* PREVIOUS NAVIGATION LINKS
            <Route
              path="/"
              element={
                <div className="w-screen h-screen background overflow-scroll fixed flex flex-col justify-center items-center gap-4">
                  <div className="w-screen h-screen bg-black opacity-85 absolute gap-4 z-0" />
                  <div className="flex flex-col z-20 gap-8 px-4">
                    <img src="/images/vanar-logo-full.svg" />
                    <h1 className=" text-white text-4xl text-center">
                      THE VANAR VANGUARD TESTNET CAMPAIGN HAS NOW ENDED
                    </h1>
                  </div>
                  <div className="w-full flex justify-center px-4">
                    <h1 className="text-white text-center text-2xl z-10">
                      THANK YOU FOR YOUR PARTICIPATION
                    </h1>
                  </div>
                </div>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <div className="w-full h-full bg-black opacity-95 flex justify-center items-center">
                  <Leaderboard />
                </div>
              }
            />
            <Route
              path="/reward"
              element={
                <div className="w-full h-full bg-black opacity-95 flex justify-center items-center">
                  <Reward />
                </div>
              }
            /> 
            -------------------------------------------------------------------------- 
            */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
};

export default App;
