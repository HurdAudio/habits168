'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
  knex('share_comments')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:uuid', (req, res, next) => {

  knex('share_comments')
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

router.post('/', (req, res, next) => {
    const uuid = uuid4();
    knex('share_comments')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            share_uuid: req.body.share_uuid,
            comment: req.body.comment,
            blogOrPodcast: req.body.blogOrPodcast
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
