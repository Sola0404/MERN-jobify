import express from "express";
import morgan from "morgan";
import * as dotenv from 'dotenv';

import mongoose from "mongoose";

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// Routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  // HTTP request logger middleware
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

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

