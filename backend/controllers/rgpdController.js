// server/controllers/rgpdController.js
const RGPDEntry = require('../models/RGPDEntry');

// GET /api/rgpd
exports.list = async (req, res, next) => {
  try {
    const entries = await RGPDEntry.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

// POST /api/rgpd
exports.create = async (req, res, next) => {
  try {
    const entry = await RGPDEntry.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

// PUT /api/rgpd/:id
exports.update = async (req, res, next) => {
  try {
    const entry = await RGPDEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/rgpd/:id
exports.remove = async (req, res, next) => {
  try {
    await RGPDEntry.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};