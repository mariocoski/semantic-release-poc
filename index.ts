import express from "express";
import { DEFAULT_PORT_NUMBER } from "./config";
const app = express();

app.use("*", (_, res) => {
  res.send({
    message: "OK",
  });
});

app.listen(DEFAULT_PORT_NUMBER, () => {
  console.log(`Server is listening on a port: ${DEFAULT_PORT_NUMBER}`);
});
