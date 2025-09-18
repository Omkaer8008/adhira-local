/** @format */

const { PrismaClient } = require("../generated/prisma");

const prismaClientSingleton = () => {
	return new PrismaClient();
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

module.exports = prisma;

if (globalThis?.process?.env?.NODE_ENV !== "production")
	globalThis.prisma = prisma;
