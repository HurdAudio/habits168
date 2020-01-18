'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('messages')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('messages')
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

router.get('/assemble/:user_uuid', (req, res, next) => {
    let datea, dateb;
    let result = [];

    knex('messages')
        .then(messages => {
            if (!messages) {
                res.send(result);
                return;
            }
            let userMessages = messages.filter(msg => {
                return ((msg.to.uuid === req.params.user_uuid) || ((msg.from.uuid === req.params.user_uuid) && (msg.opened)));
            });
            userMessages = userMessages.sort((a, b) => {
                datea = new Date(a.created_at);
                dateb = new Date(b.created_at);
                if (datea.getTime() > dateb.getTime()) {
                    return -1;
                } else if (datea.getTime() < dateb.getTime()) {
                    return 1;
                } else {
                    return 0;
                }
            });
            knex('message_responses')
                .then(responses => {
                    knex('users')
                        .then(allUsers => {
                            let fromUser, toUser, replies;
                            for (let i = 0; i < userMessages.length; i++) {
                                fromUser = allUsers.filter(usr => {
                                    return (usr.uuid === userMessages[i].from.uuid);
                                });
                                toUser = allUsers.filter(usr => {
                                    return (usr.uuid === userMessages[i].to.uuid);
                                });
                                replies = responses.filter(resp => {
                                    return (resp.message_uuid === userMessages[i].uuid);
                                });
                                replies = replies.sort((a, b) => {
                                    datea = new Date(a.created_at);
                                    dateb = new Date(b.created_at);
                                    if (datea.getTime() > dateb.getTime()) {
                                        return 1;
                                    } else if (datea.getTime() < dateb.getTime()) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                });
                                result[i] = {
                                    cleanDate: userMessages[i].cleanDate,
                                    created_at: userMessages[i].created_at,
                                    from: {
                                        avatar: fromUser[0].avatar_path,
                                        name: fromUser[0].first_name + ' ' + fromUser[0].last_name,
                                        uuid: fromUser[0].uuid
                                    },
                                    message: userMessages[i].message,
                                    open: userMessages[i].open,
                                    opened: userMessages[i].opened,
                                    replies: [],
                                    subject: userMessages[i].subject,
                                    to: {
                                        avatar: toUser[0].avatar_path,
                                        name: toUser[0].first_name + ' ' + toUser[0].last_name,
                                        uuid: toUser[0].uuid
                                    },
                                    updated_at: userMessages[i].updated_at,
                                    uuid: userMessages[i].uuid
                                };
                                if (replies.length > 0) {
                                    for (let j = 0; j < replies.length; j++) {
                                        fromUser = allUsers.filter(usr => {
                                            return(usr.uuid === replies[j].from.uuid);
                                        });
                                        toUser = allUsers.filter(usr => {
                                            return(usr.uuid === replies[j].to.uuid);
                                        });
                                        result[i].replies[j] = {
                                            cleanDate: replies[j].cleanDate,
                                            created_at: replies[j].created_at,
                                            from: {
                                                avatar: fromUser[0].avatar_path,
                                                name: fromUser[0].first_name + ' ' + fromUser[0].last_name,
                                                uuid: fromUser[0].uuid
                                            },
                                            message: replies[j].message,
                                            open: replies[j].open,
                                            opened: replies[j].opened,
                                            subject: replies[j].subject,
                                            to: {
                                                avatar: toUser[0].avatar_path,
                                                name: toUser[0].first_name + ' ' + toUser[0].last_name,
                                                uuid: toUser[0].uuid
                                            },
                                            updated_at: replies[j].updated_at,
                                            uuid: replies[j].uuid
                                        };
                                    }
                                }
                            }
                            res.send(result);
                        });
                });
        });
});

module.exports = router;
