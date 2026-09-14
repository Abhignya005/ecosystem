const prisma = require('../prisma');

exports.getResources = async (req, res) => {
  try {
    const resources = await prisma.resourceRecord.findMany({
      include: { building: true },
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resource records' });
  }
};

exports.createResource = async (req, res) => {
  try {
    const { buildingId, resourceType, consumptionValue } = req.body;
    const record = await prisma.resourceRecord.create({
      data: { buildingId, resourceType, consumptionValue }
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource record' });
  }
};

