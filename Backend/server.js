const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// DB
require('./Config/db');

// Routes
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Serve frontend
const possiblePaths = [
  path.join(__dirname, '../Frontend/dist'),
  path.join(__dirname, '../Frontend/build')
];

let frontendPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(path.join(p, 'index.html'))) {
    frontendPath = p;
    console.log(`✅ Serving frontend from: ${p}`);
    break;
  }
}

if (frontendPath) {
  app.use(express.static(frontendPath));

  // Fallback to index.html for React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  console.error('❌ Frontend build not found in dist/ or build/');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
