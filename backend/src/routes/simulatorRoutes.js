const express = require('express');
const router = express.Router();
const simulatorController = require('../controllers/simulatorController');

router.post('/simulate', simulatorController.simulateScenario);

module.exports = router;

