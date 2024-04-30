import express from "express";

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'data received', data: req.body })
});

app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(5100, () => {
  console.log("server running...");
});