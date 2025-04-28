const connection = require("../config/db");

// Insere uma pontuacao no banco de dados
exports.inserirPontuacao = ({ id_jogo, id_jogador, pontuacao, data_registro }, callback) => {
  const sql = "INSERT INTO pontuacoes (id_jogo, id_jogador, pontuacao, data_registro) VALUES (?, ?, ?, NOW())";
  connection.query(sql, [ id_jogo, id_jogador, pontuacao, data_registro ], callback);
};

// Retorna todos os jogos cadastrados
exports.buscarTodos = (callback) => {
  connection.query("SELECT * FROM pontuacoes ORDER BY pontuacao DESC", callback);
};

// Retorna ranking pelo ID do jogo com o nome do jogo e data/hora da pontuação
exports.buscarPontuacaoIdJogo = (idJogo, callback) => {
  connection.query(
    `SELECT
        g.nome AS nome_jogo, -- Alias para o nome do jogo
        jogad.nome AS nome_jogador,
        p.pontuacao,
        p.data_registro -- Adicionando a data e hora do registro
     FROM pontuacoes p
     JOIN jogos g ON p.id_jogo = g.id
     JOIN jogadores jogad ON p.id_jogador = jogad.id
     WHERE p.id_jogo = ?
     ORDER BY p.pontuacao DESC
     LIMIT 10`,
    [idJogo], callback
  );
};


// Retorna ranking dos 3 jogos populares com a data e hora do último registro
exports.buscarPontuacaoPopular = (callback) => {
  connection.query(
    `SELECT
        g.id,
        g.nome,
        g.plataforma,
        g.ano_lancamento,
        COUNT(p.id_jogo) AS num_pontuacoes,
        (SELECT MAX(data_registro)
         FROM pontuacoes
         WHERE id_jogo = g.id) AS ultima_pontuacao_registrada
    FROM pontuacoes p
    JOIN jogos g ON p.id_jogo = g.id
    GROUP BY p.id_jogo
    ORDER BY num_pontuacoes DESC
    LIMIT 3`,
    callback
  );
};