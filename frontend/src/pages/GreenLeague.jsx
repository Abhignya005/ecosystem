import React, { useState } from 'react';
import { Trophy, Award, Flame, Users, ArrowUp, ArrowDown, Gift, Sparkles } from 'lucide-react';

const LEADERBOARD_DATA = [
  {
    rank: 1,
    name: 'Oak Ridge Student Residence (Hostel A)',
    type: 'HOSTEL',
    points: 3420,
    energySaved: '18.4%',
    waterSaved: '14.2%',
    reportsLogged: 46,
    badge: 'Campus Eco-Champion',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    rank: 2,
    name: 'Department of Computer Science',
    type: 'DEPARTMENT',
    points: 3150,
    energySaved: '15.1%',
    waterSaved: '11.8%',
    reportsLogged: 38,
    badge: 'Zero-Waste Innovator',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    rank: 3,
    name: 'Pine Crest Residence (Hostel B)',
    type: 'HOSTEL',
    points: 2890,
    energySaved: '12.8%',
    waterSaved: '9.4%',
    reportsLogged: 29,
    badge: 'Water Guardian',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
  },
  {
    rank: 4,
    name: 'School of Mechanical Engineering',
    type: 'DEPARTMENT',
    points: 2470,
    energySaved: '9.6%',
    waterSaved: '7.5%',
    reportsLogged: 22,
    badge: 'Green Pioneer',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    rank: 5,
    name: 'Maple Court Graduate Housing',
    type: 'HOSTEL',
    points: 2180,
    energySaved: '7.9%',
    waterSaved: '6.1%',
    reportsLogged: 18,
    badge: 'Energy Saver',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  }
];

export default function GreenLeague() {
  const [filter, setFilter] = useState('ALL');

  const filtered = LEADERBOARD_DATA.filter(item => {
    if (filter === 'ALL') return true;
    return item.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <Trophy className="text-amber-500" size={32} /> Gamified Green Campus League
          </h1>
          <p className="text-gray-500 mt-1">Inter-hostel and inter-department sustainability competition ranking per-capita efficiency and verified reports.</p>
        </div>

        {/* Filter */}
        <div className="flex bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm text-sm">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${filter === 'ALL' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All Entrants
          </button>
          <button
            onClick={() => setFilter('HOSTEL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${filter === 'HOSTEL' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Hostels & Dorms
          </button>
          <button
            onClick={() => setFilter('DEPARTMENT')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${filter === 'DEPARTMENT' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Academic Depts
          </button>
        </div>
      </div>

      {/* Monthly Rewards Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Gift size={14} /> September 2026 Season Rewards
          </div>
          <h2 className="text-2xl font-black">Top Ranked Dorm Wins $2,500 Green Initiative Grant</h2>
          <p className="text-emerald-100 text-sm max-w-xl">
            Rankings update dynamically based on smart meter resource reductions, verified issue logs, and zero-waste audit scores.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[180px]">
          <div className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">Season Days Remaining</div>
          <div className="text-3xl font-black mt-1">17 Days</div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Community Entity</th>
                <th className="px-6 py-4">Current Badge</th>
                <th className="px-6 py-4">Energy Cut</th>
                <th className="px-6 py-4">Water Cut</th>
                <th className="px-6 py-4">Issues Verified</th>
                <th className="px-6 py-4 text-right">League Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((item) => (
                <tr key={item.name} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                        item.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-sm' :
                        item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                        item.rank === 3 ? 'bg-amber-600/30 text-amber-900' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${item.badgeColor}`}>
                      <Sparkles size={12} /> {item.badge}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">{item.energySaved}</td>
                  <td className="px-6 py-4 font-semibold text-cyan-600">{item.waterSaved}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.reportsLogged} reports</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-black text-gray-900">{item.points.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">pts</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

