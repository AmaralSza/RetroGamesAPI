const express = require('express');
const jogadorController = require('../controllers/jogadorController');
const router = express.Router();

// Rota GET /jogador - lista todos os jogadores
router.get('/', jogadorController.buscarTodosJogadores);

// Rota GET /jogador/id/:id - busca um jogador por ID
router.get("/id/:id", jogadorController.buscarJogadorId);

// Rota GET /jogador/:nickname - busca um jogador pelo nickname
router.get("/nickname/:nickname", jogadorController.buscarJogadorNick);

// Rota POST /jogador - adiciona novo jogador
router.post("/", jogadorController.inserirJogador);

// Rota PUT /jogador/:id - atualiza jogador pelo ID
router.put("/id/:id", jogadorController.atualizarJogadorId);

// Rota PUT /jogador/:nickname - atualiza jogador pelo nickname
router.put("/nickname/:nickname", jogadorController.atualizarJogadorNick);

// Rota DELETE /jogador/:id - remove jogador pelo ID
router.delete("/:id", jogadorController.deletarJogador);

module.exports = router;
