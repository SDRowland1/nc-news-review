const articlesRouter = require("express").Router();

const { handle405s } = require("../errors/index");
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postCommentOnArticle,
  getCommentsByArticle
} = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(handle405s);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter.post("/:article_id/comments", postCommentOnArticle);
articlesRouter.get("/:article_id/comments", getCommentsByArticle).all;

module.exports = articlesRouter;
