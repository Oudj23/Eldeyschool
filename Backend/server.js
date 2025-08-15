const express = require('express');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const app = express();
const mime = require('mime');
mime.define({ 'text/css': ['css'] }); // optional if Express is configured wrong
// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// DB
require('./Config/db');
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
