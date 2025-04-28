const connection = require("../config/db");

// Retorna todos os jogos cadastrados
exports.buscarTodosJogos = (callback) => {
  connection.query("SELECT * FROM jogos", callback);
};

// Retorna todos os jogos cadastrados pelo id
exports.buscarJogosId = (id, callback) => {
  connection.query("SELECT * FROM jogos WHERE id = ?", [id], callback);
};

// Insere um novo jogo no banco de dados
exports.inserirJogo = ({ nome, plataforma, ano_lancamento}, callback) => {
  const sql = "INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES (?, ?, ?)";
  connection.query(sql, [nome, plataforma, ano_lancamento], callback);
};

// Atualiza um jogo existente com base no ID
exports.atualizarJogo = (id, { nome, plataforma, ano_lancamento }, callback) => {
  const sql = "UPDATE jogos SET nome = ?, plataforma = ?, ano_lancamento = ? WHERE id = ?";
  connection.query(sql, [nome, plataforma, ano_lancamento, id], callback);
};

// Exclui um jogo com base no ID
exports.deletarJogo = (id, callback) => {
  connection.query("DELETE FROM jogos WHERE id = ?", [id], callback);
};
