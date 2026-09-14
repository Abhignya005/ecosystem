const prisma = require('../prisma');

exports.getBuildings = async (req, res) => {
  try {
    const buildings = await prisma.building.findMany();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buildings' });
  }
};

exports.getBuildingById = async (req, res) => {
  try {
    const building = await prisma.building.findUnique({
      where: { id: req.params.id },
      include: { records: true, anomalies: true, tickets: true }
    });
    if (!building) return res.status(404).json({ error: 'Building not found' });
    res.json(building);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch building' });
  }
};

exports.createBuilding = async (req, res) => {
  try {
    const { name, type, capacity, baselineEnergy, baselineWater, locationCoords } = req.body;
    const building = await prisma.building.create({
      data: { name, type, capacity, baselineEnergy, baselineWater, locationCoords }
    });
    res.status(201).json(building);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create building' });
  }
};

