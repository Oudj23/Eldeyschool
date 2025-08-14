const express = require('express');
// In adminRoutes.js, change the first line to:
const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const UnitController = require('../controllers/UnitController');
const Student = require('../Models/Student');
const lessonController = require('../controllers/lessonController');
const upload = require('../Middlewares/multer');
const Lesson = require('../Models/Lesson'); // ✅ Import the Lesson model
const UserController = require('../controllers/UserController')
const path = require('path');
router.post('/add', AdminController.createStudent);
router.get('/showstudents', AdminController.showstudents);
console.log('Registering routes...');
router.post('/create-unit', UnitController.createUnit);
router.get('/get-units', UnitController.getUnits);
router.delete('/delete/:id', AdminController.deleteStudent);
router.put('/update/:id', AdminController.updateStudent);
router.post('/create-lesson', upload.single('content'), lessonController.createLesson);
router.post('/login',UserController.login)

// Example Express route
router.get('/get-lessons/:unitId', async (req, res) => {
  const { unitId } = req.params;
  try {
    const lessons = await Lesson.find({ UnitId: unitId });
    res.json({ lessons });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch lessons' });
  }
});


// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'Frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/dist', 'index.html'));
});
router.get('/search', async (req, res) => {
  const { name } = req.query;

  try {
    const regex = new RegExp(name, 'i'); // case-insensitive partial match
    const students = await Student.find({ Nom_Prénom: { $regex: regex } });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la recherche.' });
  }
});



module.exports = router;
