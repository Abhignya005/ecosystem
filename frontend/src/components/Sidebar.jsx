import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Building2, AlertTriangle, Trophy, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 text-green-400">EcoCampus</div>
      <nav className="flex-1 space-y-1.5 text-sm font-medium">
        <Link to="/" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition">
          <LayoutDashboard size={20} className="text-emerald-400" />
          <span>Dashboard</span>
        </Link>
        <Link to="/eco-twin" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition">
          <Building2 size={20} className="text-cyan-400" />
          <span>Eco-Twin Map</span>
        </Link>
        <Link to="/anomalies" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition">
          <AlertTriangle size={20} className="text-rose-400" />
          <span>Anomaly Engine</span>
        </Link>
        <Link to="/report-issue" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition">
          <span className="text-amber-400 font-bold text-lg leading-none">📸</span>
          <span>Report Issue (AI)</span>
        </Link>
        <Link to="/league" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition">
          <Trophy size={20} className="text-amber-400" />
          <span>Green League</span>
        </Link>
        <Link to="/simulator" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition">
          <span className="text-blue-400 font-bold text-lg leading-none">⚡</span>
          <span>'What-If' Simulator</span>
        </Link>
      </nav>
    </aside>
  );
}

