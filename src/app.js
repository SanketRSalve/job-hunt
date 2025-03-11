const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
// Initialize Express app
const app = express();

// Serve Static Files
app.use(express.static(path.join(__dirname, '../public')));

// Use Routes
app.use('/api', uploadRoutes);


module.exports = app;
