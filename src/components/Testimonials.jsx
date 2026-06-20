import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "EcoTrack AI helped me reduce my monthly carbon emissions by 18% in just 4 weeks! The calculator visualizes emissions in a way that actually motivates change.",
    name: "Sarah Jenkins",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    quote: "The gamified challenges and eco points system keeps me highly motivated. I have switched my daily commutes to trains and buses, saving 80kg of CO2.",
    name: "David Kim",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    quote: "I love the AI Coach recommendations. They are extremely practical, like modifying water temperatures or saving energy, rather than impossible lifestyle overhauls.",
    name: "Elena Rostova",
    role: "Sustainability Activist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-emerald-50/10 to-sky-50/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Testimonials</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Eco-Conscious Builders
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            See how EcoTrack AI empowers users to measure their impact, adapt their routines, and reduce global emissions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass rounded-3xl p-8 shadow-md border border-white/50 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote icon overlay */}
              <Quote className="absolute right-6 top-6 w-16 h-16 text-emerald-600/5 -z-10" />

              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 stroke-none" />
                  ))}
                </div>

                <p className="text-slate-600 font-medium italic text-sm leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100/50">
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/20"
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{test.name}</h4>
                  <p className="text-xs font-semibold text-slate-400">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
