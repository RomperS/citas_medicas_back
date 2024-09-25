const db = require('../database');

const getAllAreas = async () => {
  const [rows] = await db.query('SELECT * FROM area_trabajo');
  return rows;
};

module.exports = {
  getAllAreas,
};
