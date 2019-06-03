'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('logs', function(table) {
    table.increments().primary();
    table.uuid('user_uuid').defaultTo(null).references('uuid').inTable('users').onDelete('CASCADE').index();
    table.string('action').notNullable().defaultTo('');
    table.string('ip').defaultTo('');
    table.json('ip_data').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('logs');
};
