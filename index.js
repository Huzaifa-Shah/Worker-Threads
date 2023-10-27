const express = require("express");
const app = express();
const { Worker } = require("worker_threads");

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", (req, res) => {
  //Worker Thread
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });

  worker.on("error", (msg) => {
    res.status(200).send(`result is ${msg}`);
  });
});

app.listen(3000, () => {
  console.log("App Listining on PORT 3000");
});
