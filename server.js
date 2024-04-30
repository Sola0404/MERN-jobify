import express from "express";
import morgan from "morgan";
import * as dotenv from 'dotenv';
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

app.get('/', (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on Port ${port}`);
});