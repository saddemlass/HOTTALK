const path = require('path');

// Contrôleur d'upload de profil
exports.uploadProfile = (req, res, next) => {
  // Log pour vérifier la réception du fichier
  console.log('upload hit, req.file =', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  // Construire l'URL publique vers le fichier uploadé
  const publicUrl = `/uploads/${req.file.filename}`;
  res.json({ url: publicUrl });
};
