const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config(); // Load .env variables

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static(path.join(__dirname, '../Frontend/dist')));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
require('./Config/db');

// Admin Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
