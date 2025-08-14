const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// DB connection
require('./Config/db');

// Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Serve static files from the copied build directory
const frontendPath = path.join(__dirname, 'dist');
app.use(express.static(frontendPath));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});