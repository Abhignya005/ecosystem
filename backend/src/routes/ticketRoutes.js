const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getTickets);
router.post('/', ticketController.createTicket);
router.patch('/:id', ticketController.updateTicket);

module.exports = router;

