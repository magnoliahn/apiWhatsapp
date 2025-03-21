// importando os modulos do nodejs permitindo ler e escrever arquivos
//  trabalhar com caminhos de diretorios
const fs = require('fs');
const path = require('path');

module.exports = function log(data) {
  try {
    // função que recebe um objeto data com informações (como IP, URL e status).
    const logFilePath = path.join(__dirname, '..', 'log.json');
    const currentLog = fs.existsSync(logFilePath)
      ? JSON.parse(fs.readFileSync(logFilePath, 'utf8'))
      : [];

    // se existir o arquivo log.json transforma o conteudo em um array; se não, usa um array vazio.
    const logEntry = {
      ip: data.ip,
      url: data.url,
      status: data.status,
      date: new Date().toISOString()
    }; 

    currentLog.push(logEntry);

   // fs.writeFileSync o código aguarda até que a escrita seja concluída
   // logFilePath e o caminho do log.json
   // JSON.stringify(currentLog, null, 2): Converte o array currentLog em uma string no formato JSON
   // utf8 formata e garante que os caracteres sejam salvos corretamente
    fs.writeFileSync(logFilePath, JSON.stringify(currentLog, null, 2), 'utf8');
  } catch (err) {
    console.error('Erro ao escrever log:', err.message);
  }
};
