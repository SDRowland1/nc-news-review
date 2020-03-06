const usersRouter = require("express").Router();
const { handle405s } = require("../errors/index");
const { getUserByUsername } = require("../controllers/users");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(handle405s);

module.exports = usersRouter;
