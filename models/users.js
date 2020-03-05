const connection = require("../db/connection");

exports.fetchUserByUsername = username => {
  return connection("users")
    .select("*")
    .where("username", username)
    .returning("*")
    .then(user => {
      if (!user.length)
        return Promise.reject({ status: 404, msg: "username not found" });
      return user[0];
    });
};
