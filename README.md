---

# 📱 API WhatsApp - Disparo de Mensagens Automáticas

Este projeto é uma API simples para envio de mensagens automáticas pelo WhatsApp, ideal para integrações com sistemas que precisam se comunicar com usuários em tempo real.

---

## 🚀 Tecnologias Utilizadas
- **Node.js**  
- **Express.js**  
- **Axios** (para chamadas HTTP)  
- **dotenv** (gerenciamento de variáveis de ambiente)

---

## ⚙️ Como Funciona

A API disponibiliza uma rota `/send` que permite enviar:
- Mensagens de **texto simples**
- Mensagens via **template do WhatsApp**

O acesso é protegido por **token** e limitado por um **rate limiter** (no máximo 50 requisições por minuto por IP).

---

## 🛠️ Como Rodar o Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/magnoliahn/apiWhatsapp.git
   cd apiWhatsapp
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o ambiente**
   - Crie um arquivo `.env` com:
     ```env
     PORT=3001
     WHATSAPP_API_URL=https://graph.facebook.com/v13.0/<YOUR_PHONE_NUMBER_ID>/messages
     WHATSAPP_TOKEN=<YOUR_WHATSAPP_API_TOKEN>
     ```

4. **Inicie a API**
   ```bash
   npm start
   ```

---

## 📨 Endpoints

### Enviar Mensagem

- **Rota:** `GET /send`
- **Parâmetros Query:**
  | Parâmetro    | Obrigatório | Descrição                                    |
  |--------------|-------------|----------------------------------------------|
  | `token`      | ✅           | Token de autenticação                       |
  | `type`       | ✅           | Tipo da mensagem: `text` ou `template`       |
  | `telNumber`  | ✅           | Número do telefone (com DDI, exemplo: `5511999999999`) |
  | `message`    | ➖ (para `text`) | Conteúdo da mensagem                       |
  | `templateName` | ➖ (para `template`) | Nome do template cadastrado no WhatsApp |

- **Exemplo de chamada:**
  ```bash
  curl "http://localhost:3001/send?token=SEU_TOKEN&type=text&telNumber=5511999999999&message=Olá%20Mundo"
  ```

---

## 🛡️ Segurança e Controle

- **Token de Autenticação:** Validação contra dados registrados no `audit.json`.
- **Rate Limiting:** Máximo de 50 requisições por minuto por IP.
- **Logs:** Cada requisição é registrada no arquivo `log.json`.

---

## 📋 Observações Importantes
- A API é preparada para lidar com fallback de templates (ex.: se `pt_BR` falhar, tenta `en_US`).
- É necessário ter o número aprovado e o template validado no **WhatsApp Business API**.
- Os erros de envio são tratados e logados para facilitar o diagnóstico.

---

## 📝 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, estudar e contribuir! 🚀

---

# 📚 Referências
- [Documentação oficial WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

---
