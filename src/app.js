const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
// Initialize Express app
const app = express();

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  

// Serve Static Files
app.use(express.static(path.join(__dirname, '../public')));

// Use Routes
app.use(express.json());
app.use('/api', uploadRoutes);

module.exports = app;
