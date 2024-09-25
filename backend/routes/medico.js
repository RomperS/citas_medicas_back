const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/', medicoController.getAllMedicos);
router.get('/area/:areaId', medicoController.getMedicosByArea);

module.exports = router;
