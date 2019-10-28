'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('podcast_saves', function(table) {
    table.uuid('uuid').notNullable().primary();
    table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
    table.uuid('feed_uuid').notNullable().references('uuid').inTable('podcast_feeds').onDelete('CASCADE').index();
    table.text('comment').notNullable().defaultTo('');
    table.string('title').notNullable().defaultTo('');
    table.string('pubDate').notNullable().defaultTo('');
    table.string('link').notNullable().defaultTo('');
    table.string('guid').notNullable().defaultTo('');
    table.string('author').notNullable().defaultTo('');
    table.string('thumbnail').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('content').notNullable().defaultTo('');
    table.json('enclosure').defaultTo(null);
    table.json('categories').defaultTo(null);
    table.boolean('podcast').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('podcast_saves');
};
