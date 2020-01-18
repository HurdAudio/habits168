'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('userhub_state')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('userhub_state')
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

    knex('userhub_state')
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
    knex('userhub_state')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            tabs: req.body.subject,
            sub_week: req.body.message,
            sub_week: req.body.sub_week,
            profile_state: req.body.profile_state
        }, '*')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:uuid', (req, res, next) => {
    knex('userhub_state')
        .where('uuid', req.params.uuid)
        .update({
            tabs: req.body.tabs,
            sub_week: req.body.sub_week,
            sub_management: req.body.sub_management,
            profile_state: req.body.profile_state
        }, '*')
        .then((results) => {
            res.status(200).send(results[0]);
        })
        .catch((err) => {
            next(err);
        });

});

module.exports = router;
