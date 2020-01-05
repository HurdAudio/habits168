'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('emojis', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.string('path').notNullable().defaultTo('');
        table.string('value').notNullable().defaultTo('');
        table.boolean('available').notNullable().defaultTo(true);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('emojis');
};
