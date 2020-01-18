'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('userhub_state', function (table) {
        table.uuid('uuid').notNullable().primary();
        table.uuid('user_uuid').notNullable().references('uuid').inTable('users').onDelete('CASCADE').index();
        table.string('tabs').notNullable().defaultTo('shared');
        table.boolean('sub_week').notNullable().defaultTo(false);
        table.boolean('sub_management').notNullable().defaultTo(false);
        table.string('profile_state').notNullable().defaultTo('public');
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userhub_state');
};
