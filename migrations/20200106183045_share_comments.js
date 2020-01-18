'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('share_comments', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.uuid('share_uuid').notNullable();
        table.string('blogOrPodcast').notNullable().defaultTo('');
        table.text('comment').notNullable().defaultTo('');
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('share_comments');
};
