import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CarbonCalculator from './components/CarbonCalculator';
import DashboardPreview from './components/DashboardPreview';
import Recommendations from './components/Recommendations';
import Challenges from './components/Challenges';
import CommunityImpact from './components/CommunityImpact';
import Testimonials from './components/Testimonials';
import Mission from './components/Mission';
import Footer from './components/Footer';

// Advanced Innovation components
import CarbonTwin from './components/CarbonTwin';
import CarbonBudget from './components/CarbonBudget';
import WhatIfSimulator from './components/WhatIfSimulator';
import ReceiptScanner from './components/ReceiptScanner';
import MonthlyStory from './components/MonthlyStory';
import EcoGPT from './components/EcoGPT';

import { generateRecommendations } from './utils/carbonCalculator';

export default function App() {
  // Global Eco Points balance
  const [ecoPoints, setEcoPoints] = useState(0);

  // Calculator inputs & results states
  const [inputs, setInputs] = useState({
    transportType: 'car_petrol',
    dailyDistance: 15,
    electricityUsage: 250,
    foodPreference: 'moderate_meat',
    waterConsumption: 150
  });

  const [results, setResults] = useState({
    dailyTotal: 12.35,
    monthlyTotal: 370.5,
    yearlyTotal: 4507.75,
    score: 73,
    breakdown: [
      { name: 'Transport', value: 2.7, color: '#38BDF8' },
      { name: 'Electricity', value: 3.75, color: '#FACC15' },
      { name: 'Food', value: 5.6, color: '#4CAF50' },
      { name: 'Water', value: 0.3, color: '#A5D6A7' }
    ]
  });

  // Handle calculator outputs updating the state
  const handleCalculate = (newInputs, newResults) => {
    setInputs(newInputs);
    setResults(newResults);
  };

  // Callback to increase eco points
  const handleAddPoints = (points) => {
    setEcoPoints((prev) => prev + points);
  };

  // Callback to process scanned bills and integrate carbon data + points
  const handleScanComplete = (points, carbonImpact, scanType) => {
    setEcoPoints((prev) => prev + points);
    setResults((prev) => {
      const newMonthly = parseFloat((prev.monthlyTotal + carbonImpact).toFixed(2));
      const newDaily = parseFloat((newMonthly / 30).toFixed(2));
      const newYearly = parseFloat((newDaily * 365).toFixed(2));
      
      const updatedBreakdown = prev.breakdown.map((item) => {
        if (scanType === 'electricity' && item.name === 'Electricity') {
          return { ...item, value: parseFloat((item.value + (carbonImpact / 30)).toFixed(2)) };
        }
        if (scanType === 'fuel' && item.name === 'Transport') {
          return { ...item, value: parseFloat((item.value + (carbonImpact / 30)).toFixed(2)) };
        }
        return item;
      });

      // Recalculate score based on new daily total
      let newScore = 100 - (newDaily * 2.2);
      newScore = Math.max(10, Math.min(100, Math.round(newScore)));

      return {
        ...prev,
        dailyTotal: newDaily,
        monthlyTotal: newMonthly,
        yearlyTotal: newYearly,
        score: newScore,
        breakdown: updatedBreakdown
      };
    });
  };

  // Generate dynamic recommendations based on current inputs/results
  const recommendationsList = generateRecommendations(inputs, results);

  // Show earned points, not a fabricated CO₂-saved estimate.
  const heroCarbonScore = results ? results.score : 73;

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* Fixed Header Navbar */}
      <Navbar ecoPoints={ecoPoints} />

      {/* Hero Section */}
      <Hero carbonScore={heroCarbonScore} ecoPoints={ecoPoints} />

      {/* Features Grid */}
      <Features />

      {/* Calculator Section */}
      <CarbonCalculator onCalculate={handleCalculate} />

      {/* Advanced Feature 1: Carbon Twin */}
      <CarbonTwin results={results} />

      {/* Advanced Feature 2: What-If Simulator */}
      <WhatIfSimulator />

      {/* Advanced Feature 3: Carbon Budget Allocation */}
      <CarbonBudget results={results} />

      {/* Advanced Feature 4: Utility Bill OCR Scanner */}
      <ReceiptScanner onScanComplete={handleScanComplete} />

      {/* AI Recommendations Panel */}
      <Recommendations 
        recommendations={recommendationsList} 
        onAcceptChallenge={handleAddPoints} 
      />

      {/* Advanced Feature 5: Monthly Story & Certs */}
      <MonthlyStory results={results} ecoPoints={ecoPoints} />

      {/* Dashboard Visualizer */}
      <DashboardPreview results={results} ecoPoints={ecoPoints} />

      {/* Community Stats Page */}
      <CommunityImpact />

      {/* Reforestation Campaign Challenges */}
      <Challenges onJoinChallenge={handleAddPoints} />

      {/* Testimonials */}
      <Testimonials />

      {/* Organization Mission */}
      <Mission />

      {/* Footer */}
      <Footer />

      {/* Global Floating AI Coach (EcoGPT) */}
      <EcoGPT />

    </div>
  );
}
