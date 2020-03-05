const connection = require("../db/connection");

exports.fetchArticleById = article_id => {
  return connection("articles")
    .select(
      "articles.article_id",
      "articles.author",
      "articles.body",
      "articles.created_at",
      "title",
      "topic",
      "articles.votes"
    )
    .where("articles.article_id", article_id)
    .count("comments.comment_id AS comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")

    .then(article => {
      if (!article.length)
        return Promise.reject({
          status: 404,
          msg: "article_id does not exist"
        });
      return article[0];
    });
};

exports.updateArticleById = (article_id, votes = 0) => {
  return connection("articles")
    .select("*")
    .where("article_id", article_id)
    .increment("votes", votes)
    .returning("*")
    .then(article => {
      if (!article.length)
        return Promise.reject({
          status: 404,
          msg: "article_id does not exist"
        });
      return article[0];
    });
};

exports.inputComment = (article_id, comment) => {
  return connection
    .insert([
      { author: comment.username },
      { article_id: article_id },
      { votes: 0 },
      { body: comment.body }
    ])
    .into("comments")
    .returning("*");
};
