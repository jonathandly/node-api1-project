exports.up = function (knex) {
  return knex.schema.createTable("users", function (users) {
    users.increments();

    users.string("name", 255).notNullable();
    users.text("bio");

    users.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
