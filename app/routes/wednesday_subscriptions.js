'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('wednesday_subscriptions')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('wednesday_subscriptions')
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

router.get('/assembled/:user_uuid', (req, res, next) => {
    let lastAccessed;
    const now = new Date();
    let reset = false;
    let result = [];
    let sub;

    knex('wednesday_subscriptions')
        .select()
        .where('user_uuid', req.params.user_uuid)
        .first()
        .then(userWednesdayFeeds => {
            if (!userWednesdayFeeds) {
                return next();
            }
            lastAccessed = new Date(userWednesdayFeeds.updated_at);
            if ((now.getTime() - lastAccessed.getTime()) > 86400000) {
                reset = true;
            }
            knex('dailies')
                .select()
                .where('user_uuid', req.params.user_uuid)
                .then(dailies => {
                    knex('externals')
                    .select()
                    .where('user_uuid', req.params.user_uuid)
                    .then(externals => {
                        knex('blog_feeds')
                            .select('*')
                            .then(blogFeeds => {
                                knex('podcast_feeds')
                                    .select('*')
                                    .then(podcastFeeds => {
                                        //TODO hard code dailies to be first object in result array - to be replaced when dailies table is engineered
                                        let daySub;
                                        result.push({
                                            active: true,
                                            allRead: dailies[0].dailies.dailies.allRead,
                                            podcast: false,
                                            sort: dailies[0].dailies.dailies.sort,
                                            subscriptions: dailies[0].dailies.dailies.subscriptions,
                                            title: 'Dailies'
                                        });
                                        for (let i = 0; i < dailies[0].dailies.dailies.subscriptions.length; i++) {
                                            daySub = blogFeeds.filter(entry => {
                                                return(entry.uuid === dailies[0].dailies.dailies.subscriptions[i].uuid);
                                            });
                                            result[0].subscriptions[i] = {
                                                author: daySub[0].author,
                                                description: daySub[0].description,
                                                link: daySub[0].link,
                                                image: daySub[0].image,
                                                items: daySub[0].items,
                                                rss: daySub[0].rss,
                                                title: daySub[0].title,
                                                userRead: dailies[0].dailies.dailies.subscriptions[i].userRead,
                                                uuid: dailies[0].dailies.dailies.subscriptions[i].uuid
                                            }
                                        }
                                        //TODO copy userWednesdayFeeds.tabs.tabs into remaining array with added details to fit needed object
                                        for (let i = 0; i < userWednesdayFeeds.tabs.tabs.length; i++) {
                                            result[i + 1] = {
                                                active: userWednesdayFeeds.tabs.tabs[i].active,
                                                allRead: userWednesdayFeeds.tabs.tabs[i].allRead,
                                                podcast: userWednesdayFeeds.tabs.tabs[i].podcast,
                                                sort: userWednesdayFeeds.tabs.tabs[i].sort,
                                                subscriptions: [],
                                                title: userWednesdayFeeds.tabs.tabs[i].title
                                            };
                                            for (let j = 0; j < userWednesdayFeeds.tabs.tabs[i].subscriptions.length; j++) {
                                                if (userWednesdayFeeds.tabs.tabs[i].podcast) {
                                                    sub = podcastFeeds.filter(pod => {
                                                        return (pod.uuid === userWednesdayFeeds.tabs.tabs[i].subscriptions[j].uuid);
                                                    });
                                                } else {
                                                    sub = blogFeeds.filter(blo => {
                                                        return (blo.uuid === userWednesdayFeeds.tabs.tabs[i].subscriptions[j].uuid);
                                                    });
                                                }
                                                result[i + 1].subscriptions.push({
                                                    uuid: userWednesdayFeeds.tabs.tabs[i].subscriptions[j].uuid,
                                                    author: sub[0].author,
                                                    description: sub[0].description,
                                                    link: sub[0].link,
                                                    image: sub[0].image,
                                                    items: sub[0].items,
                                                    rss: sub[0].rss,
                                                    title: sub[0].title,
                                                    userRead: userWednesdayFeeds.tabs.tabs[i].subscriptions[j].userRead
                                                });
                                            }
                                        }
                                        //TODO hard code externals to be last object in result array - to be replaced when externals table is engineered
                                        result.push({
                                            active: false,
                                            allRead: false,
                                            podcast: false,
                                            sort: 'up',
                                            subscriptions: externals,
                                            title: 'Externals'
                                        });
                                        //TODO update userRead status
                                        if (reset) {
                                            for (let i = 0; i < (result.length - 1); i++) {
                                                result[i].allRead = false;
                                                for (let j = 0; j < result[i].subscriptions.length; j++) {
                                                    result[i].subscriptions[j].userRead = false;
                                                }
                                            }
                                        }
                                        res.send(result);
                                    });

                            });
                    });
            });

        })
        .catch(err => {
            next(err);
        });
});

router.patch('/:userUuid', (req, res, next) => {
    knex('wednesday_subscriptions')
        .where('user_uuid', req.params.userUuid)
        .update({
            tabs: req.body.tabs,
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
