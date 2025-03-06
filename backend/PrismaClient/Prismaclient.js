const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Connected to PostgreSQL database successfully!');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error);
    }
};
module.exports = {prisma, connectToDatabase};