// server/models/Session.js
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true },
  user_uuid:  { type: String, required: true },
  createdAt:  { type: Date, default: Date.now },
  expiresAt:  { type: Date, required: true }
});

// Index TTL pour purge automatique
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Session', SessionSchema);
