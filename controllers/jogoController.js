const jogoModel = require("../models/jogoModel");

// Lista todos os jogos
exports.buscarTodosJogos = (req, res) => {
  jogoModel.buscarTodosJogos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar jogos");
    res.json(results); // Retorna os jogos como JSON
  });
};

// Busca um jogo pelo ID
exports.buscarJogosId = (req, res) => {
  jogoModel.buscarJogosId(req.params.id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar jogo");
    if (results.length === 0) return res.status(404).send("Jogo não encontrado");
    res.json(results[0]); // Retorna os jogos como JSON
  });
};

// Adiciona um novo jogo após validar os campos
exports.inserirJogo = (req, res) => {
  const { nome, plataforma, ano_lancamento } = req.body;

  // Validação simples dos campos obrigatórios
  if (!nome || !plataforma || !ano_lancamento) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  jogoModel.inserirJogo(req.body, (err) => {
    if (err) return res.status(500).send("Erro ao adicionar jogo");
    res.status(201).send("Jogo adicionado com sucesso");
  });
};

// Atualiza um jogo existente
exports.atualizarJogo = (req, res) => {
  const { nome, plataforma, ano_lancamento } = req.body;

  // Validação dos dados recebidos
  if (!nome || !plataforma || !ano_lancamento) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  jogoModel.atualizarJogo(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send("Erro ao atualizar jogo");
    if (result.affectedRows === 0) return res.status(404).send("Jogo não encontrado");
    res.send("Jogo atualizado com sucesso");
  });
};

// Exclui um jogo pelo ID
exports.deletarJogo = (req, res) => {
  jogoModel.deletarJogo(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Erro ao deletar jogo");
    if (result.affectedRows === 0) return res.status(404).send("Jogo não encontrado");
    res.send("Jogo deletado com sucesso");
  });
};
