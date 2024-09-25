const pacienteModel = require('../models/paciente');

exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteModel.getPacientes();
    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.getPacienteById = async (req, res) => {
  const pacienteId = req.params.id;
  try {
    const paciente = await pacienteModel.getPacienteById(pacienteId);
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener paciente por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
