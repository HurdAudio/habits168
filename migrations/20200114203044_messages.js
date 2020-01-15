'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('messages', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.string('cleanDate').defaultTo(null);
        table.json('from').defaultTo(null);
        table.text('message').notNullable().defaultTo('');
        table.boolean('open').notNullable().defaultTo(false);
        table.boolean('opened').notNullable().defaultTo(false);
        table.string('subject').notNullable().defaultTo('');
        table.json('to').defaultTo(null);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('messages');
};
