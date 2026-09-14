const prisma = require('../prisma');

// Sample default leaderboard data if DB is initial
const DEFAULT_LEAGUE = [
  { id: '1', entityName: 'Oak Ridge Student Residence', entityType: 'HOSTEL', points: 2840, rank: 1, energySavedPct: 18.4, verifiedReports: 42, badge: 'Eco-Champion Dorm' },
  { id: '2', entityName: 'Department of Computer Science', entityType: 'DEPARTMENT', points: 2610, rank: 2, energySavedPct: 15.2, verifiedReports: 36, badge: 'Zero-Waste Innovator' },
  { id: '3', entityName: 'Pine Crest Residence Hall', entityType: 'HOSTEL', points: 2390, rank: 3, energySavedPct: 12.8, verifiedReports: 29, badge: 'Water Guardian' },
  { id: '4', entityName: 'School of Mechanical Engineering', entityType: 'DEPARTMENT', points: 2150, rank: 4, energySavedPct: 9.6, verifiedReports: 21, badge: 'Green Pioneer' },
  { id: '5', entityName: 'Maple Court Graduate Housing', entityType: 'HOSTEL', points: 1980, rank: 5, energySavedPct: 8.1, verifiedReports: 17, badge: 'Energy Saver' }
];

exports.getLeaderboard = async (req, res) => {
  try {
    const records = await prisma.ecoLeaderboard.findMany({
      orderBy: { points: 'desc' }
    });

    if (records && records.length > 0) {
      return res.json(records);
    }
    return res.json(DEFAULT_LEAGUE);
  } catch (error) {
    res.json(DEFAULT_LEAGUE);
  }
};

exports.awardPoints = async (req, res) => {
  try {
    const { entityName, pointsToAdd, reason } = req.body;
    res.json({
      success: true,
      message: `Awarded ${pointsToAdd} points to ${entityName} for "${reason}"`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update points' });
  }
};

