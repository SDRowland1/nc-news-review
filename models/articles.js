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

exports.inputComment = (article_id, username, body) => {
  return connection("comments")
    .insert([{ author: username, article_id: article_id, body: body }])
    .returning("*")
    .then(comment => {
      return comment[0];
    });
};

exports.fetchCommentsByArticle = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return connection("comments")
    .select("*")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .then(comments => {
      return comments;
    });
};

exports.fetchAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  function checkIfAuthorExists(author) {
    if (author)
      return connection("users")
        .select("*")
        .where("username", author)
        .then(result => {
          if (result.length === 0)
            return Promise.reject({ status: 404, msg: "author not found" });
        });
  }
  function checkIfTopicExists(topic) {
    if (topic)
      return connection("topics")
        .select("*")
        .where("slug", topic)
        .then(result => {
          if (!result.length)
            return Promise.reject({ status: 404, msg: "topic not found" });
        });
  }
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
    .modify(queryBuilder => {
      if (author) {
        queryBuilder.where("articles.author", "=", author);
      }
    })
    .modify(queryBuilder => {
      if (topic) {
        queryBuilder.where("articles.topic", "=", topic);
      }
    })
    .count("comments.comment_id AS comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.all([
          [],
          checkIfAuthorExists(author),
          checkIfTopicExists(topic)
        ]);
      } else return [articles];
    })
    .then(([articles]) => {
      return articles;
    });
};
