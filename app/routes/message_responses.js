'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

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

router.post('/', (req, res, next) => {
    const uuid = uuid4();
    knex('users')
        .select()
        .where('uuid', req.body.from)
        .first()
        .then(fromUser => {
            const from = {
                avatar: fromUser.avatar_path,
                name: fromUser.first_name + ' ' + fromUser.last_name,
                uuid: fromUser.uuid
            };
            knex('users')
                .select()
                .where('uuid', req.body.to)
                .first()
                .then(toUser => {
                    const to = {
                        avatar: toUser.avatar_path,
                        name: toUser.first_name + ' ' + toUser.last_name,
                        uuid: toUser.uuid
                    };
                    knex('message_responses')
                        .insert({
                            uuid: uuid,
                            message_uuid: req.body.message_uuid,
                            cleanDate: req.body.cleanDate,
                            from: from,
                            message: req.body.message,
                            open: false,
                            opened: false,
                            subject: req.body.subject,
                            to: to
                        }, '*')
                        .then((result) => {
                            res.status(200).send(result);
                        })
                        .catch((err) => {
                            next(err);
                        });
                });
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
