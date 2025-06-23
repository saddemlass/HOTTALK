// server/models/RGPDEntry.js
const mongoose = require('mongoose');

const RGPDEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  purpose: { type: String, required: true },
  dataCategories: [{ type: String }],
  controller: { type: String, required: true },
  processor: { type: String },
  legalBasis: { type: String, required: true },
  retention: { type: String, required: true },
  destruction: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('RGPDEntry', RGPDEntrySchema);
