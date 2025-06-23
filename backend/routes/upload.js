// server/routes/upload.js
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const { uploadProfile } = require('../controllers/uploadController');
const router  = express.Router();

// Stockage en disk, dossier public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    // Préfixe par timestamp pour éviter collisions
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('profile'), uploadProfile);

module.exports = router;
