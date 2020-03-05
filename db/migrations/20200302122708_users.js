exports.up = function(knex) {
  return knex.schema.createTable("users", function(tableBuilder) {
    tableBuilder.string("username").primary();
    tableBuilder.string("avatar_url").notNullable();
    tableBuilder.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
