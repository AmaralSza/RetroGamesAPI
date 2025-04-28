-- Cria o banco de dados caso não exista
CREATE DATABASE IF NOT EXISTS retro_games;

-- Seleciona o banco de dados
USE retro_games;

-- Cria a tabela de jogos
CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    plataforma VARCHAR(255) NOT NULL,
    ano_lancamento INT
);

-- Cria a tabela de jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) UNIQUE NOT NULL
);

-- Cria a tabela de pontuações
CREATE TABLE IF NOT EXISTS pontuacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_jogo INT NOT NULL,
    id_jogador INT NOT NULL,
    pontuacao INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_jogo) REFERENCES jogos(id),
    FOREIGN KEY (id_jogador) REFERENCES jogadores(id)
);