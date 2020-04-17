'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('avatars', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.string('link').defaultTo(null);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('avatars');
};
