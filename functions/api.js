const app = require('../src/app');
const serverless = require('serverless-http');

// Create API for serverless use
module.exports.handler = serverless(app);
