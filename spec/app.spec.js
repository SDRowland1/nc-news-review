process.env.NODE_ENV = "test";
const connection = require("../db/connection.js");
const app = require("../app.js");
const { expect } = require("chai");
const request = require("supertest");

describe("app", () => {
  beforeEach(function() {
    return connection.seed.run();
  });
  after(function() {
    return connection.destroy();
  });

  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        it("status:200 gets all topics as an object with a key of topics", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.be.an("object");
              expect(body).to.contain.keys("topics");
              expect(body.topics[0]).to.contain.keys("slug", "description");
            });
        });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        describe("GET", () => {
          it("status:200 gets one user object by the specified requested username", () => {
            return request(app)
              .get("/api/users/rogersop")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.an("object");
                expect(body.user).to.contain.keys(
                  "username",
                  "avatar_url",
                  "name"
                );
                expect(body.user.username).to.eql("rogersop");
              });
          });
          it("status:404 username not found", () => {
            return request(app)
              .get("/api/users/bananafaceman")
              .expect(404)
              .then(err => {
                expect(err.text).to.equal("username not found");
              });
          });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        describe("GET", () => {
          it("status:200 gets one article specified by its id", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.an("object");
                expect(body.article).to.contain.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at"
                );
                expect(body.article.article_id).to.eql(1);
              });
          });
          it("includes a comment count which has the same article_id", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body.article).to.contain.keys("comment_count");
                expect(body.article.comment_count).to.equal("13");
              });
          });
          it("status:404 article_id does not exist", () => {
            return request(app)
              .get("/api/articles/999")
              .expect(404)
              .then(err => {
                expect(err.text).to.equal("article_id does not exist");
              });
          });
          it("status:400 invalid ID", () => {
            return request(app)
              .get("/api/articles/gerb")
              .expect(400)
              .then(err => {
                expect(err.text).to.equal("bad request");
              });
          });
        });
        describe("PATCH", () => {
          it("status:200 updates the votes by the number given, and returns article", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ votes: 20 })
              .expect(200)
              .then(({ body }) => {
                expect(body.article.votes).to.equal(120);
                expect(body.article.article_id).to.equal(1);
              });
          });
          it("status: 404 article_id does not exist", () => {
            return request(app)
              .patch("/api/articles/92929")
              .send({ votes: 20 })
              .expect(404)
              .then(err => {
                expect(err.text).to.equal("article_id does not exist");
              });
          });
          it("status:400 invalid ID", () => {
            return request(app)
              .patch("/api/articles/gerb")
              .send({ votes: 20 })
              .expect(400)
              .then(err => {
                expect(err.text).to.equal("bad request");
              });
          });
          it("status:400 invalid patch request", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ votes: "storm dennis" })
              .expect(400)
              .then(err => {
                expect(err.text).to.equal("bad request");
              });
          });
          it("status:200 ignores additional values", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ votes: 20, bananas: "yes" })
              .expect(200);
          });
          it("status:200 returns no changes to specified article", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({})
              .expect(200)
              .then(({ body }) => {
                expect(body.article.votes).to.equal(100);
              });
          });
        });
        describe("/comments", () => {
          describe("POST", () => {
            xit("status:201 posts a new comment", () => {
              return request(app)
                .post("/api/articles/1/comments")
                .send({
                  username: "stormDennis99",
                  body: "yes my son what an article"
                })
                .expect(201)
                .then(({ body }) => {
                  expect(body.article).to.have.keys(
                    "comment_id",
                    "author",
                    "article_id",
                    "votes",
                    "created_at",
                    "body"
                  );
                  expect(body.article.comment_id).to.equal("18");
                  expect(body.article.article_id).to.equal("1");
                  expect(body.article.author).to.equal("stormDennis99");
                });
            });
          });
        });
      });
    });
    describe("404: path error", () => {
      it("status:404 path not found", () => {
        return request(app)
          .get("/apf/topics")
          .expect(404);
      });
    });
  });
});
