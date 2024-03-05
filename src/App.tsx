import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';

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
              path="/Leaderboard"
              element={<div className="w-full h-full bg-black opacity-95">Leaderboard</div>}
            />
          </Routes>
        </div>
      </Router>
    </main>
  );
};

export default App;
