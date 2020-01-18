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
            next(err);
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

router.patch('/:uuid', (req, res, next) => {
    knex('share_comments')
        .where('uuid', req.params.uuid)
        .update({
            comment: req.body.comment,
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

    knex('share_comments')
        .where('uuid', req.params.uuid)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            record = row;


            return knex('share_comments')
                .del()
                .where('uuid', req.params.uuid);
        })
        .then(() => {
            var holder = record.uuid;
            delete record.uuid;

            var obj = {
                uuid: holder,
                user_uuid: record.user_uuid,
                share_uuid: record.share_uuid,
                comment: record.comment,
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
