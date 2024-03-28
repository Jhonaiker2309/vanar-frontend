import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import { useState, useEffect } from 'react';

const App = () => {
  const [twitterUsername, setTwitterUsername] = useState<string | null | undefined>();
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const twitterUsernameFromParams = params.get('username');
    if (twitterUsernameFromParams) {
      localStorage.setItem('twitterUsername', twitterUsernameFromParams);
    }
    setTwitterUsername(twitterUsernameFromParams || localStorage.getItem('twitterUsername'));
  }, []);
  return (
    <main>
      <Router>
        <Navbar twitterUsername={twitterUsername} />
        <div className="w-screen h-screen background overflow-scroll fixed">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/claim"
              element={<div className="w-full h-full bg-black opacity-95">Claim</div>}
            />
            <Route
              path="/leaderboard"
              element={
                <div className="w-full h-full bg-black opacity-95 flex justify-center items-center">
                  <Leaderboard />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
};

export default App;
