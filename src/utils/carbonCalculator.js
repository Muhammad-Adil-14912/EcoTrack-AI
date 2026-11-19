// Carbon emission coefficients (in kg CO2 per unit)
export const TRANSPORT_FACTORS = {
  car_petrol: 0.18,      // per km
  car_diesel: 0.17,      // per km
  car_electric: 0.05,    // per km
  motorcycle: 0.10,      // per km
  public_bus: 0.08,      // per km
  public_train: 0.03,     // per km
  flight_short: 0.25,    // per km
  flight_long: 0.15,     // per km
  bicycle_walk: 0.00     // per km
};

export const ELECTRICITY_FACTOR = 0.45; // kg CO2 per kWh

export const FOOD_FACTORS = {
  heavy_meat: 7.2,       // kg CO2 per day (heavy meat eaters)
  moderate_meat: 5.6,    // kg CO2 per day (medium meat eaters)
  vegetarian: 3.8,       // kg CO2 per day
  vegan: 2.9             // kg CO2 per day
};

export const WATER_FACTOR = 0.0003; // kg CO2 per liter

/**
 * Calculates carbon emissions based on user inputs
 * @param {Object} inputs 
 * @returns {Object} breakdown and totals
 */
export const calculateCarbonFootprint = (inputs) => {
  if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) {
    throw new TypeError('Carbon calculator inputs must be an object.');
  }

  const {
    transportType = 'car_petrol',
    dailyDistance = 15,
    electricityUsage = 250, // kWh/month
    foodPreference = 'moderate_meat',
    waterConsumption = 150 // L/day
  } = inputs;

  const numericInputs = { dailyDistance, electricityUsage, waterConsumption };
  for (const [field, value] of Object.entries(numericInputs)) {
    if (!Number.isFinite(Number(value)) || Number(value) < 0) {
      throw new RangeError(`${field} must be a finite, non-negative number.`);
    }
  }

  if (!Object.hasOwn(TRANSPORT_FACTORS, transportType)) {
    throw new RangeError(`Unsupported transport type: ${transportType}`);
  }
  if (!Object.hasOwn(FOOD_FACTORS, foodPreference)) {
    throw new RangeError(`Unsupported food preference: ${foodPreference}`);
  }

  // 1. Transport Emissions (Daily)
  const transportFactor = TRANSPORT_FACTORS[transportType];
  const dailyTransport = dailyDistance * transportFactor;

  // 2. Electricity Emissions (Daily)
  // Usage is monthly, convert to daily
  const dailyElectricity = (electricityUsage / 30) * ELECTRICITY_FACTOR;

  // 3. Food Emissions (Daily)
  const dailyFood = FOOD_FACTORS[foodPreference];

  // 4. Water Emissions (Daily)
  const dailyWater = waterConsumption * WATER_FACTOR;

  // Totals
  const dailyTotal = dailyTransport + dailyElectricity + dailyFood + dailyWater;
  const monthlyTotal = dailyTotal * 30;
  const yearlyTotal = dailyTotal * 365;

  // Sustainability Score (0-100)
  // Baseline average: 15-20 kg CO2/day is a score of 50.
  // Ideal: < 5 kg CO2/day is a score of 95+.
  // Worst: > 45 kg CO2/day is a score of 10.
  let score = 100 - (dailyTotal * 2.2);
  score = Math.max(10, Math.min(100, Math.round(score)));

  return {
    dailyTotal: parseFloat(dailyTotal.toFixed(2)),
    monthlyTotal: parseFloat(monthlyTotal.toFixed(2)),
    yearlyTotal: parseFloat(yearlyTotal.toFixed(2)),
    score,
    breakdown: [
      { name: 'Transport', value: parseFloat(dailyTransport.toFixed(2)), color: '#38BDF8' },
      { name: 'Electricity', value: parseFloat(dailyElectricity.toFixed(2)), color: '#FACC15' },
      { name: 'Food', value: parseFloat(dailyFood.toFixed(2)), color: '#4CAF50' },
      { name: 'Water', value: parseFloat(dailyWater.toFixed(2)), color: '#A5D6A7' }
    ]
  };
};

