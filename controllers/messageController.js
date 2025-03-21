// controllers/messageController.js
const path = require('path');
const fs = require('fs');
const wppService = require('../services/wppService');
const logger = require('../utils/logger');
const auditData = require('../audit.json');

async function handleSend(req, res) {
  try {
    // 1. Coleta dos dados
    const host = req.headers.host;
    const token = req.query.token;
    const type = req.query.type;
    const telNumber = req.query.telNumber;
    const message = req.query.message;
    const templateName = req.query.templateName;

    // 2. Validação do host e token
    const isValid = auditData.some(item => {
      return item.url === host && item.token === token;
    });
    
    if (!isValid) {
      logger({
        ip: req.ip,
        url: req.originalUrl,
        status: 'Não autorizado (403)',
      });
      return res.status(403).json({
        status: 403,
        message: 'Acesso não autorizado'
      });
    }
    
    // 3. Chama o serviço de envio conforme o type
    if (type === 'text') {
      if (!telNumber || !message) {
        throw new Error('Parâmetros insuficientes para type=text');
      }
      await wppService.sendText(telNumber, message);
    } else if (type === 'template') {
      if (!telNumber || !templateName) {
        throw new Error('Parâmetros insuficientes para type=template');
      }
      await wppService.sendTemplate(telNumber, templateName);
    } else {
      throw new Error('Tipo de mensagem inválido. Use "text" ou "template".');
    }
    
    // 4. Se o envio foi realizado sem erros, retorna sucesso
    logger({
      ip: req.ip,
      url: req.originalUrl,
      status: 'Sucesso (200)',
    });
    return res.status(200).json({
      status: 200,
      message: 'Mensagem enviada com sucesso'
    });
    
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err.response?.data || err.message);
    logger({
      ip: req.ip,
      url: req.originalUrl,
      status: `Erro interno (500) - ${err.message}`
    });
    return res.status(500).json({
      status: 500,
      message: 'Falha ao enviar mensagem'
    });
  }
}

module.exports = { handleSend };
