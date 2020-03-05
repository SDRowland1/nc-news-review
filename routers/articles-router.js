const articlesRouter = require("express").Router();

const {
  getArticleById,
  patchArticleById,
  postCommentOnArticle
} = require("../controllers/articles");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id/comments", postCommentOnArticle);

module.exports = articlesRouter;
