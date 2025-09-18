// src/config/db.js - Ultra minimal
const { PrismaClient } = require('@prisma/client');
module.exports = new PrismaClient();