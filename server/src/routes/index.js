// src/routes/index.js
const express = require('express');
const authRoutes = require('./auth.routes');
// Import other routes as needed

const router = express.Router();

// API routes
router.use('/auth', authRoutes);
// Add other routes here

module.exports = router;