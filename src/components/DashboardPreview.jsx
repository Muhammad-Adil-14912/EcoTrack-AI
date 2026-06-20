import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingDown, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Target 
} from 'lucide-react';

export default function DashboardPreview({ results, ecoPoints }) {
  // Generate 6-month historical/trend data relative to the current monthly emission
  const currentMonthlyTotal = results ? results.monthlyTotal : 300;
  
  // Historical trend data (simulating that the user is steadily reducing emissions)
  const trendData = [
    { month: 'Jan', emissions: parseFloat((currentMonthlyTotal * 1.30).toFixed(1)), saved: 0 },
    { month: 'Feb', emissions: parseFloat((currentMonthlyTotal * 1.22).toFixed(1)), saved: 25 },
    { month: 'Mar', emissions: parseFloat((currentMonthlyTotal * 1.15).toFixed(1)), saved: 48 },
    { month: 'Apr', emissions: parseFloat((currentMonthlyTotal * 1.08).toFixed(1)), saved: 70 },
    { month: 'May', emissions: parseFloat((currentMonthlyTotal * 1.02).toFixed(1)), saved: 95 },
    { month: 'Jun', emissions: parseFloat(currentMonthlyTotal.toFixed(1)), saved: 125 }
  ];

  return (
    <section id="dashboard" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative colored glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-400 uppercase tracking-widest">Analytics Dashboard</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real-time Sustainability Insights
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-500 to-sky-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-400 font-normal">
            Track your sustainability roadmap, monitor carbon reduction trends, and check your earned rewards.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-dark rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/5 space-y-8">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Dashboard Preview</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <span>Personal Footprint Console</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-widest">Live</span>
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Eco Points Counter */}
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <Award className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Eco Balance</span>
                  <span className="text-sm font-extrabold text-emerald-400">{ecoPoints} Points</span>
                </div>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <Flame className="w-5 h-5 text-amber-500" />
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Activity Streak</span>
                  <span className="text-sm font-extrabold text-amber-500">7 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Widget 1: Carbon Emission Trend Chart (Line Chart) */}
            <div className="lg:col-span-8 bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-white text-sm">Carbon Emission Trend</h4>
                  <p className="text-xs text-slate-400 mt-0.5">6-month monthly emissions comparison (kg CO₂)</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Down 23%</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.4)" fontSize={11} tickLine={false} />
                    <YAxis stroke="rgba(255, 255, 255, 0.4)" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '16px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke="#10B981" 
                      strokeWidth={3} 
                      dot={{ r: 4, strokeWidth: 2, stroke: '#10B981', fill: '#0F172A' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 2: Sustainability Score Gauge/Card */}
            <div className="lg:col-span-4 bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Sustainability Score Card</h4>
                <p className="text-xs text-slate-400 mt-0.5">Calculated score based on current daily footprint</p>
              </div>

              <div className="my-8 flex flex-col items-center justify-center space-y-4">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-emerald-500/30 flex items-center justify-center relative">
                  {/* Decorative glowing gradient circle */}
                  <div className="absolute inset-2 bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 rounded-full blur-sm" />
                  
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="text-4xl font-extrabold text-emerald-400">{results ? results.score : 75}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Eco Index</span>
                  </div>
                </div>
                
                <span className="text-xs text-slate-300 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Rating: {results && results.score >= 80 ? 'Eco Warrior' : results && results.score >= 50 ? 'Eco Defender' : 'Eco Starter'}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-normal leading-relaxed text-center">
                Keep daily emissions below 10 kg CO₂ to boost your Eco Index above 80!
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Widget 3: Monthly Progress Graph (Area Chart of Saved CO2) */}
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-white text-sm">CO₂ Saved Cumulative (kg)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Aggregated carbon reduction this year</p>
                </div>
                <Calendar className="w-5 h-5 text-sky-400" />
              </div>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.4)" fontSize={11} tickLine={false} />
                    <YAxis stroke="rgba(255, 255, 255, 0.4)" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '16px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="saved" 
                      stroke="#0EA5E9" 
                      fillOpacity={1} 
                      fill="url(#colorSaved)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 4: Goal Completion Tracker */}
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-white text-sm">Goal Completion Progress</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Active goals based on accepted recommendations</p>
                </div>
                <Target className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Eco-Commute (Use Train/Bus)', progress: 80, color: 'bg-emerald-500' },
                  { name: 'Home Thermostat Calibration', progress: 100, color: 'bg-sky-500' },
                  { name: 'Two Plant-based meals/week', progress: 40, color: 'bg-amber-500' },
                  { name: 'Zero Plastic Shopping Bags', progress: 90, color: 'bg-emerald-500' }
                ].map((goal, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${goal.progress === 100 ? 'text-emerald-400' : 'text-slate-500'}`} />
                        {goal.name}
                      </span>
                      <span className="text-white">{goal.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${goal.color} rounded-full`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
