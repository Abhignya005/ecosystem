const prisma = require('../prisma');

// Standard EPA/Defra reference factors (kg CO2e per unit)
const DEFAULT_FACTORS = {
  ELECTRICITY: 0.82, // Scope 2: kg CO2e / kWh
  NATURAL_GAS: 2.03, // Scope 1: kg CO2e / m3
  WATER: 0.34,       // Scope 3 / embodied: kg CO2e / m3
  WASTE: 0.58        // Scope 3: kg CO2e / kg
};

/**
 * Calculates Scope 1 & Scope 2 greenhouse gas emissions
 * @param {Array} records - Array of resource consumption records
 */
async function calculateEmissions(records) {
  let scope1 = 0;
  let scope2 = 0;
  let scope3 = 0;

  for (const record of records) {
    const factor = DEFAULT_FACTORS[record.resourceType] || 0.5;
    const co2eKg = record.consumptionValue * factor;

    if (record.resourceType === 'NATURAL_GAS' || record.resourceType === 'DIESEL') {
      scope1 += co2eKg;
    } else if (record.resourceType === 'ELECTRICITY') {
      scope2 += co2eKg;
    } else {
      scope3 += co2eKg;
    }
  }

  const totalKg = scope1 + scope2 + scope3;
  const totalMetricTons = totalKg / 1000;

  return {
    scope1_tons: +(scope1 / 1000).toFixed(2),
    scope2_tons: +(scope2 / 1000).toFixed(2),
    scope3_tons: +(scope3 / 1000).toFixed(2),
    total_co2e_metric_tons: +totalMetricTons.toFixed(2),
    intensity_per_capita: +(totalMetricTons / 5000).toFixed(3) // Normalized per 5000 campus users
  };
}

module.exports = {
  calculateEmissions,
  DEFAULT_FACTORS
};

