import { server } from "./src/server";
import cluster from "cluster";
import { cpus } from "os";
import { pid } from "process";
const PORT = 1337;

const numCpus = cpus().length;

if (cluster.isPrimary) {
  console.log(`Master started. pid${pid}`);
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
} else {
  server.listen(PORT, () => {
    console.log(`Server is running on port:${PORT} pid: ${pid}`);
  });
}
