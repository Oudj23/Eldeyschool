const Student = require('../Models/Student');
const bcrypt = require('bcrypt');

exports.createStudent = async (req, res) => {
    try {
        const { Nom_Prénom, Email, Classe, Téléphone, Password } = req.body;

        if (!Nom_Prénom || !Email || !Classe || !Téléphone || !Password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingStudent = await Student.findOne({ Email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newStudent = new Student({
            Nom_Prénom,
            Email,
            Classe,
            Téléphone,
            Password, // ⬅️ plain password — schema will hash it
        });

        await newStudent.save();
        res.status(201).json(newStudent);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.showstudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des étudiants", error: err.message });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nom_Prénom, Email, Classe, Téléphone, Password } = req.body;

    if (!Nom_Prénom || !Email || !Classe || !Téléphone) {
      return res.status(400).json({ error: 'All fields except password are required.' });
    }

    const updateData = {
      Nom_Prénom,
      Email,
      Classe,
      Téléphone
    };

    if (Password) {
      const bcrypt = require('bcrypt');
      updateData.Password = await bcrypt.hash(Password, 10);
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
