import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bus, 
  Bike, 
  Zap, 
  Sun, 
  Utensils, 
  Leaf, 
  Droplet, 
  ShoppingBag,
  Award,
  CheckCircle
} from 'lucide-react';

const iconMap = {
  Bus,
  Bike,
  Zap,
  Sun,
  Utensils,
  Leaf,
  Droplet,
  ShoppingBag
};

export default function Recommendations({ recommendations, onAcceptChallenge }) {
  const [acceptedIds, setAcceptedIds] = useState(new Set());

  const handleAccept = (rec) => {
    if (acceptedIds.has(rec.id)) return;
    
    // Add to accepted set
    const updated = new Set(acceptedIds);
    updated.add(rec.id);
    setAcceptedIds(updated);

    // Trigger parent callback to increase eco points
    if (onAcceptChallenge) {
      onAcceptChallenge(rec.points);
    }
  };

  return (
    <section id="recommendations" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">AI Coach & Recommendations</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Personalized Sustainable Action Plan
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Based on your calculated footprint, our AI engine suggests these action items. Complete them to earn eco points!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((rec) => {
            const Icon = iconMap[rec.iconName] || Leaf;
            const isAccepted = acceptedIds.has(rec.id);

            return (
              <motion.div
                key={rec.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`group relative p-6 sm:p-8 rounded-3xl border shadow-sm transition-all duration-300 ${
                  isAccepted
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-emerald-50'
                    : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:shadow-lg'
                }`}
              >
                {/* Header Tag and Points */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    rec.impact.includes('High') 
                      ? 'bg-rose-50 border-rose-200 text-rose-700' 
                      : rec.impact.includes('Medium')
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    {rec.category} • {rec.impact}
                  </span>
                  
                  <div className="flex items-center gap-1 font-extrabold text-sm text-emerald-600">
                    <Award className="w-4 h-4 text-emerald-500 animate-bounce" />
                    <span>+{rec.points} Pts</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex gap-4 items-start mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isAccepted ? 'bg-emerald-500 text-white' : 'bg-white text-slate-700 shadow-sm border border-slate-200/50'
                  } group-hover:scale-105 transition-transform duration-200 shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                      {rec.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-normal leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>

                {/* Footer action button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={isAccepted}
                    onClick={() => handleAccept(rec)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                      isAccepted
                        ? 'bg-emerald-500 text-white shadow-emerald-100 cursor-default'
                        : 'bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-emerald-200 hover:-translate-y-0.5'
                    }`}
                  >
                    {isAccepted ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Accepted! Challenge Started</span>
                      </>
                    ) : (
                      <>
                        <span>{rec.actionText}</span>
                        <span className="text-xs">→</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
