const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController');

router.get('/', buildingController.getBuildings);
router.get('/:id', buildingController.getBuildingById);
router.post('/', buildingController.createBuilding);

module.exports = router;

