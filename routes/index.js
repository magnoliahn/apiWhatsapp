// routes/index.js
const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const { handleSend } = require('../controllers/messageController');

// Rota para envio de mensagens, aplicando o rate limiter
router.get('/send', rateLimiter, handleSend);

module.exports = router;
