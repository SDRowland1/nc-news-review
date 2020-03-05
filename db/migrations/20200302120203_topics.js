exports.up = function(knex) {
  return knex.schema.createTable("topics", function(tableBuilder) {
    tableBuilder.string("slug").primary();
    tableBuilder.string("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
