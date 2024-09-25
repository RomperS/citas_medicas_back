const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.post('/', citasController.createCita);
router.get('/', citasController.getAllCitas);
router.get('/:id', citasController.getCitaById);
router.delete('/:id', citasController.cancelCita);


module.exports = router;
