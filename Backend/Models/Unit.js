const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  Unitname: { type: String, required: true },
  Levels: {type:String,required:true},
  LessonsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});

module.exports = mongoose.model('Unit', UnitSchema);
