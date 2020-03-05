const { updateCommentById, removeCommentById } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  return updateCommentById(comment_id, inc_votes).then(comment => {
    res.status(200).send({ comment });
  });
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  return removeCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
