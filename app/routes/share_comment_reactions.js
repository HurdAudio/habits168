'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
  knex('share_comment_reactions')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:uuid', (req, res, next) => {

  knex('share_comment_reactions')
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
    knex('share_comment_reactions')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            reaction_uuid: req.body.reaction_uuid,
            comment_uuid: req.body.comment_uuid,
            blogOrPodcast: req.body.blogOrPodcast
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:uuid', (req, res, next) => {
    let record;

    knex('share_comment_reactions')
        .where('uuid', req.params.uuid)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            record = row;


            return knex('share_comment_reactions')
                .del()
                .where('uuid', req.params.uuid);
        })
        .then(() => {
            var holder = record.uuid;
            delete record.uuid;

            var obj = {
                uuid: record.uuid,
                user_uuid: record.user_uuid,
                reaction_uuid: record.reaction_uuid,
                comment_uuid: record.share_uuid,
                blogOrPodcast: record.blogOrPodcast,
                created_at: record.created_at,
                updated_at: record.updated_at

            };

            res.send(obj);
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
