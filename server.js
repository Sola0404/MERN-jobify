import express from "express";
import morgan from "morgan";
import * as dotenv from 'dotenv';
import jobRouter from './routers/jobRouter.js';

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  // HTTP request logger middleware
  app.use(morgan('dev'));
}

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'data received', data: req.body })
});

app.use('/api/v1/jobs', jobRouter);

// Customize not found message
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
})

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on Port ${port}`);
});