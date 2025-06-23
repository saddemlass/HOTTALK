// server/controllers/filterController.js
const matchmaking = require('../services/matchmaking');

// POST /api/filters
// Reçoit les préférences, stocke en file d’attente et tente un pairing
exports.setPreferences = async (req, res, next) => {
  try {
    const { user_uuid, filters } = req.body;
    if (!Array.isArray(filters) || filters.length === 0) {
      return res.status(400).json({ error: 'Filtres requis.' });
    }
    // On ajoute le user et ses filtres à la file d’attente
    const match = matchmaking.joinQueue(user_uuid, filters);
    if (match) {
      // Le service a trouvé un pair immédiatement
      return res.json({ matched: true, peer_uuid: match.peer_uuid, room_id: match.room_id });
    } else {
      // En attente
      return res.json({ matched: false });
    }
  } catch (err) {
    next(err);
  }
};
