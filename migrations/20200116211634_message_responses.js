'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('message_responses', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('message_uuid').notNullable().references('uuid').inTable('messages').onDelete('CASCADE').index();
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
    return knex.schema.dropTable('message_responses');
};
