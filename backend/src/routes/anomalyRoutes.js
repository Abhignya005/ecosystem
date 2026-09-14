const express = require('express');
const router = express.Router();
const anomalyController = require('../controllers/anomalyController');

router.get('/', anomalyController.getAnomalies);
router.patch('/:id/resolve', anomalyController.resolveAnomaly);
router.post('/scan', anomalyController.triggerScan);

module.exports = router;

