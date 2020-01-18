'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('contact_messages', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.string('subject').defaultTo(null);
        table.text('message').notNullable().defaultTo('');
        table.boolean('responded').notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('contact_messages');
};
