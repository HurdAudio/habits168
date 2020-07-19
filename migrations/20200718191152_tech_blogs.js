'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('tech_blogs', function (table) {
        table.uuid('tech_uuid').notNullable().references('uuid').inTable('blog_feeds').onDelete('CASCADE').index();
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tech_blogs');
};
