import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Eye, ShieldCheck, Compass } from 'lucide-react';

const values = [
  {
    icon: Compass,
    title: 'Data Transparency',
    description: 'We demystify carbon accounting by breaking emissions down into simple, verifiable calculations.'
  },
  {
    icon: ShieldCheck,
    title: 'Individual Agency',
    description: 'We believe personal habits aggregate to produce substantial, global environmental transformations.'
  },
  {
    icon: Eye,
    title: 'Future-Driven AI',
    description: 'We utilize localized heuristic intelligence to provide real-time recommendations for reduction and offsetting.'
  }
];

export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Mission Left Text */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Our Core Mission</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Environmental Action Through Technology
              </p>
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 rounded-full mt-2" />
            </div>

            <p className="text-slate-600 text-lg font-normal leading-relaxed">
              Empowering individuals to make environmentally responsible decisions through technology, awareness, and AI-driven sustainability insights.
            </p>

            <p className="text-slate-600 text-sm font-normal leading-relaxed">
              Climate action often feels abstract or overwhelming. EcoTrack AI was created to solve this by transforming environmental responsibility into an interactive, visual, and rewarding roadmap. By combining clear mathematical metrics with small, action-focused daily challenges, we help you understand your footprint and make meaningful adjustments.
            </p>

            {/* Custom leaf bullet */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-700">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Every gram of CO₂ saved counts</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Reducing AC use, preparing plant-based meals, and choosing green transit builds the foundation for carbon neutrality.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Right Cards Grid */}
          <div className="lg:col-span-6 space-y-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/10 hover:shadow-lg transition-all duration-300 flex gap-5 items-start"
                >
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/50 text-emerald-600 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors duration-200">
                      {val.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-normal leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
