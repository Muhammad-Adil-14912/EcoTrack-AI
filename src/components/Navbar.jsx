import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Award } from 'lucide-react';

export default function Navbar({ ecoPoints }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'AI Tips', href: '#recommendations' },
    { name: 'Challenges', href: '#challenges' },
    { name: 'Our Mission', href: '#mission' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#2A5C43] shadow-md border-b border-emerald-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2A5C43] shadow-md group-hover:scale-105 transition-all duration-300">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center">
              EcoTrack<span className="text-emerald-300 ml-0.5">AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-emerald-100 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Eco Points Display */}
            <motion.div 
              key={ecoPoints}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-600/50 text-emerald-100 shadow-sm"
            >
              <Award className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider">Eco Points:</span>
              <span className="font-bold text-sm text-white">{ecoPoints}</span>
            </motion.div>

            <a
              href="#calculator"
              className="px-5 py-2.5 rounded-xl bg-white text-[#2A5C43] font-semibold text-sm hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Calculate Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Eco Points */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-600/50 text-emerald-100">
              <Award className="w-4 h-4 text-emerald-300" />
              <span className="font-bold text-xs text-white">{ecoPoints}</span>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-900/30 transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-emerald-700/30 bg-[#2A5C43]"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-900/20 transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-emerald-700/30 flex flex-col gap-3">
                <a
                  href="#calculator"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 px-4 rounded-xl bg-white text-[#2A5C43] font-semibold shadow-md hover:bg-emerald-50 transition-colors duration-200"
                >
                  Calculate Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
