import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';
import BugPage from './components/pages/BugPage';
import ReportBug from './components/pages/ReportBug'; // ✅ Ensure file exists here
import About from './components/pages/AboutPage';
import AnalyticsPage from './components/pages/AnalyticsPage'; // ✅ Ensure path/file is correct
import HomePage from './components/pages/HomePage'; // ✅ Ensure path/file is correct


function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="title">🐞 MERN Bug Tracker</h1>
        <p className="subtitle">Built with MongoDB, Express, React, Node.js</p>

        <div className="button-group">
          <Link to="/bugs"><button>View Bugs</button></Link>
          <Link to="/report"><button>Report New Bug</button></Link>
          <Link to="/about"><button>About</button></Link>
          <Link to="/analytics"><button>Analytics</button></Link>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bugs" element={<BugPage />} />
          <Route path="/report" element={<ReportBug />} />
          <Route path="/about" element={<About />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
