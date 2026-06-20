import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, DollarSign, Leaf, Zap, Bike } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WhatIfSimulator() {
  const [ledPercent, setLedPercent] = useState(0);
  const [cyclingDays, setCyclingDays] = useState(0);
  const [veganMeals, setVeganMeals] = useState(0);

  // Carbon savings calculation (monthly equivalent in kg CO2)
  const ledSavings = parseFloat((120 * 0.15 * (ledPercent / 100)).toFixed(1)); // base 120 kWh lighting
  const cyclingSavings = parseFloat((15 * 0.18 * cyclingDays * 4.3).toFixed(1)); // base 15km travel, petrol factor
  const veganSavings = parseFloat((veganMeals * 1.45 * 4.3).toFixed(1)); // 1.45kg saved per plant-based meal

  const totalCarbonSavings = parseFloat((ledSavings + cyclingSavings + veganSavings).toFixed(1));

  // Financial savings calculation (monthly in USD)
  const ledCash = parseFloat((ledSavings * 0.35).toFixed(1)); // $0.35 per kg CO2 lighting equivalent saved
  const cyclingCash = parseFloat((15 * cyclingDays * 4.3 * 0.15).toFixed(1)); // $0.15/km fuel cost
  const veganCash = parseFloat((veganMeals * 1.8 * 4.3).toFixed(1)); // $1.8 saved per meal

  const totalCashSavings = parseFloat((ledCash + cyclingCash + veganCash).toFixed(1));

  // Tree equivalency (1 tree offsets ~20kg CO2 per year, or 1.67kg CO2 per month)
  const treesEquivalent = parseFloat((totalCarbonSavings / 1.67).toFixed(1));

  const chartData = [
    { name: 'LED Bulbs', value: ledSavings, fill: '#FACC15' },
    { name: 'Commute Bike', value: cyclingSavings, fill: '#38BDF8' },
    { name: 'Diet Change', value: veganSavings, fill: '#4CAF50' }
  ];

  return (
    <section id="simulator" className="py-24 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Decision Modeling</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What-If Carbon Simulator
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Adjust the sliders to simulate personal environmental decisions and instantly calculate emissions offset, financial savings, and tree equivalence.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sliders Control Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span>Simulate Decisions</span>
            </h3>

            {/* LED Bulb Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Replace bulbs with LEDs</span>
                </label>
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                  {ledPercent}% Conversion
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={ledPercent * 10} // scale to slider
                onChange={(e) => setLedPercent(Math.round(e.target.value / 10))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0% LEDs</span>
                <span>50% conversion</span>
                <span>100% LED bulbs</span>
              </div>
            </div>

            {/* Cycling Commute Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Bike className="w-4 h-4 text-sky-500" />
                  <span>Cycle instead of driving</span>
                </label>
                <span className="text-xs font-bold text-sky-500 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                  {cyclingDays} Days / Week
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={cyclingDays}
                onChange={(e) => setCyclingDays(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0 Days</span>
                <span>3 Days</span>
                <span>7 Days (Daily Commute)</span>
              </div>
            </div>

            {/* Plant-Based Meal Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  <span>Plant-based meal adjustment</span>
                </label>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {veganMeals} meals / week
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="21"
                step="1"
                value={veganMeals}
                onChange={(e) => setVeganMeals(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0 meals (Meat basis)</span>
                <span>10 meals</span>
                <span>21 meals (Full Vegan)</span>
              </div>
            </div>

          </div>

          {/* Savings & Chart Panel */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Metric outputs */}
            <div className="grid grid-cols-3 gap-4">
              
              {/* Carbon saved */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between items-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Carbon Saved</span>
                <span className="text-2xl font-extrabold text-emerald-600">{totalCarbonSavings}</span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase block">kg CO₂ / mo</span>
              </div>

              {/* Cash saved */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between items-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Cash Saved</span>
                <div className="flex items-center text-2xl font-extrabold text-slate-800">
                  <DollarSign className="w-5 h-5 text-slate-500 shrink-0 -mr-0.5" />
                  <span>{totalCashSavings}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase block">USD / mo</span>
              </div>

              {/* Trees saved */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between items-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Trees Saved</span>
                <span className="text-2xl font-extrabold text-sky-600">{treesEquivalent}</span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase block">Trees / mo</span>
              </div>

            </div>

            {/* Savings contribution Chart */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 mb-6 uppercase tracking-wider">Carbon Savings Contribution (kg CO₂/mo)</h4>
              
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
                    <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
