import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingDown, Leaf, TreePine } from 'lucide-react';
import FloatingLeaves from './FloatingLeaves';

const backgroundImages = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80'
];

const environmentalThoughts = [
  "The clearest way into the Universe is through a forest wilderness. — John Muir",
  "Nature does not hurry, yet everything is accomplished. — Lao Tzu",
  "To leave the world better than you found it, that is the core of sustainability.",
  "He who plants a tree plants a hope. — Lucy Larcom",
  "Clean energy is not just a technology; it is our promise to the future."
];

export default function Hero({ carbonScore, co2Saved }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden leaf-pattern">
      {/* Dynamic Background Slideshow (Increased opacity for higher visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[currentImg]})` }}
          />
        </AnimatePresence>
        
        {/* Soft, translucent emerald/sky radial gradient to blend the images and preserve text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-slate-50/40 to-sky-50/30" />
      </div>
      
      {/* Interactive floating leaves component */}
      <FloatingLeaves />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm"
            >
              <TreePine className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>AI-Powered Sustainability for a Greener Tomorrow</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Track Your <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">Carbon Footprint.</span><br />
              Build a Greener Future.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              AI-powered insights that help you understand, reduce, and offset your environmental impact through simple daily actions.
            </motion.p>

            {/* Environmental Thought Box (Fades dynamically alongside background images) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-2xl mx-auto lg:mx-0 glass p-5 rounded-2xl border border-emerald-500/20 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">Eco Thought</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentImg}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.6 }}
                  className="text-slate-600 text-sm font-medium italic leading-relaxed"
                >
                  "{environmentalThoughts[currentImg]}"
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#calculator"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                Calculate My Footprint
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Interactive Cards Display (Visual right side) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] lg:max-w-none">
              
              {/* Decorative background glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-400 to-sky-400 opacity-20 blur-3xl -z-10" />

              {/* Carbon Score Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="glass rounded-3xl p-6 shadow-xl mb-6 border border-white/40 flex items-center justify-between hover:shadow-2xl transition-all duration-300"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sustainability Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-800">{carbonScore}</span>
                    <span className="text-emerald-600 font-bold text-sm">/100</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Better than 74% of global users</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </motion.div>

              {/* CO2 Saved Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="glass rounded-3xl p-6 shadow-xl mb-6 border border-white/40 flex items-center justify-between hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 border border-sky-500/20">
                  <TrendingDown className="w-8 h-8" />
                </div>
                <div className="space-y-2 text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CO₂ Saved This Month</span>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-4xl font-extrabold text-slate-800">{co2Saved}</span>
                    <span className="text-sky-600 font-bold text-sm">kg</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Equivalent to planting 3.2 trees</p>
                </div>
              </motion.div>

              {/* Sustainability Progress Chart Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="glass rounded-3xl p-6 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Daily Goals Progress</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Active</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Low Carbon Commute</span>
                      <span className="font-semibold text-slate-700">100%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 1 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Energy Conservation</span>
                      <span className="font-semibold text-slate-700">75%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Plant-based Meals</span>
                      <span className="font-semibold text-slate-700">50%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
