const mysql = require("mysql2");
require("dotenv").config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

try {
  db.connect();
  console.log("Conexão bem sucedida ao banco de dados!");
} catch (err) {
  console.error("Erro ao conectar ao banco de dados:", err);
}


const port = process.env.PORT;
module.exports = { 
  dbPromise: db.promise(), 
  port
};


