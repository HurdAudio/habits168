'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('user_expanded_profiles')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('user_expanded_profiles')
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

router.get('/byuseruuid/:uuid', (req, res, next) => {

    knex('user_expanded_profiles')
        .select()
        .where('user_uuid', req.params.uuid)
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

router.patch('/:uuid', (req, res, next) => {
    let now = new Date();
    knex('user_expanded_profiles')
        .where('uuid', req.params.uuid)
        .update({
            bio: req.body.bio,
            birthdate: req.body.birthdate,
            blog_posts: req.body.blog_posts,
            description: req.body.description,
            email: req.body.email,
            education: req.body.education,
            employer: req.body.employer,
            friends: req.body.friends,
            location: req.body.location,
            occupation: req.body.occupation,
            phone: req.body.phone,
            shared_items: req.body.shared_items,
            updated_at: now
        }, '*')
        .then((results) => {
            res.status(200).send(results[0]);
        })
        .catch((err) => {
            next(err);
        });

});

module.exports = router;
