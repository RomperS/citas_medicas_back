const pool = require('../database');

const getMedicos = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicos');
    return rows;
  } catch (err) {
    console.error('Error en getMedicos:', err);
    throw err;
  }
};

const getMedicosByArea = async (areaId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicos WHERE id_area = ?', [areaId]);
    return rows;
  } catch (err) {
    console.error('Error en getMedicosByArea:', err);
    throw err;
  }
};

module.exports = {
  getMedicos,
  getMedicosByArea
};
