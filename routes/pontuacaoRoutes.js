const express = require('express');
const pontuacaoController = require('../controllers/pontuacaoController');
const router = express.Router();

// Rota GET /pontuacao - lista o ranking
router.get("/pontuacao", pontuacaoController.buscarTodos);

// Rota GET /pontuacao/:id - busca uma pontuacao por ID do jogo
router.get("/id/:idJogo", pontuacaoController.buscarPontuacaoIdJogo);

// Rota GET /top - busca uma pontuacao popular
router.get("/top", pontuacaoController.buscarPontuacaoPopular);

// Rota POST /pontuacao - adiciona nova pontuacao
router.post("/inserir", pontuacaoController.inserirPontuacao);

module.exports = router;
