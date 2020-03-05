const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postCommentOnArticle,
  getCommentsByArticle
} = require("../controllers/articles");
articlesRouter.get("/", getAllArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id/comments", postCommentOnArticle);
articlesRouter.get("/:article_id/comments", getCommentsByArticle);
module.exports = articlesRouter;
