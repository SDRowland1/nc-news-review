const { fetchUserByUsername } = require("../models/users");

exports.getUserByUsername = (req, res, next) => {
  const username_id = req.params.username;

  return fetchUserByUsername(username_id)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};
