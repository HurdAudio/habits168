'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/habits168_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/habits168_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
