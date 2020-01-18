'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_expanded_profiles', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.json('bio').defaultTo(null);
        table.json('birthdate').defaultTo(null);
        table.integer('blog_posts').defaultTo(null);
        table.json('description').defaultTo(null);
        table.json('email').defaultTo(null);
        table.json('education').defaultTo(null);
        table.json('employer').defaultTo(null);
        table.integer('friends').defaultTo(null);
        table.json('location').defaultTo(null);
        table.json('occupation').defaultTo(null);
        table.json('phone').defaultTo(null);
        table.integer('shared_items').defaultTo(null);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_expanded_profiles');
};
