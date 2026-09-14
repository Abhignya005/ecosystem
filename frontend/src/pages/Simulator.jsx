import React, { useState } from 'react';
import { Sliders, Sun, Lightbulb, Thermometer, DollarSign, Leaf, Clock, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Simulator() {
  const [solarKw, setSolarKw] = useState(75);
  const [ledPercent, setLedPercent] = useState(80);
  const [hvacOptimization, setHvacOptimization] = useState(20);

  // Real-time calculation models
  const KWH_COST = 0.14;
  const SOLAR_ANNUAL_KWH = solarKw * 1450;
  const SOLAR_CAPEX = solarKw * 1200;

  const LED_ANNUAL_KWH = (350000 * (ledPercent / 100)) * 0.55;
  const LED_CAPEX = (ledPercent / 100) * 25000;

  const HVAC_ANNUAL_KWH = 750000 * (hvacOptimization / 100);
  const HVAC_CAPEX = 8500;

  const totalKwhSaved = Math.round(SOLAR_ANNUAL_KWH + LED_ANNUAL_KWH + HVAC_ANNUAL_KWH);
  const totalCapex = Math.round(SOLAR_CAPEX + LED_CAPEX + HVAC_CAPEX);
  const totalAnnualSavings = Math.round(totalKwhSaved * KWH_COST);
  const co2AvoidedTons = +((totalKwhSaved * 0.82) / 1000).toFixed(1);
  const paybackYears = +(totalCapex / (totalAnnualSavings || 1)).toFixed(1);

  // 5-Year Trajectory
  const trajectoryData = [
    { year: 'Baseline', netSavings: -totalCapex, annual: 0 },
    { year: 'Year 1', netSavings: totalAnnualSavings - totalCapex, annual: totalAnnualSavings },
    { year: 'Year 2', netSavings: (totalAnnualSavings * 2) - totalCapex, annual: totalAnnualSavings },
    { year: 'Year 3', netSavings: (totalAnnualSavings * 3) - totalCapex, annual: totalAnnualSavings },
    { year: 'Year 4', netSavings: (totalAnnualSavings * 4) - totalCapex, annual: totalAnnualSavings },
    { year: 'Year 5', netSavings: (totalAnnualSavings * 5) - totalCapex, annual: totalAnnualSavings },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <Sliders className="text-blue-600" size={32} /> Predictive 'What-If' Sustainability Simulator
        </h1>
        <p className="text-gray-500 mt-1">
          Interactive decision-support control panel to model capital upgrades, projected financial ROI, and CO2e abatement.
        </p>
      </div>

      {/* Control Sliders & KPI Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
            Intervention Parameters
          </h2>

          {/* Solar Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-2 text-amber-600">
                <Sun size={18} /> Rooftop Solar PV
              </span>
              <span className="text-gray-900 font-bold">{solarKw} kW</span>
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="5"
              value={solarKw}
              onChange={(e) => setSolarKw(+e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>0 kW</span>
              <span>125 kW</span>
              <span>250 kW</span>
            </div>
          </div>

          {/* LED Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-2 text-yellow-600">
                <Lightbulb size={18} /> LED Retrofit Conversion
              </span>
              <span className="text-gray-900 font-bold">{ledPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={ledPercent}
              onChange={(e) => setLedPercent(+e.target.value)}
              className="w-full accent-yellow-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>0% (Fluorescent)</span>
              <span>100% (High-Eff LED)</span>
            </div>
          </div>

          {/* HVAC Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-2 text-cyan-600">
                <Thermometer size={18} /> Smart HVAC Optimization
              </span>
              <span className="text-gray-900 font-bold">{hvacOptimization}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="2"
              value={hvacOptimization}
              onChange={(e) => setHvacOptimization(+e.target.value)}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>0% (Standard)</span>
              <span>40% (AI Setback)</span>
            </div>
          </div>
        </div>

        {/* Projected Impact Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl text-white shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-100">Annual Utility Savings</span>
              <DollarSign size={24} className="text-emerald-200" />
            </div>
            <div className="my-4">
              <div className="text-3xl font-black">${totalAnnualSavings.toLocaleString()} <span className="text-sm font-normal">/ yr</span></div>
              <div className="text-xs text-emerald-100 mt-1">Saved from {totalKwhSaved.toLocaleString()} kWh reduction</div>
            </div>
            <div className="text-[11px] text-emerald-200 bg-white/10 px-3 py-1.5 rounded-lg">
              Est. Tariff: $0.14 / kWh blended rate
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-cyan-700 p-6 rounded-2xl text-white shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-100">Carbon Abatement</span>
              <Leaf size={24} className="text-cyan-200" />
            </div>
            <div className="my-4">
              <div className="text-3xl font-black">{co2AvoidedTons} <span className="text-sm font-normal">t CO2e / yr</span></div>
              <div className="text-xs text-cyan-100 mt-1">Equivalent to planting {Math.round(co2AvoidedTons * 16)} trees</div>
            </div>
            <div className="text-[11px] text-cyan-200 bg-white/10 px-3 py-1.5 rounded-lg">
              EPA Scope 2 Emission Factor (0.82 kg/kWh)
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs uppercase tracking-wider font-bold">Estimated CapEx Investment</span>
              <TrendingUp size={20} className="text-gray-400" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold text-gray-900">${totalCapex.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">Hardware + Installation + Commissioning</div>
            </div>
            <div className="text-[11px] text-gray-400">Solar: ${SOLAR_CAPEX.toLocaleString()} • Retrofits: ${(LED_CAPEX + HVAC_CAPEX).toLocaleString()}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs uppercase tracking-wider font-bold">Project Payback Horizon</span>
              <Clock size={20} className="text-gray-400" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold text-blue-600">{paybackYears} Years</div>
              <div className="text-xs text-gray-500 mt-1">ROI break-even timeline</div>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">
              Net Positive ROI after Year {Math.ceil(paybackYears)}
            </div>
          </div>
        </div>
      </div>

      {/* Cumulative 5-Year Cash Flow Projection */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">5-Year Cumulative Financial ROI Projection</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trajectoryData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="netSavingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(v) => `$${v.toLocaleString()}`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Net Cash Flow']} />
              <Legend />
              <Area type="monotone" dataKey="netSavings" stroke="#10b981" strokeWidth={3} fill="url(#netSavingsGrad)" name="Net Cumulative Cash Flow ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

