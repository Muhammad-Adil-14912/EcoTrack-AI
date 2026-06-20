import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Download, Share2, Sparkles, Check, Heart } from 'lucide-react';

export default function MonthlyStory({ results, ecoPoints }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Carbon reduction metrics
  const co2Reduced = Math.round(24 + (ecoPoints * 0.1));
  const treesEquivalent = parseFloat((co2Reduced / 8.3).toFixed(1)); // base 8.3kg CO2 per tree per month

  const handleDownload = () => {
    if (isDownloading || downloadSuccess) return;
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    }, 1500);
  };

  const handleShare = () => {
    if (isSharing || shareSuccess) return;
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }, 1200);
  };

  return (
    <section id="story" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Sustainability Journal</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Monthly Sustainability Story
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Every green action writes a chapter. Review your personalized monthly narrative and unlock shareable carbon certificates.
          </p>
        </div>

        {/* Story Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Narrative Summary */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full w-max block">
                Narrative Report
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                "Small Choices, Collective Echoes"
              </h3>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen className="w-40 h-40 text-slate-900" />
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal relative z-10">
                "This month, you successfully reduced your environmental emissions by <span className="font-bold text-emerald-600">{co2Reduced} kg CO₂</span> through eco-friendly commuting and optimization of your home energy settings."
              </p>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal relative z-10">
                "Your contribution is equivalent to planting <span className="font-bold text-sky-600">{treesEquivalent} trees</span>. By adopting these habit changes, your Carbon Twin projection forecast indicates a steady path towards climate balance."
              </p>
              
              <p className="text-slate-600 text-xs font-semibold leading-relaxed border-t border-slate-200/50 pt-4 flex gap-2 items-center">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Thank you for taking care of our Earth! Keep accepting challenges to grow your impact.</span>
              </p>
            </div>

            {/* Actions button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {isDownloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Report Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm hover:bg-slate-50"
              >
                {isSharing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : shareSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share Narrative</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Shareable Achievement Certificate Card */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ rotate: -1, scale: 0.95 }}
              whileHover={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[440px] rounded-3xl bg-slate-900 text-white p-8 relative border-4 border-double border-emerald-500/30 shadow-2xl overflow-hidden text-center"
            >
              {/* Certificate watermark style elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Award className="w-80 h-80 text-white" />
              </div>

              <div className="space-y-6 relative z-10">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full tracking-widest inline-block mx-auto">
                  OFFICIAL ECO CERTIFICATE
                </span>

                <div className="space-y-2">
                  <h4 className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Presented to the Community</h4>
                  <p className="text-lg font-extrabold text-white">Eco Track Warrior</p>
                </div>

                <div className="h-0.5 w-1/2 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />

                <p className="text-xs text-slate-300 font-normal leading-relaxed max-w-sm mx-auto">
                  For outstanding achievements in environmental conservation, offsetting <span className="font-bold text-emerald-400">{co2Reduced} kg of CO₂</span> and securing <span className="font-bold text-white">{ecoPoints} Eco Points</span>.
                </p>

                <div className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-2xl max-w-xs mx-auto">
                  <div className="text-left">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Status Level</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5 block">Eco Defender</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Date Issued</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">{new Date().toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</span>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-1.5 text-[10px] text-emerald-400 font-extrabold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4 fill-current animate-pulse" />
                  <span>EcoTrack AI Verified Badge</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
