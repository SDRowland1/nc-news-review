exports.up = function(knex) {
  console.log("creating the topics table...");

  return knex.schema.createTable("topics", function(tableBuilder) {
    tableBuilder.string("slug").primary();
    tableBuilder.string("description").notNullable();
  });
};

exports.down = function(knex) {
  console.log("removing the topics table...");
  return knex.schema.dropTable("topics");
};
