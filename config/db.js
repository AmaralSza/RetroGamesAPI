const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",        // usuário do MySQL
  password: "123456",        // senha
  database: "retro_games",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso!");
});

module.exports = connection;
