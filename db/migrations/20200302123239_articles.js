exports.up = function(knex) {
  return knex.schema.createTable("articles", function(tableBuilder) {
    tableBuilder.increments("article_id").primary();
    tableBuilder.string("title").notNullable();
    tableBuilder.text("body").notNullable();
    tableBuilder.integer("votes").defaultTo(0);
    tableBuilder.string("topic").references("topics.slug");
    tableBuilder.string("author").references("users.username");
    tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
