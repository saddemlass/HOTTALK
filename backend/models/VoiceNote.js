// server/models/VoiceNote.js
const mongoose = require('mongoose');

const VoiceNoteSchema = new mongoose.Schema({
  user_uuid: { type: String, required: true },
  room_id: { type: String, required: true },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

module.exports = mongoose.model('VoiceNote', VoiceNoteSchema);
