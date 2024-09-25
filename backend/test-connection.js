const pool = require('./database'); // Asegúrate de la ruta correcta al archivo de configuración de la base de datos

// Realiza una consulta simple para verificar la conexión
pool.query('SELECT * from pacientes')
  .then(([rows, fields]) => {
    console.log('Conexión exitosa:', rows);
  })
  .catch(err => {
    console.error('Error en la conexión:', err);
  });
