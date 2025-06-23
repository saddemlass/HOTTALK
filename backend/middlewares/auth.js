// server/middlewares/auth.js
// Middleware commun : session cookie + JWT Bearer

const jwt = require('jsonwebtoken');
const Session = require('../models/Session');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    // 1) Vérification de la session cookie
    const sessionId = req.cookies.session_id;
    if (!sessionId) {
      return res.status(401).json({ error: 'Session manquante' });
    }
    const session = await Session.findOne({ session_id: sessionId });
    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Session invalide ou expirée' });
    }

    // 2) Vérification du JWT si présent
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userUUID = payload.userUUID;
        return next();
      } catch {
        return res.status(403).json({ error: 'Token invalide ou expiré' });
      }
    }

    // 3) Sinon, valoriser userUUID depuis la session
    req.userUUID = session.user_uuid;
    next();
  } catch (err) {
    next(err);
  }
};
