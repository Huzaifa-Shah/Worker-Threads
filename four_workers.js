const { parentPort, workerData } = require("worker_threads");

var startTime = performance.now();

let counter = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count; i++) {
  counter++;
}

var endTime = performance.now();
console.log(`Time ${(endTime - startTime) / 1000} seconds`);

parentPort.postMessage(counter);
