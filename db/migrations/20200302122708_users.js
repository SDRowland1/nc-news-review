exports.up = function(knex) {
  console.log("creating the users table...");
  return knex.schema.createTable("users", function(tableBuilder) {
    tableBuilder.string("username").primary();
    tableBuilder.string("avatar_url").notNullable();
    tableBuilder.string("name").notNullable();
  });
};

exports.down = function(knex) {
  console.log("removing the users table...");
  return knex.schema.dropTable("users");
};
