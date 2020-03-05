const topicsRouter = require("express").Router();
const { handle405s } = require("../errors/index");
const { getAllTopics } = require("../controllers/topics");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(handle405s);

module.exports = topicsRouter;
