'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('share_reactions')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('share_reactions')
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

router.post('/update_hovertext', (req, res, next) => {
    let candidate;
    let hover = '';
    let from = req.body.from;
    
    knex('users')
    .then(users => {
        for (let i = 0; i < from.length; i++) {
            candidate = users.filter(usr => {
                return(usr.uuid === from[i]);
            });
            if (hover === '') {
                hover += candidate[0].first_name + ' ' + candidate[0].last_name;
            } else {
                hover += ', ' + candidate[0].first_name + ' ' + candidate[0].last_name;
            }
        }
        res.status(200).send(hover);
    });
});

router.post('/', (req, res, next) => {
    const uuid = uuid4();
    knex('share_reactions')
        .insert({
            uuid: uuid,
            user_uuid: req.body.user_uuid,
            reaction_uuid: req.body.reaction_uuid,
            share_uuid: req.body.share_uuid,
            blogOrPodcast: req.body.blogOrPodcast
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

    knex('share_reactions')
        .where('uuid', req.params.uuid)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            record = row;


            return knex('share_reactions')
                .del()
                .where('uuid', req.params.uuid);
        })
        .then(() => {
            var holder = record.uuid;
            delete record.uuid;

            var obj = {
                uuid: holder,
                user_uuid: record.user_uuid,
                reaction_uuid: record.reaction_uuid,
                share_uuid: record.share_uuid,
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
