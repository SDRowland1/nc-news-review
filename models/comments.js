const connection = require("../db/connection");

exports.updateCommentById = (comment_id, inc_vote = 0) => {
  return connection("comments")
    .select("*")
    .where("comment_id", comment_id)
    .increment("votes", inc_vote)
    .returning("*")
    .then(comment => {
      if (!comment.length)
        return Promise.reject({
          status: 404,
          msg: "comment_id does not exist"
        });
      return comment[0];
    });
};

exports.removeCommentById = comment_id => {
  return connection("comments")
    .delete()
    .where("comment_id", comment_id);
};

exports.fetchCommentById = comment_id => {
  return connection("comments")
    .select("*")
    .where("comments.comment_id", comment_id)
    .then(comment => {
      if (!comment.length)
        return Promise.reject({
          status: 404,
          msg: "comment_id does not exist"
        });
      return comment[0];
    });
};
