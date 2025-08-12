const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve static files (Vite or React build) from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// DB connection
require('./Config/db');

// API Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Fallback for React Router (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
