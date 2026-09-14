import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EcoTwinMap from './pages/EcoTwinMap';
import Anomalies from './pages/Anomalies';
import ReportIssue from './pages/ReportIssue';
import GreenLeague from './pages/GreenLeague';
import Simulator from './pages/Simulator';

function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/eco-twin" element={<EcoTwinMap />} />
            <Route path="/anomalies" element={<Anomalies />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/league" element={<GreenLeague />} />
            <Route path="/simulator" element={<Simulator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
