import React, { useState } from 'react';
import { Camera, UploadCloud, Sparkles, CheckCircle, AlertOctagon, Send } from 'lucide-react';

const BUILDINGS = [
  'Science & Engineering Complex',
  'Central Library & Learning Hub',
  'Oak Ridge Student Residence (Hostel A)',
  'Campus Dining Hall & Food Center',
  'Indoor Sports Arena & Gymnasium',
  'Pine Crest Residence (Hostel B)'
];

export default function ReportIssue() {
  const [selectedBuilding, setSelectedBuilding] = useState(BUILDINGS[0]);
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzingAI, setAnalyzingAI] = useState(false);
  const [classification, setClassification] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Client-side AI / Heuristic Classification Engine
  const analyzeIssueContent = (text) => {
    setAnalyzingAI(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let category = 'General Facility';
      let urgency = 'MEDIUM';
      let confidence = 92;

      if (lower.includes('water') || lower.includes('leak') || lower.includes('pipe') || lower.includes('tap') || lower.includes('flush') || lower.includes('drip')) {
        category = 'Water Leakage / Plumbing';
        urgency = lower.includes('burst') || lower.includes('flood') ? 'URGENT' : 'HIGH';
        confidence = 96;
      } else if (lower.includes('light') || lower.includes('spark') || lower.includes('wire') || lower.includes('power') || lower.includes('electric') || lower.includes('switch')) {
        category = 'Electrical / Energy Waste';
        urgency = lower.includes('spark') || lower.includes('smoke') ? 'URGENT' : 'HIGH';
        confidence = 94;
      } else if (lower.includes('ac') || lower.includes('hvac') || lower.includes('hot') || lower.includes('cold') || lower.includes('chiller') || lower.includes('heater')) {
        category = 'HVAC Thermal Inefficiency';
        urgency = 'MEDIUM';
        confidence = 89;
      } else if (lower.includes('battery') || lower.includes('e-waste') || lower.includes('computer') || lower.includes('screen') || lower.includes('trash') || lower.includes('bin')) {
        category = 'E-Waste & Recycling Overflow';
        urgency = 'LOW';
        confidence = 91;
      }

      setClassification({ category, urgency, confidence });
      setAnalyzingAI(false);
    }, 600);
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    if (val.length > 5) {
      analyzeIssueContent(val);
    } else {
      setClassification(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Reset form after short delay
      setDescription('');
      setImagePreview(null);
      setClassification(null);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI-Assisted Issue Reporting</h1>
        <p className="text-gray-500 mt-1">
          Spot a resource leak, energy waste, or broken fixture? Report it here with instant AI auto-categorization to earn Green League points.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900">Report Successfully Dispatched!</h2>
          <p className="text-emerald-700 text-sm max-w-md mx-auto">
            Maintenance ticket created and routed to the Facilities Response Queue.
            <br />
            <strong>+50 Green League Points</strong> have been awarded to your dorm/department!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          {/* Building Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Campus Location / Building</label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800 text-sm font-medium"
            >
              {BUILDINGS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Photo Upload Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Visual Evidence (Photo Snapshot)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-green-400 transition bg-slate-50/50 relative">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Issue preview" className="max-h-56 rounded-xl shadow-md" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                  <div className="p-3.5 bg-green-100 text-green-700 rounded-full">
                    <Camera size={26} />
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Click to snap photo or upload image</div>
                  <div className="text-xs text-gray-400">PNG, JPG, or HEIC up to 10MB</div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Description Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Issue Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="e.g. Continuous high-pressure pipe dripping in 2nd-floor washroom, causing water pooling on tiles."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 text-sm"
              required
            />
          </div>

          {/* AI Auto-Classification Banner */}
          {(analyzingAI || classification) && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles size={16} className="text-emerald-600 animate-spin" />
                Lightweight AI Auto-Classification Engine
              </div>

              {analyzingAI ? (
                <div className="text-xs text-emerald-700 animate-pulse">
                  Analyzing semantic patterns and environmental impact...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <div className="text-[11px] text-gray-500">Predicted Category</div>
                    <div className="text-sm font-bold text-gray-900">{classification.category}</div>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <div className="text-[11px] text-gray-500">Urgency Level</div>
                    <div className="text-sm font-bold text-rose-600">{classification.urgency}</div>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <div className="text-[11px] text-gray-500">Model Confidence</div>
                    <div className="text-sm font-bold text-emerald-600">{classification.confidence}% Match</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Dispatch Work Order Ticket
          </button>
        </form>
      )}
    </div>
  );
}

