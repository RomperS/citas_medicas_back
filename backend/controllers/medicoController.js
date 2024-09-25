const medicoModel = require('../models/medico');

const getAllMedicos = async (req, res) => {
  try {
    const medicos = await medicoModel.getMedicos();
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener médicos', error: err.message });
  }
};

const getMedicosByArea = async (req, res) => {
  const areaId = req.params.areaId;
  try {
    const medicos = await medicoModel.getMedicosByArea(areaId);
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener médicos', error: err.message });
  }
};

module.exports = {
  getAllMedicos,
  getMedicosByArea
};
