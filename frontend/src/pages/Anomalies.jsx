import React, { useState } from 'react';
import { AlertTriangle, Clock, Play, CheckCircle2, ShieldAlert, Wrench, ArrowUpRight } from 'lucide-react';

const INITIAL_ANOMALIES = [
  {
    id: 'anom-101',
    buildingName: 'Campus Dining Hall & Food Center',
    metricType: 'WATER',
    currentValue: 280,
    baseline: 170,
    pctOver: 64.7,
    severity: 'CRITICAL',
    time: '42 mins ago',
    status: 'OPEN',
    ticketDispatched: true,
    slaRemaining: '01h 18m'
  },
  {
    id: 'anom-102',
    buildingName: 'Campus Dining Hall & Food Center',
    metricType: 'ELECTRICITY',
    currentValue: 580,
    baseline: 390,
    pctOver: 48.7,
    severity: 'HIGH',
    time: '2 hours ago',
    status: 'OPEN',
    ticketDispatched: true,
    slaRemaining: '03h 45m'
  },
  {
    id: 'anom-103',
    buildingName: 'Oak Ridge Student Residence',
    metricType: 'WATER',
    currentValue: 130,
    baseline: 120,
    pctOver: 8.3,
    severity: 'LOW',
    time: '5 hours ago',
    status: 'RESOLVED',
    ticketDispatched: false,
    slaRemaining: 'Resolved'
  }
];

export default function Anomalies() {
  const [anomalies, setAnomalies] = useState(INITIAL_ANOMALIES);
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState(null);

  const handleTriggerScan = () => {
    setScanning(true);
    setScanMessage(null);
    setTimeout(() => {
      setScanning(false);
      setScanMessage('Scan complete! Baseline moving averages evaluated across all 6 campus zones.');
    }, 1200);
  };

  const handleResolve = (id) => {
    setAnomalies(anomalies.map(a => a.id === id ? { ...a, status: 'RESOLVED', slaRemaining: 'Resolved' } : a));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Anomaly Detection & Dispatch Engine</h1>
          <p className="text-gray-500 mt-1">Rule-based statistical thresholding (&gt;1.25x baseline) and automated maintenance ticket dispatching.</p>
        </div>

        <button
          onClick={handleTriggerScan}
          disabled={scanning}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md transition disabled:opacity-50"
        >
          <Play size={16} className={scanning ? 'animate-spin' : ''} />
          {scanning ? 'Evaluating Baselines...' : 'Trigger Anomaly Scan'}
        </button>
      </div>

      {scanMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium animate-in fade-in">
          ✓ {scanMessage}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Active Alerts</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">
            {anomalies.filter(a => a.status === 'OPEN').length}
          </div>
          <div className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
            <ShieldAlert size={14} /> Immediate intervention needed
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Auto-Dispatched Work Orders</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">2</div>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 font-medium">
            <Wrench size={14} /> Assigned to on-duty field teams
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Mean Time to Detect (MTTD)</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">4.2 min</div>
          <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
            ↓ 82% faster than manual audit
          </div>
        </div>
      </div>

      {/* Anomalies Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="font-bold text-gray-800 text-base">Detected Threshold Exceedances</h2>
          <span className="text-xs text-gray-500">Threshold rule: Current &gt; Baseline × 1.25</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Building Location</th>
                <th className="px-6 py-3.5">Resource</th>
                <th className="px-6 py-3.5">Telemetry vs Baseline</th>
                <th className="px-6 py-3.5">Severity</th>
                <th className="px-6 py-3.5">SLA Countdown</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {anomalies.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">{a.buildingName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                      {a.metricType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-rose-600">
                      {a.currentValue} <span className="text-xs text-gray-400 font-normal">/ {a.baseline} target</span>
                    </div>
                    <div className="text-[11px] text-rose-500 font-semibold">+{a.pctOver}% above baseline</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      a.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                      a.severity === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {a.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className={a.status === 'OPEN' ? 'text-amber-500' : 'text-gray-400'} />
                      {a.slaRemaining}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      a.status === 'OPEN' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {a.status === 'OPEN' ? (
                      <button
                        onClick={() => handleResolve(a.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1">
                        <CheckCircle2 size={14} /> Closed
                      </span>
                    )}
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

