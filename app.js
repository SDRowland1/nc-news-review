const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handle500s
} = require("./errors/index");
app.use(express.json());
app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500s);
module.exports = app;
