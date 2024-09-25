const db = require('../database');

const buscarUsuarioPorNombre = async (usuario) => {
  const [rows] = await db.query('SELECT * FROM credenciales WHERE usuario = ?', [usuario]);
  return rows[0];
};

module.exports = {
  buscarUsuarioPorNombre,
};
