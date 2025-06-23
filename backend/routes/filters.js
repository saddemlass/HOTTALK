// server/routes/filters.js
const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');
const auth = require('../middlewares/auth');

// Envoie des préférences pour matchmaking
router.post('/', auth, filterController.setPreferences);

module.exports = router;