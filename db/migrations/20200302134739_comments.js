exports.up = function(knex) {
  console.log("creating table comments...");
  return knex.schema.createTable("comments", function(tableBuilder) {
    tableBuilder.increments("comment_id").primary();
    tableBuilder.string("author").references("users.username");
    tableBuilder.integer("article_id").references("articles.article_id");
    tableBuilder.integer("votes").defaultTo(0);
    tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
    tableBuilder.string("body").notNullable();
  });
};

exports.down = function(knex) {
  console.log("removing table comments...");
  return knex.schema.dropTable("comments");
};
