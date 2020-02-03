'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('skins', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.json('skins').defaultTo(null);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('skins');
};