/**
 * Generates tailored recommendations based on user inputs
 * @param {Object} inputs 
 * @param {Object} results 
 * @returns {Array} List of recommendation objects
 */
export const generateRecommendations = (inputs, results) => {
  const {
    transportType = 'car_petrol',
    dailyDistance = 15,
    electricityUsage = 250,
    foodPreference = 'moderate_meat',
    waterConsumption = 150
  } = inputs;

  const list = [];

  // Transportation Recommendation
  if (['car_petrol', 'car_diesel', 'motorcycle'].includes(transportType) && dailyDistance > 10) {
    list.push({
      id: 'rec-transport-1',
      category: 'Transportation',
      impact: 'High Impact',
      title: 'Switch to Eco-Friendly Commuting',
      description: 'Switching to public transport, carpooling, or an electric vehicle can reduce your transport emissions by up to 75%.',
      actionText: 'Use Public Transit',
      points: 150,
      iconName: 'Bus'
    });
  } else if (dailyDistance > 2) {
    list.push({
      id: 'rec-transport-2',
      category: 'Transportation',
      impact: 'Medium Impact',
      title: 'Pedal or Walk for Short Trips',
      description: 'Biking or walking for trips under 5 km can completely eliminate emissions from those journeys and improve your health.',
      actionText: 'Bike or Walk Today',
      points: 120,
      iconName: 'Bike'
    });
  }

  // Energy Recommendation
  if (electricityUsage > 200) {
    list.push({
      id: 'rec-energy-1',
      category: 'Energy',
      impact: 'High Impact',
      title: 'Optimize Home Energy Settings',
      description: 'Reducing AC usage by 2 hours daily, switching to LED bulbs, and unplugging standby appliances can save significant energy.',
      actionText: 'Adjust Thermostat',
      points: 110,
      iconName: 'Zap'
    });
  } else {
    list.push({
      id: 'rec-energy-2',
      category: 'Energy',
      impact: 'Low Impact',
      title: 'Upgrade to Renewable Sources',
      description: 'Consider looking into solar panel installation or purchasing green power certificates to offset your remaining electrical footprint.',
      actionText: 'Explore Solar Options',
      points: 90,
      iconName: 'Sun'
    });
  }

  // Food Recommendation
  if (['heavy_meat', 'moderate_meat'].includes(foodPreference)) {
    list.push({
      id: 'rec-food-1',
      category: 'Food',
      impact: 'High Impact',
      title: 'Introduce Plant-Based Meals',
      description: 'Adding just two plant-based meals per week lowers your food footprint, saves water, and reduces agricultural emissions.',
      actionText: 'Eat Plant-Based Today',
      points: 130,
      iconName: 'Utensils'
    });
  } else {
    list.push({
      id: 'rec-food-2',
      category: 'Food',
      impact: 'Medium Impact',
      title: 'Zero Waste Meal Prep',
      description: 'Plan meals, compost scraps, and buy locally to eliminate food waste, which accounts for 8% of global greenhouse emissions.',
      actionText: 'Shop Local & Prep',
      points: 100,
      iconName: 'Leaf'
    });
  }

  // Water & Shopping Recommendation
  if (waterConsumption > 150) {
    list.push({
      id: 'rec-shopping-1',
      category: 'Shopping',
      impact: 'Medium Impact',
      title: 'Reduce Water & Waste footprint',
      description: 'Install low-flow showerheads and turn off taps when brushing teeth. Buy items with minimal packaging or in bulk.',
      actionText: 'Get Eco Water Flow',
      points: 90,
      iconName: 'Droplet'
    });
  } else {
    list.push({
      id: 'rec-shopping-2',
      category: 'Shopping',
      impact: 'Low Impact',
      title: 'Choose Eco-Friendly Products',
      description: 'Switch to zero-waste personal care items like shampoo bars and bamboo toothbrushes, and always carry a reusable shopping bag.',
      actionText: 'Switch to Reusables',
      points: 80,
      iconName: 'ShoppingBag'
    });
  }

  return list;
};
