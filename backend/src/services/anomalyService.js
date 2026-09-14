const prisma = require('../prisma');
const cron = require('node-cron');

/**
 * Evaluates building consumption against baseline metrics.
 * Flags anomalies when consumption > baseline * 1.25
 * Auto-creates a maintenance ticket for high-severity or off-hours anomalies.
 */
async function runAnomalyDetection() {
  console.log('[Anomaly Engine] Running scheduled campus utility evaluation...');
  try {
    const buildings = await prisma.building.findMany({
      include: {
        records: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    const now = new Date();
    const currentHour = now.getHours();
    const isOffHours = currentHour < 7 || currentHour >= 20;

    for (const building of buildings) {
      if (!building.records || building.records.length === 0) continue;
      const latestRecord = building.records[0];

      let baseline = latestRecord.resourceType === 'WATER' ? building.baselineWater : building.baselineEnergy;
      if (!baseline || baseline === 0) baseline = 100;

      const threshold = baseline * 1.25;
      if (latestRecord.consumptionValue > threshold) {
        const severity = latestRecord.consumptionValue > baseline * 1.6 ? 'CRITICAL' : 'HIGH';

        // Check if open anomaly already exists to prevent duplicate spam
        const existing = await prisma.anomaly.findFirst({
          where: {
            buildingId: building.id,
            metricType: latestRecord.resourceType,
            status: 'OPEN'
          }
        });

        if (!existing) {
          const anomaly = await prisma.anomaly.create({
            data: {
              buildingId: building.id,
              metricType: latestRecord.resourceType,
              thresholdExceeded: latestRecord.consumptionValue - baseline,
              severity: isOffHours ? 'CRITICAL' : severity,
              status: 'OPEN'
            }
          });

          // Auto-dispatch maintenance ticket for critical or off-hours alerts
          if (anomaly.severity === 'CRITICAL' || isOffHours) {
            await prisma.maintenanceTicket.create({
              data: {
                buildingId: building.id,
                reportedBy: 'System Auto-Dispatch Engine',
                issueType: `${latestRecord.resourceType} Leak/Spike Anomaly`,
                priority: 'URGENT',
                status: 'OPEN',
                assignedTo: 'Emergency Facility On-Duty Crew'
              }
            });
            console.log(`[Anomaly Engine] Auto-dispatched URGENT maintenance ticket for ${building.name}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('[Anomaly Engine Error]:', error.message);
  }
}

function initAnomalyScheduler() {
  // Run anomaly detection every 15 minutes (or on startup)
  cron.schedule('*/15 * * * *', () => {
    runAnomalyDetection();
  });
  console.log('[Anomaly Engine] Background scheduler initialized (15m interval)');
}

module.exports = {
  runAnomalyDetection,
  initAnomalyScheduler
};

