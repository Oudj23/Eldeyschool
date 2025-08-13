const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// API routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// 🔥 Catch-all: Serve index.html for any other route (support React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
