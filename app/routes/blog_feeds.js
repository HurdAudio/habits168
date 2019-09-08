'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
  knex('blog_feeds')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:uuid', (req, res, next) => {

  knex('blog_feeds')
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

router.post('/title_search', (req, res, next) => {
  knex('blog_feeds')
  .select('*')
  .then(result => {
    if (result) {
      let search_result = result.filter(entry => {
        return(entry.title.toLowerCase().trim() === req.body.title.toLowerCase().trim());
      });
      res.send(search_result);
    }
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
