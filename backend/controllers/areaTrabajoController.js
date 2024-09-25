const areaTrabajoModel = require('../models/areaTrabajo');

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await areaTrabajoModel.getAllAreas();
    res.json(areas);
  } catch (error) {
    console.error('Error al obtener áreas de trabajo:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
