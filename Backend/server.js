const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config(); // Load .env variables

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

// 🔥 Toutes les routes non API => index.html (pour React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// DB connection
require('./Config/db');
app.get('/test', (req, res) => {
  res.json({ message: "Test route works ✅" });
});

// Admin Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);
// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
