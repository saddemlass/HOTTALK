// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_uuid: { type: String, required: true, unique: true },
  nickname:  { type: String, default: 'Anonyme' },
  profileImage: { type: String }  // chemin vers l’upload
});

module.exports = mongoose.model('User', UserSchema);
