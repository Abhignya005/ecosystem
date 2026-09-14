import React, { useState } from 'react';
import { Building2, Zap, Droplets, AlertTriangle, X, CheckCircle2, ShieldAlert } from 'lucide-react';

const CAMPUS_BUILDINGS = [
  {
    id: 'b-1',
    name: 'Science & Engineering Complex',
    type: 'Academic / Lab',
    capacity: 1200,
    score: 88,
    status: 'OPTIMAL', // Green
    color: '#10b981',
    coords: { x: 80, y: 70, width: 140, height: 90 },
    metrics: { energy: 340, baselineEnergy: 380, water: 95, baselineWater: 110, co2Tons: 278.8 },
    tickets: []
  },
  {
    id: 'b-2',
    name: 'Central Library & Learning Hub',
    type: 'Library',
    capacity: 850,
    score: 94,
    status: 'OPTIMAL', // Green
    color: '#10b981',
    coords: { x: 260, y: 50, width: 130, height: 80 },
    metrics: { energy: 160, baselineEnergy: 210, water: 45, baselineWater: 60, co2Tons: 131.2 },
    tickets: []
  },
  {
    id: 'b-3',
    name: 'Oak Ridge Student Residence (Hostel A)',
    type: 'Residential Dorm',
    capacity: 650,
    score: 64,
    status: 'MODERATE', // Yellow
    color: '#f59e0b',
    coords: { x: 430, y: 80, width: 130, height: 100 },
    metrics: { energy: 290, baselineEnergy: 270, water: 130, baselineWater: 120, co2Tons: 237.8 },
    tickets: [{ id: 'tk-1', type: 'Restroom Flush Valve Leak', priority: 'MEDIUM', status: 'IN_PROGRESS' }]
  },
  {
    id: 'b-4',
    name: 'Campus Dining Hall & Food Center',
    type: 'Dining',
    capacity: 900,
    score: 42,
    status: 'CRITICAL', // Red
    color: '#ef4444',
    coords: { x: 120, y: 200, width: 150, height: 95 },
    metrics: { energy: 580, baselineEnergy: 390, water: 280, baselineWater: 170, co2Tons: 475.6 },
    tickets: [
      { id: 'tk-2', type: 'HVAC Chiller Spike & Water Sump Overfill', priority: 'URGENT', status: 'OPEN' },
      { id: 'tk-3', type: 'Walk-in Freezer Thermostat Failure', priority: 'HIGH', status: 'OPEN' }
    ]
  },
  {
    id: 'b-5',
    name: 'Indoor Sports Arena & Gymnasium',
    type: 'Athletics',
    capacity: 1500,
    score: 79,
    status: 'MODERATE', // Yellow
    color: '#f59e0b',
    coords: { x: 320, y: 190, width: 160, height: 110 },
    metrics: { energy: 310, baselineEnergy: 300, water: 115, baselineWater: 105, co2Tons: 254.2 },
    tickets: []
  },
  {
    id: 'b-6',
    name: 'Pine Crest Residence (Hostel B)',
    type: 'Residential Dorm',
    capacity: 600,
    score: 91,
    status: 'OPTIMAL', // Green
    color: '#10b981',
    coords: { x: 510, y: 220, width: 120, height: 90 },
    metrics: { energy: 190, baselineEnergy: 240, water: 88, baselineWater: 110, co2Tons: 155.8 },
    tickets: []
  }
];

