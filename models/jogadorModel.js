const connection = require("../config/db");

// Retorna todos os jogadores cadastrados
exports.buscarTodosJogadores = (callback) => {
  connection.query("SELECT * FROM jogadores", callback);
};

// Retorna um jogador específico pelo ID
exports.buscarJogadorId = (id, callback) => {
  connection.query("SELECT * FROM jogadores WHERE id = ?", [id], callback);
};

// Retorna um jogador específico pelo nickname
exports.buscarJogadorNick = (nickname, callback) => {
  connection.query("SELECT * FROM jogadores WHERE nickname = ?", [nickname], callback);
};

// Insere um novo jogador no banco de dados
exports.inserirJogador = ({ nome, nickname, }, callback) => {
  const sql = "INSERT INTO jogadores (nome, nickname ) VALUES (?, ?)";
  connection.query(sql, [nome, nickname ], callback);
};

// Atualiza um jogador existente com base no ID
exports.atualizarJogadorId = (id, { nome, nickname }, callback) => {
  const sql = "UPDATE jogadores SET nome = ?, nickname = ? WHERE id = ?";
  connection.query(sql, [nome, nickname, id], callback);
};

// Atualiza um jogador existente com base no nickname
exports.atualizarJogadorNick = (id, { nome, nickname }, callback) => {
  const sql = "UPDATE jogadores SET nome = ?, nickname = ? WHERE nickname = ?";
  connection.query(sql, [nome, nickname, id], callback);
};

// Exclui um jogador com base no ID
exports.deletarJogador = (id, callback) => {
  connection.query("DELETE FROM jogadores WHERE id = ?", [id], callback);
};