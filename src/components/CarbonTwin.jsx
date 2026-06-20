import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, ArrowRight, ShieldCheck, Zap, Activity, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CarbonTwin({ results }) {
  const currentEmissions = results ? results.yearlyTotal : 4500; // in kg CO2/year
  const currentScore = results ? results.score : 73;

  // Convert kg to tons for cleaner numbers
  const currentTons = parseFloat((currentEmissions / 1000).toFixed(2));
  
  // Future projections based on behavior change
  const projected6moNoChange = parseFloat((currentTons * 0.98).toFixed(2)); // slight auto-decline
  const projected1yrNoChange = parseFloat((currentTons * 0.95).toFixed(2));
  
  const projected6moEco = parseFloat((currentTons * 0.72).toFixed(2)); // 28% reduction
  const projected1yrEco = parseFloat((currentTons * 0.58).toFixed(2)); // 42% reduction

  const projectionData = [
    {
      name: 'Current State',
      'No Change': currentTons,
      'Eco Habits Adopted': currentTons
    },
    {
      name: '6 Months Forecast',
      'No Change': projected6moNoChange,
      'Eco Habits Adopted': projected6moEco
    },
    {
      name: '1 Year Forecast',
      'No Change': projected1yrNoChange,
      'Eco Habits Adopted': projected1yrEco
    }
  ];

  return (
    <section id="carbontwin" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Predictive Analytics</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Your Digital Carbon Twin
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            EcoTrack AI creates a real-time behavioral clone that simulates future emission forecasting based on your lifestyle choices.
          </p>
        </div>

        {/* Twins Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Current Carbon Twin */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <User className="w-32 h-32 text-slate-900" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base leading-none">Current Twin</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Baseline</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Annual Carbon Footprint</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-slate-800">{currentTons}</span>
                    <span className="text-slate-500 font-bold text-sm">tons CO₂e</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Eco Score</span>
                    <span className="text-lg font-extrabold text-slate-700 mt-1 block">{currentScore}/100</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Habit Status</span>
                    <span className={`text-xs font-bold mt-2 block ${currentScore >= 75 ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {currentScore >= 75 ? 'Eco Balanced' : 'Action Needed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed mt-6 border-t border-slate-200/50 pt-4 font-medium flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>Reflects carbon generated from daily transport, meat diets, and home energy.</span>
            </p>
          </div>

          {/* Connect Arrow Visual (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-slate-300">
            <ArrowRight className="w-8 h-8 animate-pulse" />
          </div>

          {/* Future Carbon Twin */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            {/* Animated neon scan-lines or holographic grids in CSS */}
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="space-y-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-none">Holographic Future Twin</h3>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">AI Forecast Simulation</span>
                  </div>
                </div>
                
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
                  Predictive Mode
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Predictions list */}
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Predicted Footprint (1 Year)</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-emerald-400">{projected1yrEco}</span>
                      <span className="text-xs text-slate-400 font-bold">Tons CO₂e</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-500">Possible 42% Reduction!</span>
                  </div>

                  <div className="space-y-1.5 border-t border-slate-800 pt-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Baseline projection (No change)</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-rose-400">{projected1yrNoChange}</span>
                      <span className="text-xs text-slate-400 font-semibold">Tons CO₂e</span>
                    </div>
                  </div>
                </div>

                {/* AI story block */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-center space-y-3">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-widest flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    AI Action Scenario
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    "Based on current habits, your annual footprint may reach <span className="font-bold text-white">{currentTons} tons</span> of CO₂. If you adopt recommended actions, your footprint can be reduced to <span className="font-bold text-emerald-400">{projected1yrEco} tons</span>."
                  </p>
                </div>

              </div>
            </div>

            {/* Micro comparison progress bar */}
            <div className="mt-8 border-t border-slate-800 pt-6 space-y-2 z-10">
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>Carbon Twin Optimization Rate</span>
                <span className="text-emerald-400">42% Offset Potential</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '42%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full" 
                />
              </div>
            </div>

          </div>

        </div>

        {/* Forecast Graph (Recharts BarChart) */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Carbon Forecasting Comparison (Tons CO₂)</h4>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#FFFFFF'
                  }}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: '500' }} />
                <Bar dataKey="No Change" fill="#F87171" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Eco Habits Adopted" fill="#34D399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
