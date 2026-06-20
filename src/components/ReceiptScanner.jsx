import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, FileSpreadsheet, Zap, Droplet, ArrowRight, Award } from 'lucide-react';

const MOCK_EXTRACTED_DATA = {
  electricity: {
    type: 'Electricity Bill',
    val: '380 kWh',
    carbonImpact: 171.0, // kg CO2
    points: 120,
    insights: 'Extracted 380 kWh for May 2026. This increases your active energy footprint by 5.7 kg/day.'
  },
  fuel: {
    type: 'Fuel Receipt',
    val: '10 Gallons (Gasoline)',
    carbonImpact: 88.9, // kg CO2
    points: 100,
    insights: 'Extracted 10 Gallons of Unleaded Petrol. This represents a high transportation offset priority.'
  },
  grocery: {
    type: 'Grocery Bill',
    val: '$145.20 (Vegetarian)',
    carbonImpact: 12.5, // kg CO2
    points: 150,
    insights: 'Parsed 100% vegetarian shopping cart. Bonus Eco Points (+150) awarded for plant-based choices!'
  }
};

export default function ReceiptScanner({ onScanComplete }) {
  const [scannedFiles, setScannedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeScanType, setActiveScanType] = useState(null);

  const simulateScan = (type) => {
    if (isScanning) return;
    setIsScanning(true);
    setActiveScanType(type);
    setScanProgress(0);

    // Simulate scanning progress bar
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    // Complete scan after 1.8 seconds
    setTimeout(() => {
      const data = MOCK_EXTRACTED_DATA[type];
      
      const newFile = {
        id: `file-${Date.now()}`,
        name: `${type}_bill_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`,
        type: data.type,
        extractedVal: data.val,
        carbonImpact: data.carbonImpact,
        points: data.points,
        insights: data.insights,
        status: 'Processed'
      };

      setScannedFiles((prev) => [newFile, ...prev]);
      setIsScanning(false);
      
      // Update global application metrics
      if (onScanComplete) {
        onScanComplete(data.points, data.carbonImpact, type);
      }
    }, 1800);
  };

  return (
    <section id="scanner" className="py-24 bg-gradient-to-br from-slate-50 via-sky-50/10 to-emerald-50/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Utility Scanner (AI OCR)</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Receipt & Bill Parser
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Upload electricity bills, fuel receipts, or grocery receipts. Our AI scanner parses usage metrics and updates your carbon budget.
          </p>
        </div>

        {/* Scanner Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Upload and Scanner Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600" />
              <span>Drag & Drop Portal</span>
            </h3>

            {/* Dropzone Area */}
            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-slate-50/50 flex flex-col items-center justify-center space-y-4 transition-colors">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 group-hover:text-emerald-500 transition-colors" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Scan mock sustainability receipts</p>
                <p className="text-xs text-slate-400">Select a receipt category below to simulate AI extraction</p>
              </div>

              {/* simulated upload buttons */}
              <div className="grid grid-cols-3 gap-2.5 w-full pt-4">
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => simulateScan('electricity')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[11px] font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all focus:outline-none disabled:opacity-50"
                >
                  ⚡ Power Bill
                </button>
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => simulateScan('fuel')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[11px] font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all focus:outline-none disabled:opacity-50"
                >
                  ⛽ Fuel Receipt
                </button>
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => simulateScan('grocery')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[11px] font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all focus:outline-none disabled:opacity-50"
                >
                  🛒 Grocery Bill
                </button>
              </div>
            </div>

            {/* Scanning Feedback Overlay */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl space-y-4 overflow-hidden relative"
                >
                  {/* Holographic scanning light bar */}
                  <motion.div 
                    animate={{ y: [0, 80, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="absolute inset-x-0 h-1 bg-emerald-500/40 shadow shadow-emerald-500/80 -z-0"
                  />
                  
                  <div className="flex justify-between items-center z-10 relative">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-600 animate-spin" />
                      Scanning file: {activeScanType}_bill.pdf
                    </span>
                    <span className="text-xs font-bold text-emerald-600">{scanProgress}%</span>
                  </div>

                  <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden z-10 relative">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-150" style={{ width: `${scanProgress}%` }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Scanned Results Logs */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Scanned Receipts Log ({scannedFiles.length})</span>
            </h3>

            {scannedFiles.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-400 text-xs">
                No documents uploaded yet. Choose an energy bill, fuel receipt, or grocery receipt on the left to start the simulated OCR scan.
              </div>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                {scannedFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-800">{file.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                            {file.type} • {file.extractedVal}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                          {file.status}
                        </span>
                        
                        <div className="flex items-center gap-0.5 text-xs font-extrabold text-emerald-600 mt-2">
                          <Award className="w-3.5 h-3.5 text-emerald-500" />
                          <span>+{file.points} Pts</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">AI Extracted Insights</span>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {file.insights}
                      </p>
                      
                      <span className="text-[10px] font-bold text-rose-500 mt-1 block">
                        Estimated Carbon Impact: +{file.carbonImpact} kg CO₂
                      </span>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
