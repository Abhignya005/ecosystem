const prisma = require('../prisma');

exports.getTickets = async (req, res) => {
  try {
    const tickets = await prisma.maintenanceTicket.findMany({
      include: { building: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch maintenance tickets' });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { buildingId, reportedBy, issueType, priority, imageUrl, assignedTo } = req.body;
    const ticket = await prisma.maintenanceTicket.create({
      data: {
        buildingId,
        reportedBy: reportedBy || 'Campus Resident',
        issueType,
        priority: priority || 'MEDIUM',
        imageUrl: imageUrl || null,
        assignedTo: assignedTo || 'Facilities Maintenance Team',
        status: 'OPEN'
      }
    });
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ error: 'Failed to create maintenance ticket' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;
    const ticket = await prisma.maintenanceTicket.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(assignedTo && { assignedTo })
      }
    });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

