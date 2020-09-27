'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

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

router.post('/', (req, res, next) => {
    const uuid = uuid4();
    knex('user_expanded_profiles')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
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
            shared_items: req.body.shared_items
        }, '*')
        .then((result) => {
            res.status(200).send(result);
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
