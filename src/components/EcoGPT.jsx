import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Award } from 'lucide-react';

const PRESETS = [
  {
    q: "Should I use a cab or metro?",
    a: "The metro option can reduce travel emissions by approximately 65% to 80% compared to a private cab. Choosing public transit is one of the highest impact choices you can make!"
  },
  {
    q: "How can I reduce electricity?",
    a: "Reducing AC usage by two hours daily, upgrading to LED bulbs, and unplugging standby appliances can save up to 15% on electricity, directly lowering your grid carbon factor."
  },
  {
    q: "Does buying local food help?",
    a: "Yes! Locally sourced foods reduce 'food miles'—the transport emissions required to deliver food. It can lower your groceries' carbon footprint by up to 10% to 15%."
  },
  {
    q: "What is my Earth Health Score?",
    a: "Your Earth Health Score is a composite rating (0-100) calculated from your transport distance, diet choices, water flow, and monthly electricity. Check your scorecard to identify high-impact reduction items."
  }
];

export default function EcoGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am EcoGPT, your AI sustainability coach. How can I help you reduce your carbon footprint today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const updatedMessages = [...messages, { sender: 'user', text }];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "That is a great question! Reducing our carbon footprint requires constant habits. Try shifting transport to cycling, minimizing food waste, or calibrating electricity usage.";

      // Search keywords
      const query = text.toLowerCase();
      if (query.includes('cab') || query.includes('metro') || query.includes('transit') || query.includes('travel')) {
        botResponse = "The metro option can reduce travel emissions by approximately 65% to 80% compared to a private cab for this journey, saving about 2.2 kg of CO2 per 10km.";
      } else if (query.includes('electricity') || query.includes('power') || query.includes('ac') || query.includes('energy')) {
        botResponse = "Reducing AC usage by two hours daily, switching to LED bulbs, and unplugging standby electronics can save significant energy and lower your monthly carbon budget load.";
      } else if (query.includes('food') || query.includes('meat') || query.includes('eat') || query.includes('diet') || query.includes('vegan')) {
        botResponse = "Replacing meat with plant-based alternatives just twice a week saves greenhouse gases. Vegan diets produce less than half the agricultural footprint of meat-heavy diets.";
      } else if (query.includes('water') || query.includes('shower') || query.includes('brush')) {
        botResponse = "Installing low-flow aerators and showering under 5 minutes saves water distribution energy. Water heating consumes significant home power!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none z-50 cursor-pointer relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Glow Notification pulse */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white animate-bounce">
            1
          </span>
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-18 right-0 w-[350px] sm:w-[400px] h-[500px] rounded-3xl bg-[#1B4332] text-white shadow-2xl border border-emerald-700/30 overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-emerald-700/30 bg-emerald-900/40 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span>EcoGPT Coach</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-emerald-300 font-semibold block">Personal Sustainability AI</span>
                </div>
              </div>
              
              <button onClick={() => setIsOpen(false)} className="text-emerald-200 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0 border border-emerald-700/50">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className={`p-3.5 rounded-2xl text-xs max-w-[78%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-white rounded-tr-none'
                      : 'bg-emerald-900/60 text-emerald-50 rounded-tl-none border border-emerald-800/30'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0 border border-emerald-700/50">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-emerald-900/40 rounded-2xl rounded-tl-none text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Presets / Quick actions list */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 bg-emerald-900/20 border-t border-emerald-800/20">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Frequently Asked Questions</span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(preset.q)}
                      className="text-[10px] font-medium bg-emerald-900/60 border border-emerald-800 text-emerald-100 hover:bg-emerald-500 hover:text-white px-2.5 py-1.5 rounded-xl transition-all duration-200 text-left"
                    >
                      {preset.q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="p-3 border-t border-emerald-700/30 bg-emerald-900/40 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask EcoGPT a question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-emerald-950/80 border border-emerald-800 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-600/80 focus:outline-none transition-all duration-200"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
