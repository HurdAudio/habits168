'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');


const router = express.Router();

router.get('/', (req, res, next) => {
  knex('blog_saves')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:uuid', (req, res, next) => {

  knex('blog_saves')
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
    knex('blog_saves')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            feed_uuid: req.body.feed_uuid,
            comment: req.body.comment,
            title: req.body.title,
            pubDate: req.body.pubDate,
            link: req.body.link,
            guid: req.body.guid,
            author: req.body.author,
            thumbnail: req.body.thumbnail,
            description: req.body.description,
            content: req.body.content,
            enclosure: req.body.enclosure,
            categories: req.body.categories
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
