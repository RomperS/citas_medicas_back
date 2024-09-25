const db = require('../database');

const createCita = async (citaData) => {
  const { id_area, id_medico, id_paciente, fecha, hora, estado } = citaData;
  const [result] = await db.query(
    'INSERT INTO citas (id_area, id_medico, id_paciente, fecha, hora, estado) VALUES (?, ?, ?, ?, ?, ?)',
    [id_area, id_medico, id_paciente, fecha, hora, estado]
  );
  return { id: result.insertId, ...citaData };
};

const getAllCitas = async () => {
  const [rows] = await db.query('SELECT * FROM citas');
  return rows;
};

const getCitasByFilter = async (id_area, id_paciente) => {
  let query = 'SELECT * FROM citas WHERE 1=1';
  const params = [];

  if (id_area) {
    query += ' AND id_area = ?';
    params.push(id_area);
  }

  if (id_paciente) {
    query += ' AND id_paciente = ?';
    params.push(id_paciente);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

// Método para obtener una cita específica
const getCitaById = async (id) => {
  const [rows] = await db.query('SELECT * FROM citas WHERE id = ?', [id]);
  return rows[0]; // Devuelve la primera fila o undefined si no hay resultados
};

const deleteCitaById = async (id) => {
  await db.query('DELETE FROM citas WHERE id = ?', [id]);
};

module.exports = { createCita, getAllCitas, getCitasByFilter, getCitaById, deleteCitaById };
