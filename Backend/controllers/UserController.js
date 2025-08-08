const Student = require('../Models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log("Received body:", req.body);

    try {
        const student = await Student.findOne({ Email: email });

        if (!student) {
            return res.status(400).json({ message: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, student.Password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { id: student._id, Role: student.Role,Classe : student.Classe, },
            process.env.JWT_SECRET ,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                email: student.Email,
                role: student.Role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
