const mysql = require('mysql2');

function getConnection(){
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Inteligente2004",
    database: "mediciones_db"
  });

  return connection;
}

module.exports = {getConnection};
