'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('tuesday_subscriptions', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.json('tabs').defaultTo(null);
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tuesday_subscriptions');
};
