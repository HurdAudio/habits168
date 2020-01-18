'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('contact_messages')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('contact_messages')
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

    knex('contact_messages')
        .select()
        .where('user_uuid', req.params.uuid)
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
    knex('contact_messages')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            subject: req.body.subject,
            message: req.body.message,
            responded: false
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
