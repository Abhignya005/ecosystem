const prisma = require('../prisma');
const { runAnomalyDetection } = require('../services/anomalyService');

exports.getAnomalies = async (req, res) => {
  try {
    const anomalies = await prisma.anomaly.findMany({
      include: { building: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anomalies' });
  }
};

exports.resolveAnomaly = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.anomaly.update({
      where: { id },
      data: { status: 'RESOLVED' }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to resolve anomaly' });
  }
};

exports.triggerScan = async (req, res) => {
  try {
    await runAnomalyDetection();
    res.json({ message: 'Anomaly detection scan executed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error running anomaly detection scan' });
  }
};

