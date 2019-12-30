'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
  knex('user_player_data')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:uuid', (req, res, next) => {

  knex('user_player_data')
    .select()
    .where('uuid', req.params.uuid)
    .first()
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

router.get('/user/:user_uuid', (req, res, next) => {
    
    knex('user_player_data')
    .select()
    .where('user_uuid', req.params.user_uuid)
    .first()
    .then((feed) => {
        if (!feed) {
            return next();
        }
        res.send(feed);
    })
    .catch((err) => {
        next(err);
    })
})


module.exports = router;
