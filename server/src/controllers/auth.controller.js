/** @format */

// src/controllers/auth.controller.js
const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");

const registerCustomer = async (req, res) => {
	try {
		const { fullName, email, mobileNumber, address, password } = req.body;

		// Check if user already exists
		const existingUser = await authService.checkEmailExists(email);
		if (existingUser) {
			return errorResponse(res, "User already exists with this email", 400);
		}

		// Hash password
		const hashedPassword = await authService.hashPassword(password);

		// Generate token
		const token = authService.generateToken({ email, role: "customer" });

		// Create user data
		const userData = {
			fullName,
			email,
			mobileNumber,
			password: hashedPassword,
			role: "customer",
			token,
		};

		// Create customer data
		const customerData = { address };

		// Create customer
		const result = await authService.createCustomer(userData, customerData);

		// Remove password from response
		const { password: _, ...userWithoutPassword } = result.user;

		console.log(
			"Customer account created successfully",
			userWithoutPassword,
			token,
		);
		return successResponse(
			res,
			"Customer account created successfully",
			{ user: userWithoutPassword, token },
			201,
		);
	} catch (error) {
		console.error("Customer registration error:", error);
		return errorResponse(res, "Internal server error", 500, error.message);
	}
};

const registerSeller = async (req, res) => {
	try {
		const {
			fullName,
			email,
			mobileNumber,
			shopName,
			shopDescription,
			businessAddress,
			password,
		} = req.body;

		// Check if user already exists
		const existingUser = await authService.checkEmailExists(email);
		if (existingUser) {
			return errorResponse(res, "User already exists with this email", 400);
		}

		// Hash password
		const hashedPassword = await authService.hashPassword(password);

		// Generate token
		const token = authService.generateToken({ email, role: "seller" });

		// Create user data
		const userData = {
			fullName,
			email,
			mobileNumber,
			password: hashedPassword,
			role: "seller",
			token,
		};

		// Create seller data
		const sellerData = {
			shopName,
			shopDescription,
			businessAddress,
		};

		// Create seller
		const result = await authService.createSeller(userData, sellerData);

		// Remove password from response
		const { password: _, ...userWithoutPassword } = result.user;

		console.log(
			"Seller account created successfully",
			userWithoutPassword,
			token,
		);
		return successResponse(
			res,
			"Seller account created successfully",
			{ user: userWithoutPassword, token },
			201,
		);
	} catch (error) {
		console.error("Seller registration error:", error);
		return errorResponse(res, "Internal server error", 500, error.message);
	}
};

//-------------------------------------LOGIN-------------------------------------
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await authService.findUserByEmail(email);

		if (!user) {
			return errorResponse(res, "Invalid email or password", 401);
		}

		// Verify password
		const isPasswordValid = await authService.verifyPassword(
			password,
			user.password,
		);

		if (!isPasswordValid) {
			return errorResponse(res, "Invalid email or password", 401);
		}

		// Generate new token
		const token = authService.generateToken({
			id: user.id,
			email: user.email,
			role: user.role,
		});

		// Update user token in database
		await authService.updateUserToken(user.id, token);

		// Prepare user data without password
		const { password: _, ...userWithoutPassword } = user;

		// Include additional data based on role
		let userData = { ...userWithoutPassword };
		if (user.role === "customer" && user.customer) {
			userData.address = user.customer.address;
		} else if (user.role === "seller" && user.seller) {
			userData.shopName = user.seller.shopName;
			userData.shopDescription = user.seller.shopDescription;
			userData.businessAddress = user.seller.businessAddress;
		}

		console.log("Login successful", userData, token);
		return successResponse(
			res,
			"Login successful",
			{ user: userData, token },
			200,
		);
	} catch (error) {
		console.error("Login error:", error);
		return errorResponse(res, "Internal server error", 500, error.message);
	}
};

module.exports = {
	registerCustomer,
	registerSeller,
	login,
};
