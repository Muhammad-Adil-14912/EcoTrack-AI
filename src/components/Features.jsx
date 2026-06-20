import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Activity, 
  Sparkles, 
  Target, 
  BarChart3, 
  Trophy 
} from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'AI Carbon Calculator',
    description: 'Calculate your carbon footprint based on transport, energy consumption, food habits, and lifestyle factors.',
    color: 'from-emerald-500 to-green-400',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-700'
  },
  {
    icon: Activity,
    title: 'Activity Tracker',
    description: 'Track daily activities and monitor your environmental impact over time with our dynamic, interactive logger.',
    color: 'from-sky-500 to-indigo-400',
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-700'
  },
  {
    icon: Sparkles,
    title: 'AI Sustainability Coach',
    description: 'Receive personalized recommendations and real-time guidance to reduce emissions and adopt greener habits.',
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-700'
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set custom sustainability milestones, track progress, and celebrate your green achievements.',
    color: 'from-teal-500 to-emerald-400',
    bgColor: 'bg-teal-500/10',
    textColor: 'text-teal-700'
  },
  {
    icon: BarChart3,
    title: 'Carbon Insights Dashboard',
    description: 'Visualize trends, access comprehensive analytics, and understand your primary emission sources.',
    color: 'from-blue-500 to-sky-400',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-700'
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description: 'Earn eco points, unlock rare badges, complete challenges, and climb the sustainability leaderboard.',
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-700'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Platform Features</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smart tools designed for environmental action
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            EcoTrack AI combines cutting-edge AI metrics with gaming dynamics to make eco-conscious living second nature.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Glowing border background */}
                <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/20 transition-all duration-500 rounded-3xl -z-10" />

                <div className="space-y-6">
                  {/* Icon container */}
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} ${feature.textColor} flex items-center justify-center border border-slate-200/50 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 font-normal text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 gap-1 cursor-pointer">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
