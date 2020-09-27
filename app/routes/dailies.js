'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('dailies')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/byuser/:user_uuid', (req, res, next) => {

    knex('dailies')
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
        });
});

router.get('/assembled/:user_uuid', (req, res, next) => {
    let result = [];
    let candidate;
    
    knex('dailies')
        .select()
        .where('user_uuid', req.params.user_uuid)
        .first()
        .then((feed) => {
            if (!feed) {
                return next();
            }
            knex('blog_feeds')
                .select('*')
                .then(blogFeeds => {
                for (let i = 0; i < feed.dailies.dailies.subscriptions.length; i++) {
                    candidate = blogFeeds.filter(entry => {
                        return(entry.uuid === feed.dailies.dailies.subscriptions[i].uuid);
                    });
                    result[i] = {
                        author: candidate[0].author,
                        description: candidate[0].description,
                        image: candidate[0].image,
                        items: candidate[0].items,
                        link: candidate[0].link,
                        rss: candidate[0].rss,
                        title: candidate[0].title,
                        userRead: feed.dailies.dailies.subscriptions[i].userRead,
                        uuid: feed.dailies.dailies.subscriptions[i].uuid
                    }
                }
                res.send(result);
            });
    });
});

router.post('/', (req, res, next) => {
    const uuid = uuid4();
    knex('dailies')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            dailies: req.body.dailies
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:uuid', (req, res, next) => {
    knex('dailies')
        .where('uuid', req.params.uuid)
        .update({
            user_uuid: req.body.user_uuid,
            author: req.body.author,
            dailies: req.body.dailies,
            updated_at: req.body.updated_at
        }, '*')
        .then((results) => {
            res.status(200).send(results[0]);
        })
        .catch((err) => {
            next(err);
        });

});

module.exports = router;