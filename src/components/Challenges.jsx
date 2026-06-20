import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldAlert, Check, Users, Leaf, ArrowRight } from 'lucide-react';

const initialChallenges = [
  {
    id: 'ch-1',
    title: 'Bike to Work Week',
    description: 'Commit to cycling or walking for all daily work/school commutes this week.',
    difficulty: 'Medium',
    points: 300,
    participants: 1240,
    tags: ['Commute', 'Health']
  },
  {
    id: 'ch-2',
    title: 'Plastic-Free Challenge',
    description: 'Avoid single-use plastics for 7 days. Use reusable bottles, bags, and containers.',
    difficulty: 'Easy',
    points: 150,
    participants: 3410,
    tags: ['Waste Reduction']
  },
  {
    id: 'ch-3',
    title: 'Energy Saving Challenge',
    description: 'Reduce home electricity by turning off standby appliances and cutting AC usage.',
    difficulty: 'Medium',
    points: 250,
    participants: 1980,
    tags: ['Energy']
  },
  {
    id: 'ch-4',
    title: 'Plant a Tree Challenge',
    description: 'Plant a tree in your garden or donate to a certified reforestation project.',
    difficulty: 'Hard',
    points: 500,
    participants: 840,
    tags: ['Biodiversity', 'Offset']
  }
];

export default function Challenges({ onJoinChallenge }) {
  const [joinedIds, setJoinedIds] = useState(new Set());

  const handleJoin = (challenge) => {
    if (joinedIds.has(challenge.id)) return;
    
    const updated = new Set(joinedIds);
    updated.add(challenge.id);
    setJoinedIds(updated);

    if (onJoinChallenge) {
      onJoinChallenge(challenge.points);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'Medium':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Hard':
        return 'bg-rose-50 border-rose-200 text-rose-700';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  return (
    <section id="challenges" className="py-24 bg-gradient-to-tr from-slate-50 via-sky-50/20 to-emerald-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Green Challenges</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Join Active Sustainability Campaigns
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Take on community-driven green challenges, compete with global users, and verify achievements.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialChallenges.map((challenge, idx) => {
            const isJoined = joinedIds.has(challenge.id);
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative p-6 sm:p-8 rounded-3xl bg-white border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  isJoined ? 'border-emerald-500 shadow-emerald-50' : 'border-slate-100'
                }`}
              >
                {/* Challenge Header tags */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-slate-700 font-extrabold text-sm">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>{challenge.points} Pts</span>
                  </div>
                </div>

                {/* Challenge Info */}
                <div className="space-y-3 mb-8">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {challenge.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-normal leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Challenge Footer / Join bar */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{isJoined ? challenge.participants + 1 : challenge.participants} active</span>
                  </div>

                  <button
                    type="button"
                    disabled={isJoined}
                    onClick={() => handleJoin(challenge)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-300 ${
                      isJoined
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-default'
                        : 'bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <span>Accept Challenge</span>
                        <ArrowRight className="w-3 h-3" />
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
