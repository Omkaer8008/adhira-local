/** @format */

// src/routes/auth.routes.js
const express = require("express");
const {
	registerCustomer,
	registerSeller,
	login,
} = require("../controllers/auth.controller");

const {
	validateCustomerRegistration,
	validateSellerRegistration,
	validateLogin,
} = require("../middlewares/validate.middleware");

const router = express.Router();

// In your auth.routes.js or health route
router.get('/health', async (req, res) => {
  try {
    // Use a simpler query that's less likely to cause prepared statement issues
    const result = await prisma.user.count();
    
    res.status(200).json({ 
      success: true, 
      message: 'Database connection healthy',
      userCount: result
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Customer registration route
router.post(
	"/register/customer",
	validateCustomerRegistration,
	registerCustomer,
);
// Add to auth.routes.js

// Seller registration route
router.post("/register/seller", validateSellerRegistration, registerSeller);

router.post("/login", validateLogin, login);

module.exports = router;
