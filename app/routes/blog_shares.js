'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('blog_shares')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('blog_shares')
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
    knex('blog_shares')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            feed_uuid: req.body.feed_uuid,
            share_status: req.body.share_status,
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

router.delete('/:uuid', (req, res, next) => {
    let record;

    knex('blog_shares')
        .where('uuid', req.params.uuid)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            record = row;

            return knex('blog_shares')
                .del()
                .where('uuid', req.params.uuid);
        })
        .then(() => {
            var holder = record.uuid;
            delete record.uuid;

            var obj = {
                uuid: record.uuid,
                user_uuid: record.user_uuid,
                feed_uuid: record.feed_uuid,
                share_status: record.share_status,
                comment: record.comment,
                title: record.title,
                pubDate: record.pubDate,
                link: record.link,
                guid: record.guid,
                author: record.author,
                thumbnail: record.thumbnail,
                description: record.description,
                content: record.content,
                enclosure: record.enclosure,
                categories: record.categories,
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
