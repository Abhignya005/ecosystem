import React from 'react';
import { Link } from 'react-router-dom';
import ResourceChart from '../components/charts/ResourceChart';
import { Building2, AlertTriangle, Zap, Droplets, Leaf, ArrowRight, ShieldCheck, Trophy, Sliders } from 'lucide-react';

export default function Dashboard() {
  const energyData = [
    { name: 'Mon', usage: 3800, baseline: 3600 },
    { name: 'Tue', usage: 3950, baseline: 3600 },
    { name: 'Wed', usage: 5200, baseline: 3600 }, // Anomaly spike
    { name: 'Thu', usage: 4100, baseline: 3600 },
    { name: 'Fri', usage: 3750, baseline: 3600 },
    { name: 'Sat', usage: 2800, baseline: 2900 },
    { name: 'Sun', usage: 2650, baseline: 2700 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Campus Sustainability Hub</h1>
          <p className="text-gray-500 mt-1">Real-time telemetry, automated dispatching, and predictive decarbonization metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/eco-twin"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition flex items-center gap-2 shadow-sm"
          >
            <Building2 size={16} /> Eco-Twin Map
          </Link>
          <Link
            to="/simulator"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition flex items-center gap-2 shadow-sm"
          >
            <Sliders size={16} /> What-If Simulator
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Buildings Tracked */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Connected Zones</span>
            <Building2 size={20} className="text-emerald-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-gray-900">6 Buildings</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck size={14} /> 100% telemetry online
            </div>
          </div>
          <div className="text-[11px] text-gray-400">Total capacity: 5,400 students & faculty</div>
        </div>

        {/* Active Anomalies */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Threshold Anomalies</span>
            <AlertTriangle size={20} className="text-rose-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-rose-600">2 Critical</div>
            <div className="text-xs text-rose-500 font-semibold mt-1">
              Auto-dispatched to On-Duty Crew
            </div>
          </div>
          <Link to="/anomalies" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1">
            Review SLA Timers <ArrowRight size={12} />
          </Link>
        </div>

        {/* Daily Energy Consumption */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Daily Power Draw</span>
            <Zap size={20} className="text-amber-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-gray-900">26,250 <span className="text-sm font-normal text-gray-500">kWh</span></div>
            <div className="text-xs text-amber-600 font-semibold mt-1">
              +7.4% above moving baseline
            </div>
          </div>
          <div className="text-[11px] text-gray-400">Peak demand: Dining Hall & Labs</div>
        </div>

        {/* Carbon Footprint (Scope 1 & Scope 2) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Scope 1 & 2 Emissions</span>
            <Leaf size={20} className="text-teal-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-teal-700">21.5 <span className="text-sm font-normal text-gray-500">t CO2e</span></div>
            <div className="text-xs text-teal-600 font-semibold mt-1">
              Scope 1: 4.8t • Scope 2: 16.7t
            </div>
          </div>
          <div className="text-[11px] text-gray-400">Factor: 0.82 kg CO2e / kWh</div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Weekly Energy Consumption vs Baseline Threshold</h2>
            <p className="text-xs text-gray-400">Noticeable anomaly spike detected on Wednesday due to Chiller HVAC continuous cycling.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 w-fit">
            Baseline: 3,600 kWh / day
          </span>
        </div>
        <ResourceChart data={energyData} />
      </div>

      {/* Action Banners & Gamification Teaser */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eco-Twin Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Spatial Intelligence</div>
            <h3 className="text-xl font-bold">Explore Campus Eco-Twin 2D Visualizer</h3>
            <p className="text-slate-300 text-sm mt-2">
              Color-coded building statuses (Optimal, Moderate, Anomaly) with interactive drill-down telemetry and maintenance logs.
            </p>
          </div>
          <Link
            to="/eco-twin"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition"
          >
            Launch Eco-Twin Visualizer <ArrowRight size={16} />
          </Link>
        </div>

        {/* Green League Teaser */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2 flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" /> Green Campus League Leaderboard
            </div>
            <h3 className="text-xl font-bold text-gray-900">Current Leader: Oak Ridge Residence</h3>
            <p className="text-gray-600 text-sm mt-2">
              Oak Ridge leads with 3,420 sustainability points and an 18.4% energy reduction. Submit verified reports to earn dorm points.
            </p>
          </div>
          <Link
            to="/league"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition"
          >
            View Full League Standings <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
