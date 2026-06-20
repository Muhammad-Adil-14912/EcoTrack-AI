import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Leaf, Trees, CheckSquare, Award } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 1.5, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const endValue = parseFloat(value);
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const stats = [
  {
    icon: Leaf,
    label: 'Total CO₂ Saved',
    value: 84320,
    suffix: ' kg',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10'
  },
  {
    icon: Users,
    label: 'Active Eco-Warriors',
    value: 12450,
    suffix: '+',
    color: 'text-sky-600',
    bgColor: 'bg-sky-500/10'
  },
  {
    icon: Trees,
    label: 'Trees Equivalent Saved',
    value: 3840,
    suffix: '',
    color: 'text-teal-600',
    bgColor: 'bg-teal-500/10'
  },
  {
    icon: CheckSquare,
    label: 'Challenges Completed',
    value: 24900,
    suffix: '',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10'
  }
];

export default function CommunityImpact() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Community Impact</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Collective Conservation Stats
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Real progress happens when individuals take action together. Here is what the EcoTrack AI community has achieved.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-emerald-500/10 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.color} flex items-center justify-center border border-slate-200/50 mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight block">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>

                <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mt-3 block">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
