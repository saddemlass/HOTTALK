// server/routes/auth.js

const express       = require('express');
const authController = require('../controllers/authController');
const router         = express.Router();

// Connexion anonyme (session cookie)
router.post('/anonymous', authController.anonymous);

// Authentification JWT
router.post('/login',   authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout',  authController.logout);

module.exports = router;
