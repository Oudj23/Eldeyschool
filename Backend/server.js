const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');
// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// DB connection
require('./Config/db');

// Admin Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);


// Serve static files from React build folder
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
