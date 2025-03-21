// biblioteca que faz as req http
const axios = require('axios');
// carrega as variáveis do .env para o  process.env
require('dotenv').config();

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

module.exports = {
    async sendText(telNumber, message) {
        try {
            const payload = {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: telNumber,
                type: 'text',
                text: {
                    preview_url: false,
                    body: message
                }
            };

            const headers = {
                Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            };

            // log do payload para debug
            console.log('Enviando mensagem de texto com payload:', JSON.stringify(payload, null, 2));
            console.log('Enviando para URL:', WHATSAPP_API_URL);
            console.log('Headers:', JSON.stringify(headers, null, 2));

            const response = await axios.post(WHATSAPP_API_URL, payload, { headers });

            console.log('Resposta da API WhatsApp sendText:', JSON.stringify(response.data, null, 2));

            if (!response.data || !response.data.messages || response.data.messages.length === 0) {
                throw new Error('Mensagem de texto não enviada: resposta inválida da API');
            }
            const messageId = response.data.messages[0].id;
            console.log('Mensagem de texto enviada com sucesso, ID:', messageId);

            return true;
        } catch (err) {
            console.error('Erro no envio de mensagem de texto:', err.response?.data || err.message);
            throw new Error(err.response?.data?.error?.message || err.message);
        }
    },
      
  async sendTemplate(telNumber, templateName) {
    try {
      // 1. Tenta com pt_BR
      const payload = {
        messaging_product: 'whatsapp',
        to: telNumber,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'pt_BR'
          }
        }
      };

      const headers = {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      };

      let response = await axios.post(WHATSAPP_API_URL, payload, { headers });
      return true;
    } catch (err) {
      // 2. Se vier erro 132001, tenta en_US
      const errorCode = err.response?.data?.error?.code;
      if (errorCode === 132001) {
        try {
          const fallbackPayload = {
            messaging_product: 'whatsapp',
            to: telNumber,
            type: 'template',
            template: {
              name: templateName,
              language: {
                code: 'en_US'
              }
            }
          };

          const headers = {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
          };

          await axios.post(WHATSAPP_API_URL, fallbackPayload, { headers });
          return true;
        } catch (fallbackErr) {
          console.error('Erro no fallback en_US:', fallbackErr.response?.data || fallbackErr.message);
          return false;
        }
      } else {
        console.error('Erro geral no envio de template:', err.response?.data || err.message);
        return false;
      }
    }
  }
};
