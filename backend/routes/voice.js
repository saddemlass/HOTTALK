// server/routes/voice.js
const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');
const auth = require('../middlewares/auth');

// Upload et diffusion de messages vocaux
router.post('/', auth, voiceController.upload);

module.exports = router;
