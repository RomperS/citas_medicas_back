const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10733557',
  password: 'GHtaHWY74A',
  database: 'sql10733557'
});

module.exports = pool.promise();
