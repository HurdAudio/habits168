'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('art_podcasts', function (table) {
        table.uuid('art_uuid').notNullable().references('uuid').inTable('podcast_feeds').onDelete('CASCADE').index();
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('art_podcasts');
};
