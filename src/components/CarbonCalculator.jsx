import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Zap, 
  Utensils, 
  Droplet, 
  ArrowRight,
  TrendingDown,
  Award,
  Leaf
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculateCarbonFootprint } from '../utils/carbonCalculator';

export default function CarbonCalculator({ onCalculate }) {
  // Input states
  const [transportType, setTransportType] = useState('car_petrol');
  const [dailyDistance, setDailyDistance] = useState(15);
  const [electricityUsage, setElectricityUsage] = useState(250);
  const [foodPreference, setFoodPreference] = useState('moderate_meat');
  const [waterConsumption, setWaterConsumption] = useState(150);

  // Result state
  const [results, setResults] = useState(null);

  // Run calculation whenever inputs change
  useEffect(() => {
    const inputs = {
      transportType,
      dailyDistance: parseFloat(dailyDistance) || 0,
      electricityUsage: parseFloat(electricityUsage) || 0,
      foodPreference,
      waterConsumption: parseFloat(waterConsumption) || 0
    };
    const footprint = calculateCarbonFootprint(inputs);
    setResults(footprint);
    if (onCalculate) {
      onCalculate(inputs, footprint);
    }
  }, [transportType, dailyDistance, electricityUsage, foodPreference, waterConsumption]);

  return (
    <section id="calculator" className="py-24 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Interactive Calculator</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Carbon Footprint
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-green-400 mx-auto rounded-full mt-2" />
          <p className="text-lg text-slate-600 font-normal">
            Input your lifestyle choices below to see your daily emissions and receive real-time AI recommendations.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>Lifestyle Settings</span>
            </h3>

            {/* Transport Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Transportation</span>
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                  className="col-span-2 sm:col-span-1 block w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                >
                  <option value="car_petrol">Car (Petrol)</option>
                  <option value="car_diesel">Car (Diesel)</option>
                  <option value="car_electric">Car (Electric)</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="public_bus">Public Bus</option>
                  <option value="public_train">Public Train</option>
                  <option value="flight_short">Short Flight (&lt; 3h)</option>
                  <option value="flight_long">Long Flight (&gt; 3h)</option>
                  <option value="bicycle_walk">Bicycle / Walk</option>
                </select>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={dailyDistance}
                    onChange={(e) => setDailyDistance(e.target.value)}
                    className="w-full bg-transparent text-slate-800 text-sm font-semibold focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold whitespace-nowrap">km / day</span>
                </div>
              </div>

              {/* Slider for Distance */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={dailyDistance}
                  onChange={(e) => setDailyDistance(e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0 km</span>
                  <span>75 km</span>
                  <span>150+ km</span>
                </div>
              </div>
            </div>

            {/* Electricity Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Electricity Usage</span>
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <input
                    type="number"
                    min="0"
                    value={electricityUsage}
                    onChange={(e) => setElectricityUsage(e.target.value)}
                    className="w-16 bg-transparent text-slate-800 text-sm font-semibold focus:outline-none text-right"
                  />
                  <span className="text-xs text-slate-400 font-bold">kWh/mo</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="800"
                value={electricityUsage}
                onChange={(e) => setElectricityUsage(e.target.value)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0 kWh</span>
                <span>400 kWh</span>
                <span>800+ kWh</span>
              </div>
            </div>

            {/* Food Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>Diet Preference</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'heavy_meat', label: 'Heavy Meat', desc: 'Almost daily' },
                  { value: 'moderate_meat', label: 'Moderate Meat', desc: 'Some poultry/fish' },
                  { value: 'vegetarian', label: 'Vegetarian', desc: 'No meat, has dairy' },
                  { value: 'vegan', label: 'Vegan', desc: 'Strictly plant-based' }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFoodPreference(item.value)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                      foodPreference === item.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm shadow-emerald-50'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-sm font-bold">{item.label}</span>
                    <span className="text-[10px] opacity-70 mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Water Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Droplet className="w-4 h-4 text-emerald-600" />
                  <span>Water Usage</span>
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <input
                    type="number"
                    min="0"
                    value={waterConsumption}
                    onChange={(e) => setWaterConsumption(e.target.value)}
                    className="w-16 bg-transparent text-slate-800 text-sm font-semibold focus:outline-none text-right"
                  />
                  <span className="text-xs text-slate-400 font-bold">Liters/day</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="400"
                value={waterConsumption}
                onChange={(e) => setWaterConsumption(e.target.value)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0 L</span>
                <span>200 L</span>
                <span>400+ L</span>
              </div>
            </div>

          </div>

          {/* Outputs / Results Panel */}
          {results && (
            <div className="lg:col-span-6 space-y-8">
              
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Score Circular Gauge/Progress */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sustainability Score</span>
                  
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* SVG Gauge */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="50"
                        className="stroke-slate-100"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="50"
                        className="stroke-emerald-500 transition-all duration-500 ease-out"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={314}
                        strokeDashoffset={314 - (314 * results.score) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-slate-800">{results.score}</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Eco-Score</span>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-slate-500 mt-4">
                    Score grade: <span className="font-bold text-emerald-600">{results.score >= 80 ? 'Excellent' : results.score >= 50 ? 'Moderate' : 'Needs Action'}</span>
                  </span>
                </div>

                {/* Emissions Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Daily Emissions</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-slate-800">{results.dailyTotal}</span>
                        <span className="text-slate-500 font-semibold text-xs">kg CO₂</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Monthly Emissions</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-slate-800">{results.monthlyTotal}</span>
                        <span className="text-slate-500 font-semibold text-xs">kg CO₂</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl font-medium">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span>Average global citizen is ~16 kg/day</span>
                  </div>
                </div>

              </div>

              {/* Emissions breakdown Chart */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">CO₂ Emissions Source Breakdown</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.breakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {results.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#FFFFFF'
                        }}
                        formatter={(value) => [`${value} kg CO₂ / day`]}
                      />
                      <Legend 
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
