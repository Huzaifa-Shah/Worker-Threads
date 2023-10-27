const express = require("express");
const app = express();
const { Worker } = require("worker_threads");
const THREAD_COUNT = 4;

//Create Worker
function createWorker() {
  return new Promise(function (resolve, reject) {
    //Worker Thread
    const worker = new Worker("./four_workers.js", {
      workerData: {
        thread_count: THREAD_COUNT,
      },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (err) => {
      reject(err);
    });
  });
}

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const thread_results = await Promise.all(workerPromises);

  const total =
    thread_results[0] +
    thread_results[1] +
    thread_results[2] +
    thread_results[3];
  res.status(200).send(`result is ${total}`);
});

app.listen(3000, () => {
  console.log("App Listining on PORT 3000");
});
