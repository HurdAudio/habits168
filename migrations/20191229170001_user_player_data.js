'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_player_data', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.json('user_progress').defaultTo(null);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_player_data');
};
