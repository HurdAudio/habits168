'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('externals')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/feed/:userUuid', (req, res, next) => {

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

router.post('/', (req, res, next) => {
    const uuid = uuid4();
    knex('externals')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            author: req.body.author,
            description: req.body.description,
            link: req.body.link,
            image_link: req.body.image_link,
            items: req.body.items,
            rss: req.body.rss,
            title: req.body.title,
            userRead: req.body.userRead
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:uuid', (req, res, next) => {
    knex('externals')
        .where('uuid', req.params.uuid)
        .update({
            user_uuid: req.body.user_uuid,
            author: req.body.author,
            description: req.body.description,
            link: req.body.link,
            image_link: req.body.image_link,
            items: req.body.items,
            rss: req.body.rss,
            title: req.body.title,
            userRead: req.body.userRead,
            updated_at: req.body.updated_at
        }, '*')
        .then((results) => {
            res.status(200).send(results[0]);
        })
        .catch((err) => {
            next(err);
        });

});

router.delete('/:uuid', (req, res, next) => {
    let record;

    knex('externals')
        .where('uuid', req.params.uuid)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            record = row;

            return knex('externals')
                .del()
                .where('uuid', req.params.uuid);
        })
        .then(() => {
            var holder = record.uuid;
            delete record.uuid;

            var obj = {
                uuid: holder,
                user_uuid: record.user_uuid,
                author: record.author,
                description: record.description,
                link: record.link,
                image_link: record.image_link,
                items: record.items,
                rss: record.rss,
                title: record.title,
                userRead: record.userRead,
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
