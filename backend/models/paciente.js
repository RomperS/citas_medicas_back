const db = require('../database');

const getPacientes = async () => {
  const [rows] = await db.query('SELECT * FROM pacientes');
  return rows;
};

const getPacienteById = async (id) => {
  const [rows] = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  getPacientes,
  getPacienteById
};
