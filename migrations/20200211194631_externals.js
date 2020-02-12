'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('externals', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.string('author').defaultTo(null);
        table.string('link').defaultTo(null);
        table.string('items').defaultTo(null);
        table.string('rss').defaultTo(null);
        table.string('title').notNullable().defaultTo('');
        table.text('description').notNullable().defaultTo('');
        table.string('image_link').notNullable().defaultTo('https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png');
        table.boolean('userRead').notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('externals');
};