export default function EcoTwinMap() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const filteredBuildings = CAMPUS_BUILDINGS.filter(b => {
    if (filter === 'ALL') return true;
    return b.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Interactive Campus Eco-Twin</h1>
          <p className="text-gray-500 mt-1">Live spatial visualization of campus building performance, sustainability health, and active alerts.</p>
        </div>

        {/* Status Legend & Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm text-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2">Filter:</span>
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'ALL' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All (6)
          </button>
          <button
            onClick={() => setFilter('OPTIMAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${filter === 'OPTIMAL' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Optimal (3)
          </button>
          <button
            onClick={() => setFilter('MODERATE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${filter === 'MODERATE' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-50'}`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Moderate (2)
          </button>
          <button
            onClick={() => setFilter('CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${filter === 'CRITICAL' ? 'bg-rose-600 text-white' : 'text-rose-700 hover:bg-rose-50'}`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Anomaly / Critical (1)
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-4 left-6 z-10 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="text-xs font-mono uppercase tracking-widest text-slate-300">Live Campus GIS Layer • 2D Spatial Mesh</span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center py-4">
          <svg viewBox="0 0 700 350" className="w-full max-w-4xl h-auto select-none">
            {/* Campus Ground Layout Grid */}
            <defs>
              <pattern id="campusGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="700" height="350" fill="url(#campusGrid)" rx="16" />

            {/* Campus Pathways */}
            <path d="M 150 115 L 260 90 L 430 130 L 510 265" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="8" fill="none" strokeDasharray="6 4" />
            <path d="M 195 200 L 195 160 L 320 245" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="8" fill="none" strokeDasharray="6 4" />

            {/* Buildings */}
            {filteredBuildings.map((b) => {
              const isSelected = selectedBuilding?.id === b.id;
              return (
                <g
                  key={b.id}
                  onClick={() => setSelectedBuilding(b)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-105"
                  style={{ transformOrigin: `${b.coords.x + b.coords.width / 2}px ${b.coords.y + b.coords.height / 2}px` }}
                >
                  {/* Outer Glow on High Severity or Selected */}
                  {b.status === 'CRITICAL' && (
                    <rect
                      x={b.coords.x - 4}
                      y={b.coords.y - 4}
                      width={b.coords.width + 8}
                      height={b.coords.height + 8}
                      rx="14"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      className="animate-pulse"
                      opacity="0.75"
                    />
                  )}

                  {/* Main Building Body */}
                  <rect
                    x={b.coords.x}
                    y={b.coords.y}
                    width={b.coords.width}
                    height={b.coords.height}
                    rx="12"
                    fill={isSelected ? '#38bdf8' : b.color}
                    fillOpacity={isSelected ? 0.95 : 0.85}
                    stroke={isSelected ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-all"
                  />

                  {/* Building Label */}
                  <text
                    x={b.coords.x + b.coords.width / 2}
                    y={b.coords.y + b.coords.height / 2 - 10}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {b.name.split(' ')[0]} {b.name.split(' ')[1]}
                  </text>

                  {/* Sustainability Score Badge */}
                  <rect
                    x={b.coords.x + b.coords.width / 2 - 26}
                    y={b.coords.y + b.coords.height / 2 + 6}
                    width="52"
                    height="18"
                    rx="9"
                    fill="rgba(0,0,0,0.5)"
                  />
                  <text
                    x={b.coords.x + b.coords.width / 2}
                    y={b.coords.y + b.coords.height / 2 + 19}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="600"
                    className="pointer-events-none"
                  >
                    Score: {b.score}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="text-center text-xs text-slate-400 mt-2">
          Click any building to inspect live utility telemetry, carbon intensity, and dispatched maintenance work orders.
        </div>
      </div>

      {/* Building Drill-Down Modal */}
      {selectedBuilding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100 text-green-700">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedBuilding.name}</h3>
                  <p className="text-xs text-gray-500">{selectedBuilding.type} • Capacity: {selectedBuilding.capacity} occupants</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBuilding(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Score & Status Banner */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="text-xs text-gray-500 font-medium">Eco Sustainability Index</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedBuilding.score} / 100</div>
                </div>
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                    selectedBuilding.status === 'OPTIMAL' ? 'bg-emerald-100 text-emerald-800' :
                    selectedBuilding.status === 'MODERATE' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {selectedBuilding.status === 'OPTIMAL' ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />}
                    {selectedBuilding.status}
                  </span>
                </div>
              </div>

              {/* Resource Breakdown Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <Zap size={16} /> Electricity
                  </div>
                  <div className="text-xl font-extrabold text-gray-800">{selectedBuilding.metrics.energy} <span className="text-xs font-normal text-gray-500">kWh</span></div>
                  <div className="text-xs text-gray-500 mt-1">Baseline: {selectedBuilding.metrics.baselineEnergy} kWh</div>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <Droplets size={16} /> Water Usage
                  </div>
                  <div className="text-xl font-extrabold text-gray-800">{selectedBuilding.metrics.water} <span className="text-xs font-normal text-gray-500">kL</span></div>
                  <div className="text-xs text-gray-500 mt-1">Baseline: {selectedBuilding.metrics.baselineWater} kL</div>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                    🌱 Carbon Impact
                  </div>
                  <div className="text-xl font-extrabold text-gray-800">{selectedBuilding.metrics.co2Tons} <span className="text-xs font-normal text-gray-500">t CO2e</span></div>
                  <div className="text-xs text-gray-500 mt-1">Scope 1 & 2 Equiv</div>
                </div>
              </div>

              {/* Pending Maintenance Tickets */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" /> Active Maintenance Work Orders
                </h4>
                {selectedBuilding.tickets.length === 0 ? (
                  <div className="p-4 text-center rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500">
                    No open maintenance tickets. Building is performing stably.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedBuilding.tickets.map(t => (
                      <div key={t.id} className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{t.type}</div>
                          <div className="text-xs text-gray-500">Work Order #{t.id}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-rose-200 text-rose-800">{t.priority}</span>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-gray-200 text-gray-700">{t.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedBuilding(null)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

