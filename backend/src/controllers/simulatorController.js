/**
 * Predictive 'What-If' Sustainability Simulator Controller
 * Simulates capital improvements:
 * - Solar PV additions (kW)
 * - LED lighting retrofits (% conversion)
 * - Smart HVAC setback optimization (% efficiency gain)
 */
exports.simulateScenario = async (req, res) => {
  try {
    const { solarKw = 50, ledPercent = 60, hvacOptimization = 15 } = req.body;

    // Financial & environmental constants
    const KWH_COST_USD = 0.14; // $0.14 per kWh
    const SOLAR_ANNUAL_KWH_PER_KW = 1450; // 1 kW solar generates ~1,450 kWh/year
    const SOLAR_COST_PER_KW = 1200; // $1,200/kW installed
    const BASE_CAMPUS_LIGHTING_KWH = 350000; // Annual lighting kWh baseline
    const LED_ENERGY_SAVING_RATIO = 0.55; // 55% reduction over incandescent/fluorescent
    const LED_RETROFIT_COST = 25000; // Fixed project base cost
    const BASE_HVAC_KWH = 750000; // Annual HVAC kWh baseline
    const CO2_PER_KWH = 0.82; // 0.82 kg CO2e / kWh

    // 1. Solar calculations
    const solarAnnualKwhSaved = solarKw * SOLAR_ANNUAL_KWH_PER_KW;
    const solarCapitalExpense = solarKw * SOLAR_COST_PER_KW;

    // 2. LED calculations
    const ledAnnualKwhSaved = (BASE_CAMPUS_LIGHTING_KWH * (ledPercent / 100)) * LED_ENERGY_SAVING_RATIO;
    const ledCapitalExpense = (ledPercent / 100) * LED_RETROFIT_COST;

    // 3. HVAC optimization calculations
    const hvacAnnualKwhSaved = BASE_HVAC_KWH * (hvacOptimization / 100);
    const hvacCapitalExpense = 8500; // Sensor/controller installation cost

    // Totals
    const totalAnnualKwhSaved = Math.round(solarAnnualKwhSaved + ledAnnualKwhSaved + hvacAnnualKwhSaved);
    const totalCapitalInvestment = Math.round(solarCapitalExpense + ledCapitalExpense + hvacCapitalExpense);
    const totalAnnualCostSavings = Math.round(totalAnnualKwhSaved * KWH_COST_USD);
    const totalCO2TonsAvoided = +((totalAnnualKwhSaved * CO2_PER_KWH) / 1000).toFixed(2);
    const paybackPeriodYears = +(totalCapitalInvestment / (totalAnnualCostSavings || 1)).toFixed(1);

    // 5-Year Cumulative Savings Trajectory
    const fiveYearTrajectory = [];
    let cumulative = -totalCapitalInvestment;
    for (let yr = 1; yr <= 5; yr++) {
      cumulative += totalAnnualCostSavings;
      fiveYearTrajectory.push({
        year: `Year ${yr}`,
        netSavings: cumulative,
        annualSavings: totalAnnualCostSavings,
        carbonAvoidedTons: +(totalCO2TonsAvoided * yr).toFixed(1)
      });
    }

    res.json({
      inputs: { solarKw, ledPercent, hvacOptimization },
      metrics: {
        totalAnnualKwhSaved,
        totalAnnualCostSavings,
        totalCapitalInvestment,
        totalCO2TonsAvoided,
        paybackPeriodYears
      },
      fiveYearTrajectory
    });
  } catch (error) {
    res.status(500).json({ error: 'Simulation computation failed' });
  }
};

