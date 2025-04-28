// Importa o framework Express, responsável por criar o servidor e gerenciar as rotas
const express = require("express");

// Inicializa o aplicativo Express
const app = express();

// Importa as rotas do módulo de jogo
const jogoRoutes = require('./routes/jogoRoutes');

// Importa as rotas do módulo de jogador
const jogadorRoutes = require('./routes/jogadorRoutes');

// Importa as rotas do módulo de pontuacao
const pontuacaoRoutes = require('./routes/pontuacaoRoutes');

// Middleware do Express para permitir o uso de JSON no corpo das requisições (body-parser embutido)
app.use(express.json());

// Usa as rotas de jogos com o prefixo /jogos
app.use('/jogos', jogoRoutes);

// Usa as rotas de jogos com o prefixo /jogos
app.use('/jogadores', jogadorRoutes);

// Rotas de pontuação
app.use('/rancking', pontuacaoRoutes);

// Inicia o servidor e o faz escutar na porta 3000
// Quando estiver rodando, exibe uma mensagem no terminal
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
