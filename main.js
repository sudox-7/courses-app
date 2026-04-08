import express from 'express'
import mongoose from 'mongoose';
import courserouter from './routes/courses.js'
import userrouter from './routes/users.js'
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import { GlobalRouterHandler } from './middleware/global-router-handler.js'

const port = 3000;
// app express
const app = express();

// helmet security 
app.use(helmet());

// 
app.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

// Connecting to DB with error handling
async function connectDB() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env file');
    }
    await mongoose.connect(process.env.MONGO_URL, { dbName: 'main' });
    console.log("Server connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
await connectDB();

// json parsing middleware
app.use(express.json());

// CORS using
app.use(cors());

// courses router 
app.use('/courses', courserouter);
app.use('/users', userrouter);

// Global ERROR 404 handler 
app.use(GlobalRouterHandler)


// runing sever 
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

