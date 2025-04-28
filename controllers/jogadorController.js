const jogadorModel = require("../models/jogadorModel");

// Lista todas os jogadores cadastrados
exports.buscarTodosJogadores = (req, res) => {
  jogadorModel.buscarTodosJogadores((err, results) => {
    if (err) return res.status(500).send("Erro ao listar jogadores");
    res.json(results);
  });
};

// Busca um jogador pelo ID
exports.buscarJogadorId = (req, res) => {
  jogadorModel.buscarJogadorId(req.params.id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar jogador");
    if (results.length === 0) return res.status(404).send("Jogador não encontrada");
    res.json(results[0]);
  });
};

// Busca um jogador pelo Nickname
exports.buscarJogadorNick = (req, res) => {
  jogadorModel.buscarJogadorNick(req.params.nickname, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar jogador");
    if (results.length === 0) return res.status(404).send("Jogador não encontrado");
    res.json(results[0]);
  });
};

// Adiciona um novo jogador, com validação dos campos
exports.inserirJogador = (req, res) => {
  const { nome, nickname } = req.body;

  // Validação simples dos campos obrigatórios
  if (!nome || !nickname) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  jogadorModel.buscarJogadorNick(nickname, (err, jogadorExistente) => {
    if (err) {
      console.error("Erro ao buscar jogador:", err);
      return res.status(500).send("Erro ao verificar nickname");
    }

    if (Array.isArray(jogadorExistente) && jogadorExistente.length > 0) {
      return res.status(409).json({ message: 'Nickname já existe' });
    }

    jogadorModel.inserirJogador(req.body, (err) => {
      if (err) {
        console.error("Erro ao adicionar jogador:", err);
        return res.status(500).send("Erro ao adicionar jogador");
      }
      res.status(201).send("Jogador adicionado com sucesso");
    });
  });
};

// Atualiza os dados de uma jogador pelo ID
exports.atualizarJogadorId = (req, res) => {
  const { nome, nickname } = req.body;

  // Validação dos dados recebidos
  if (!nome || !nickname) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  jogadorModel.atualizarJogadorId(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send("Erro ao atualizar jogador");
    if (result.affectedRows === 0) return res.status(404).send("Jogador não encontrado");
    res.send("Jogador atualizado com sucesso");
  });
};

// Atualiza os dados de uma jogador pelo nickname
exports.atualizarJogadorNick = (req, res) => {
  const { nome, nickname } = req.body;

  // Validação dos dados recebidos
  if (!nome || !nickname) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  jogadorModel.atualizarJogadorNick(req.params.nickname, req.body, (err, result) => {
    if (err) return res.status(500).send("Erro ao atualizar jogador");
    if (result.affectedRows === 0) return res.status(404).send("Jogador não encontrado");
    res.send("Jogador atualizado com sucesso");
  });
};

// Remove uma jogador do banco de dados
exports.deletarJogador = (req, res) => {
  jogadorModel.deletarJogador(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Erro ao deletar jogador");
    if (result.affectedRows === 0) return res.status(404).send("Jogador não encontrado");
    res.send("Jogador deletado com sucesso");
  });
};
