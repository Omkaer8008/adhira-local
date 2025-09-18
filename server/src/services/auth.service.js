/** @format */

// src/services/auth.service.js
const bcrypt = require("bcryptjs");
const prisma = require("../config/db"); // Import the singleton instance
const { generateToken } = require("../utils/jwt.util");

const safeQuery = async (queryFunc) => {
	try {
		return await queryFunc();
	} catch (error) {
		if (
			error.message.includes("prepared statement") ||
			error.code === "42P05"
		) {
			console.warn("Prepared statement error, retrying...");
			// Wait a bit and retry
			await new Promise((resolve) => setTimeout(resolve, 100));
			return await queryFunc();
		}
		throw error;
	}
};

const checkEmailExists = async (email) => {
	return await safeQuery(() =>
		prisma.user.findUnique({
			where: { email },
		}),
	);
};

const hashPassword = async (password) => {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

const findUserByEmail = async (email) => {
	try {
		return await safeQuery(() =>
			prisma.user.findUnique({
				where: { email },
				include: {
					customer: true,
					seller: true,
				},
			}),
		);
	} catch (error) {
		console.error("Error finding user by email:", error);
		throw error;
	}
};

const updateUserToken = async (userId, token) => {
	try {
		return await safeQuery(() =>
			prisma.user.update({
				where: { id: userId },
				data: { token },
			}),
		);
	} catch (error) {
		console.error("Error updating user token:", error);
		throw error;
	}
};

// Customer and seller creation functions
const createCustomer = async (userData, customerData) => {
	return await prisma.$transaction(async (tx) => {
		const user = await safeQuery(() =>
			tx.user.create({
				data: userData,
			}),
		);

		const customer = await safeQuery(() =>
			tx.customer.create({
				data: {
					...customerData,
					userId: user.id,
				},
			}),
		);

		return { user, customer };
	});
};

const createSeller = async (userData, sellerData) => {
	return await prisma.$transaction(async (tx) => {
		const user = await safeQuery(() =>
			tx.user.create({
				data: userData,
			}),
		);

		const seller = await safeQuery(() =>
			tx.seller.create({
				data: {
					...sellerData,
					userId: user.id,
				},
			}),
		) ;

		return { user, seller };
	});
};

module.exports = {
	checkEmailExists,
	hashPassword,
	verifyPassword,
	findUserByEmail,
	updateUserToken,
	createCustomer,
	createSeller,
	generateToken,
};
