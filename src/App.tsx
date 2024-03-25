import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <main>
      <Router>
        <Navbar />
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
          </Routes>
        </div>
      </Router>
    </main>
  );
};

export default App;
