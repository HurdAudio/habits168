'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('message_responses')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('message_responses')
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

router.patch('/:uuid', (req, res, next) => {
    knex('message_responses')
        .where('uuid', req.params.uuid)
        .update({
            cleanDate: req.body.cleanDate,
            message: req.body.message,
            open: req.body.open,
            opened: req.body.opened,
            subject: req.body.subject,
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
