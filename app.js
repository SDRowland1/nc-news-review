const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const cors = require("cors");
const {
  handlePathErrors,
  handleCustomErrors,
  handlePsqlErrors,
  handle500s,
} = require("./errors/index");

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.use("/*", handlePathErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500s);

module.exports = app;
