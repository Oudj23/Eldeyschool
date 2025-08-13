const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// API routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// API 404
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Frontend fallback (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
