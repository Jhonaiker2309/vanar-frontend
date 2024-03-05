import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';

const App = () => {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claim" element={<p>Claim</p>} />
          <Route path="/Leaderboard" element={'Leaderboard'} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
