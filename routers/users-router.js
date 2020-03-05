const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users");
const { handle405s } = require("../errors/index");
usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;
