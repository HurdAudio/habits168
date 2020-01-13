'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_blogs', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.string('blog_name').notNullable().defaultTo('');
        table.json('contributors').notNullable();
        table.text('description').notNullable().defaultTo('');
        table.string('last_post').defaultTo(null);
        table.string('logo').notNullable().defaultTo('');
        table.integer('page_loads').notNullable().defaultTo(0);
        table.integer('total_posts').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_blogs');
};
