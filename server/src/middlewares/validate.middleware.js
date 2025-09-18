/** @format */

// src/middlewares/validate.middleware.js
const { body, validationResult } = require("express-validator");

const validate = (validations) => {
	return async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		return res.status(400).json({
			success: false,
			message: "Validation failed",
			errors: errors.array(),
		});
	};
};

// Customer registration validation rules
const validateCustomerRegistration = validate([
	body("fullName").notEmpty().withMessage("Full name is required"),
	body("email").isEmail().withMessage("Valid email is required"),
	body("mobileNumber").notEmpty().withMessage("Mobile number is required"),
	body("address").notEmpty().withMessage("Address is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match");
		}
		return true;
	}),
]);

// Seller registration validation rules
const validateSellerRegistration = validate([
	body("fullName").notEmpty().withMessage("Full name is required"),
	body("email").isEmail().withMessage("Valid email is required"),
	body("mobileNumber").notEmpty().withMessage("Mobile number is required"),
	body("shopName").notEmpty().withMessage("Shop name is required"),
	body("shopDescription")
		.notEmpty()
		.withMessage("Shop description is required"),
	body("businessAddress")
		.notEmpty()
		.withMessage("Business address is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match");
		}
		return true;
	}),
]);

const validateLogin = validate([
	body("email").isEmail().withMessage("Valid email is required"),
	body("password").notEmpty().withMessage("Password is required"),
]);

module.exports = {
	validateCustomerRegistration,
	validateSellerRegistration,
	validateLogin,
};
