const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  LessonName: String,
  Content: String,        // Link to YouTube or PDF
  Type: String,           // 'youtube' or 'pdf'
  UnitId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Unit',
  required: true
}

});

module.exports = mongoose.model('Lesson', lessonSchema);

