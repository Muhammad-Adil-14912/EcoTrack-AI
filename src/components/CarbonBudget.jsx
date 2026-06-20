import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

export default function CarbonBudget({ results }) {
  // Setup budget: 300 kg CO2 / month standard
  const budget = 300;
  const currentUsage = results ? results.monthlyTotal : 220;
  const remaining = Math.max(0, parseFloat((budget - currentUsage).toFixed(1)));
  const usagePercentage = Math.min(100, Math.round((currentUsage / budget) * 100));

  // Determine state alerts
  let status = 'normal'; // normal, alert, danger
  let message = 'Budget Stable. Good job! Your carbon savings put you on track to stay below budget.';
  
  if (usagePercentage >= 90) {
    status = 'danger';
    message = 'Critical Overrun Risk: Shifting to public transit immediately and reducing AC thermostat is required to balance your monthly budget.';
  } else if (usagePercentage >= 70) {
    status = 'alert';
    message = 'Warning: Moderate energy consumption has put you at risk of exceeding your budget by 5%. Adjust AC run times by 1 hour daily.';
  }

  const statusColors = {
    normal: {
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
      fill: 'stroke-emerald-500',
      icon: CheckCircle
    },
    alert: {
      text: 'text-amber-600',
      border: 'border-amber-200',
      bg: 'bg-amber-50',
      fill: 'stroke-amber-500',
      icon: AlertTriangle
    },
    danger: {
      text: 'text-rose-600',
      border: 'border-rose-200',
      bg: 'bg-rose-50',
      fill: 'stroke-rose-500',
      icon: ShieldAlert
    }
  };

  const currentStatusConfig = statusColors[status];
  const StatusIcon = currentStatusConfig.icon;

  return (
    <section id="budget" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Budget Allocator</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Monthly Carbon Budget System
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Manage your personal environmental impact limits. Stay below your monthly carbon budget and avoid overrun risks.
          </p>
        </div>

        {/* Budget Content Box */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Circular Progress Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="75"
                    className="stroke-slate-200"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="75"
                    className={`${currentStatusConfig.fill} transition-all duration-700 ease-out`}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={471}
                    strokeDashoffset={471 - (471 * usagePercentage) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-slate-800">{usagePercentage}%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Used</span>
                </div>
              </div>
            </div>

            {/* Budget Stats & AI warning panel */}
            <div className="md:col-span-7 space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600 animate-pulse" />
                  <span>Carbon Allowance</span>
                </h3>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Monthly Cycle</span>
              </div>

              {/* Budget indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Monthly Budget</span>
                  <span className="text-xl font-extrabold text-slate-700 mt-1 block">{budget} kg</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Current Usage</span>
                  <span className="text-xl font-extrabold text-slate-700 mt-1 block">{currentUsage} kg</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Remaining</span>
                  <span className={`text-xl font-extrabold mt-1 block ${remaining <= 30 ? 'text-rose-500' : 'text-emerald-500'}`}>{remaining} kg</span>
                </div>
              </div>

              {/* Dynamic AI Status warning box */}
              <div className={`p-5 rounded-2xl border ${currentStatusConfig.border} ${currentStatusConfig.bg} space-y-2 flex gap-4 items-start`}>
                <StatusIcon className={`w-6 h-6 ${currentStatusConfig.text} shrink-0 mt-0.5`} />
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${currentStatusConfig.text}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    AI OVERRUN RISK ASSESSMENT
                  </span>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed mt-1">
                    {message}
                  </p>
                </div>
              </div>

              {/* Suggestion list */}
              <div className="flex gap-2 items-center text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors w-max">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Adjust habits to clear budget warnings</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
