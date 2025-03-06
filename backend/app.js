
const express = require('express');
const dotenv=require("dotenv");
dotenv.config();
// const bcrypt = require('bcrypt');
const cors = require('cors');
const { connectToDatabase } = require('./PrismaClient/Prismaclient');
// const jwt = require('jsonwebtoken');
const app = express();

// async function main() {
//     await prisma.$connect();
//     console.log('✅ Connected to PostgreSQL database successfully!');
// }

// main()
// .catch(console.error)
// .finally(() => prisma.$disconnect());
connectToDatabase();

app.use(cors());
app.use(express.json())




app.use("/user",require("./Routes/userRoute"));




app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});