\c nc_news_test

\dt

-- SELECT author, title, COUNT(comments.comment_id AS comment_count)
-- FROM articles
--     JOIN comments
--     ON comments.article_id = articles.article_id
-- WHERE article_id = 1
-- GROUP BY articles.article_id




SELECT *
FROM topics;
SELECT *
FROM users;
SELECT *
FROM articles;
SELECT *
FROM comments;