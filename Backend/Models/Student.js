const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
  Nom_Prénom: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Classe: {
    type: String,
    required: true
  },
  Téléphone: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Role:{
    type : String,
    default : 'student'
  }
});

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('students', StudentSchema);
