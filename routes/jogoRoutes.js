const express = require('express');
const jogoController = require('../controllers/jogoController');
const router = express.Router();

// Rota GET /jogos - lista todos os jogos
router.get("/", jogoController.buscarTodosJogos);

// Rota GET /jogos/:id - busca livro por ID
router.get("/:id", jogoController.buscarJogosId);

// Rota POST /jogos/inserir - adiciona novo jogo
router.post("/inserir", jogoController.inserirJogo);

// Rota PUT /jogos/:id - atualiza um jogo
router.put("/:id", jogoController.atualizarJogo);

// Rota DELETE /jogos/:id - remove um jogo
router.delete("/:id", jogoController.deletarJogo);

module.exports = router;
