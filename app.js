const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(err.status).send(err.msg);

  if (err.code === "22P02") res.status(400).send("bad request");
});

module.exports = app;
