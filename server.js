// carrega as variáveis do .env para o  process.env
require('dotenv').config();
// instanciando o uso do express
const express = require('express');
const app = express();

// configura o middleware paa interpretar req json/post
app.use(express.json());

// importa e aplica as rotas
const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
