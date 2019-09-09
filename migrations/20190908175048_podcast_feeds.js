'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('podcast_feeds', function(table) {
    table.uuid('uuid').notNullable().primary();
    table.string('author').defaultTo(null);
    table.text('description').notNullable().defaultTo('');
    table.string('link').notNullable().defaultTo('');
    table.string('image').notNullable().defaultTo('');
    table.json('items').defaultTo(null);
    table.string('rss').notNullable().unique();
    table.string('title').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('podcast_feeds');
};
