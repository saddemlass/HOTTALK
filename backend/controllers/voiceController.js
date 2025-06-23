// server/controllers/voiceController.js
const VoiceNote = require('../models/VoiceNote');
const path = require('path');

// POST /api/voice-notes
exports.upload = async (req, res, next) => {
  try {
    const { user_uuid, room_id } = req.body;
    const file = req.files.file;
    // assume middleware for file parsing
    const filePath = `/uploads/${file.name}`;
    // moving file already handled by multer config
    const note = await VoiceNote.create({ user_uuid, room_id, filePath });
    // emit event via Socket.IO
    req.app.get('io').to(room_id).emit('voice-note', { user_uuid, filePath });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};