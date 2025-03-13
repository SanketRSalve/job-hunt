const express = require('express');
const serverless = require("serverless-http");
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
// Initialize Express app
const app = express();

// Serve Static Files
app.use(express.static(path.join(__dirname, '../public')));

// Use Routes
app.use('/api', uploadRoutes);

// Use serverless for netlify deploy

module.exports.handler = serverless(app);