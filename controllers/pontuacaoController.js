const pontuacaoModel = require('../models/pontuacaoModel');
const jogoModel = require('../models/jogoModel');
const jogadorModel = require('../models/jogadorModel');
const { formatDate } = require('../utils/dateFormatter');

// Lista todas as pontuacaos cadastradas
exports.buscarTodos = (req, res) => {
  pontuacaoModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar as pontuações");
    if (results.length === 0) return res.status(404).send("Nenhuma pontuação encontrada");

    const formattedResults = results.map(pontuacao => ({
      ...pontuacao,
      data_registro: formatDate(pontuacao.data_registro),
    }));

    res.json(formattedResults);
  });
};


// Busca pontuacao pelo ID do jogo
exports.buscarPontuacaoIdJogo = (req, res) => {
  pontuacaoModel.buscarPontuacaoIdJogo(req.params.idJogo, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar jogo");
    if (!results || results.length === 0) return res.status(404).send("Nenhuma pontuação encontrada para este jogo");

    const formattedResult = {
      ...results[0],
      data_registro: formatDate(results[0].data_registro),
    };

    res.json(formattedResult);
  });
};

// Lista ranking popular
exports.buscarPontuacaoPopular = (req, res) => {
  pontuacaoModel.buscarPontuacaoPopular((err, results) => {
    if (err) return res.status(500).send("Erro ao listar ranking");
    const formattedResults = results.map(pontuacao => ({
      ...pontuacao,
      ultima_pontuacao_registrada: formatDate(pontuacao.ultima_pontuacao_registrada),
    }));

    res.json(formattedResults);
  });
};

// Adiciona uma nova pontuacao, com validação dos campos
exports.inserirPontuacao = async (req, res) => {
  const { id_jogo, id_jogador, pontuacao } = req.body;

  // Validação dos campos obrigatórios
  if (!id_jogo || !id_jogador || pontuacao === undefined) {
    return res.status(400).send("ID do jogo, ID do jogador e pontuação são obrigatórios");
  }

  if (pontuacao < 0) {
    return res.status(400).json({ message: 'A pontuação não pode ser negativa' });
  }

  try {
    const jogoExiste = await new Promise((resolve, reject) => {
      jogoModel.buscarJogosId(id_jogo, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result && result.length > 0 ? result[0] : undefined);
      });
    });

    const jogadorExiste = await new Promise((resolve, reject) => {
      jogadorModel.buscarJogadorId(id_jogador, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result && result.length > 0 ? result[0] : undefined);
      });
    });

    console.log("Teste jogo:", jogoExiste);
    console.log("Teste jogador:", jogadorExiste);

    if (!jogoExiste || !jogadorExiste) {
      return res.status(404).json({ message: 'Jogo ou jogador não encontrado' });
    }

    const novaPontuacaoId = await pontuacaoModel.inserirPontuacao({ id_jogo, id_jogador, pontuacao });
    res.status(201).json({ id: novaPontuacaoId, message: 'Pontuação registrada com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar pontuação:', error);
    res.status(500).json({ message: 'Erro ao cadastrar pontuação' });
  }
};