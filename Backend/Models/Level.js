const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  levelName: { type: String, required: true },
  unitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }]
});

module.exports = mongoose.model('Level', LevelSchema);
