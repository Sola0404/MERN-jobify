import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(5100, () => {
  console.log("server running...");
});