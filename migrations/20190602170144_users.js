'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('uuid').notNullable().primary();
    table.string('email').notNullable().unique();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').defaultTo('');
    table.string('hashed_password').notNullable().defaultTo('');
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.boolean('email_confirmed').notNullable().defaultTo(false);
    table.string('avatar_path').notNullable().defaultTo('');
    table.json('associates').defaultTo(null);
    table.json('security').defaultTo(null);
    table.json('email_reset').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
