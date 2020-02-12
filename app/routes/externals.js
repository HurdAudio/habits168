'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
  knex('externals')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:userUuid', (req, res, next) => {

  knex('externals')
    .select()
    .where('user_uuid', req.params.userUuid)
    .then((feed) => {
      if (!feed) {
        return next();
      }
      res.send(feed);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
