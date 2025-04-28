# Curso Superior de Análise e Desenvolvimento de Sistemas
## Desenvolvimento de Serviços Web
**Prof. Dr. Maurício Covolan Rosito**

# PROVA P1

---

## INSTRUÇÕES GERAIS
- Esta é uma prova prática, individual e com consulta permitida.
- A nota desta atividade corresponde a 50% da avaliação final da disciplina.

---

## CRITÉRIOS DE AVALIAÇÃO
- Estrutura do projeto organizada (separação de rotas, controllers, conexão DB)
- Implementação completa do CRUD básico
- Relacionamento entre tabelas corretamente implementado
- Lógica correta na geração do ranking (ordenação decrescente por pontuação)
- Teste da API com o Rest API, Postman ou similar
- Boas práticas: uso de async/await, tratamento de erros, mensagens claras

---

## CONTEXTO
Você foi contratado por uma comunidade de entusiastas de jogos clássicos para desenvolver uma API que armazene informações sobre jogos retrô e permita que jogadores registrem suas pontuações, gerando um ranking competitivo para cada jogo.

---

## OBJETIVO
Desenvolver uma API RESTful utilizando **Node.js com Express** e **banco de dados MySQL** que permita o gerenciamento de jogos retrô, jogadores e seus rankings.

---

## REQUISITOS FUNCIONAIS

### 1) Jogos
- Um jogo deve ter os seguintes campos:
  - `id`
  - `nome`
  - `plataforma` (Super Nintendo, Mega Drive, Atari)
  - `ano de lançamento`
- Rotas obrigatórias:
  - `GET /jogos` – listar todos os jogos.
  - `GET /jogos/:id` – buscar jogo por ID.
  - `POST /jogos` – cadastrar novo jogo.
  - `PUT /jogos/:id` – atualizar um jogo existente.
  - `DELETE /jogos/:id` – excluir um jogo.

---

### 2) Jogadores
- Um jogador deve ter os seguintes campos:
  - `id`
  - `nome`
  - `nickname` (único no banco de dados)
- Rotas obrigatórias:
  - `GET /jogadores` – listar todos os jogadores.
  - `POST /jogadores` – cadastrar um novo jogador.

---

### 3) Pontuações
- Cada jogador pode registrar múltiplas pontuações para diferentes jogos.
- A tabela sobre as pontuações deve conter:
  - `id`
  - chave estrangeira para jogos
  - chave estrangeira para jogadores
  - `pontuação`
  - `data de registro`
- Rotas obrigatórias:
  - `POST /pontuacoes` – cadastrar uma nova pontuação (deve verificar se o jogo e o jogador existem).
  - `GET /ranking/:idJogo` – listar os 10 jogadores com as maiores pontuações para um jogo específico.
  - `GET /jogos/populares` – retornar os 3 jogos com maior número de pontuações registradas.
- Validação: impedir que um jogador registre pontuação negativa.

---

## INSTALAÇÃO

1.  Clone o repositório do GitHub:
    ```bash
    git clone https://github.com/AmaralSza/RetroGamesAPI.git
    ```

2.  Navegue até a pasta do projeto:
    ```bash
    cd RetroGamesAPI
    ```

3.  Inicialize um novo projeto Node.js (caso ainda não tenha um `package.json`):
    ```bash
    npm init -y
    ```

4.  Abra o arquivo `package.json` e edite a seção `"scripts"` para incluir as informações para funcionamento do Nodemon:

    ```json
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

5.  Instale as bibliotecas necessárias para o nosso projeto:
    ```bash
    npm install express mysql2
    npm install nodemon --save-dev
    npm install date-fns-tz

## RODAR A API

Para iniciar a API em modo de desenvolvimento (com recarregamento automático usando Nodemon), execute o seguinte comando no terminal dentro da pasta do projeto:

```bash
npm run dev
