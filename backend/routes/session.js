// server/routes/session.js
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middlewares/auth');

// Purge manuelle des sessions expirées (accessible admin)
router.delete('/purge', auth, sessionController.purgeExpired);

module.exports = router;