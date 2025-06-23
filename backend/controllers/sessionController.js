// server/controllers/sessionController.js
const Session = require('../models/Session');

// DELETE /api/session/purge
// Purge manuelle des sessions expirées (en plus du TTL Mongo)
exports.purgeExpired = async (req, res, next) => {
  try {
    const now = new Date();
    const result = await Session.deleteMany({ expiresAt: { $lte: now } });
    return res.json({ message: `Purgé ${result.deletedCount} sessions expirées.` });
  } catch (err) {
    next(err);
  }
};
