// import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home';
// import Leaderboard from './pages/Leaderboard';
// import { useState, useEffect } from 'react';

const App = () => {
  return (
    <div className="w-screen h-screen background overflow-scroll fixed flex flex-col justify-center items-center gap-4">
      <div className="w-screen h-screen bg-black opacity-85 absolute gap-4 z-0" />
      <div className="flex flex-col z-20 gap-8 px-4">
        <img src="/images/vanar-logo-full.svg" />
        <h1 className=" text-white text-4xl text-center">
          THE VANAR VANGUARD TESTNET CAMPAIGN HAS NOW ENDED
        </h1>
      </div>
      <div className="w-full flex justify-center px-4">
        <h1 className="text-white text-center text-2xl z-10">THANK YOU FOR YOUR PARTICIPATION</h1>
      </div>
    </div>
  );
  // const [twitterUsername, setTwitterUsername] = useState<string | null | undefined>();
  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const params = new URLSearchParams(queryString);
  //   const twitterUsernameFromParams = params.get('username');
  //   if (twitterUsernameFromParams) {
  //     localStorage.setItem('twitterUsername', twitterUsernameFromParams);
  //   }
  //   setTwitterUsername(twitterUsernameFromParams || localStorage.getItem('twitterUsername'));
  // }, []);
  // return (
  //   <main>
  //     <Router>
  //       <Navbar twitterUsername={twitterUsername} />
  //       <div className="w-screen h-screen background overflow-scroll fixed">
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route
  //             path="/claim"
  //             element={<div className="w-full h-full bg-black opacity-95">Claim</div>}
  //           />
  //           <Route
  //             path="/leaderboard"
  //             element={
  //               <div className="w-full h-full bg-black opacity-95 flex justify-center items-center">
  //                 <Leaderboard />
  //               </div>
  //             }
  //           />
  //           <Route path="*" element={<Navigate to="/" />} />
  //         </Routes>
  //       </div>
  //     </Router>
  //   </main>
};

export default App;
