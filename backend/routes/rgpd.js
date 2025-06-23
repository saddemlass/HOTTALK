// server/routes/rgpd.js
const express = require('express');
const router = express.Router();
const rgpdController = require('../controllers/rgpdController');
const auth = require('../middlewares/auth');

// CRUD du registre RGPD
router.get('/', auth, rgpdController.list);
router.post('/', auth, rgpdController.create);
router.put('/:id', auth, rgpdController.update);
router.delete('/:id', auth, rgpdController.remove);

module.exports = router;