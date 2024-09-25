const express = require('express');
const router = express.Router();
const areaTrabajoController = require('../controllers/areaTrabajoController');

router.get('/', areaTrabajoController.getAllAreas);

module.exports = router;
