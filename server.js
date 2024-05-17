import express from "express";
import morgan from "morgan";
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary';

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// Routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

// Public
import { dirname } from 'path';
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));

if (process.env.NODE_ENV === 'development') {
  // HTTP request logger middleware
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

// Customize not found message
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

