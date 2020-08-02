'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('tech_podcasts', function (table) {
        table.uuid('tech_uuid').notNullable().references('uuid').inTable('podcast_feeds').onDelete('CASCADE').index();
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tech_podcasts');
};
