'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('monday_subscriptions')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:uuid', (req, res, next) => {

    knex('monday_subscriptions')
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

router.get('/assembled/:user_uuid', (req, res, next) => {
    let lastAccessed;
    const now = new Date();
    let reset = false;
    let result = [];
    let sub;

    knex('monday_subscriptions')
        .select()
        .where('user_uuid', req.params.user_uuid)
        .first()
        .then(userMondayFeeds => {
            if (!userMondayFeeds) {
                return next();
            }
            lastAccessed = new Date(userMondayFeeds.updated_at);
            if ((now.getTime() - lastAccessed.getTime()) > 86400000) {
                reset = true;
            }
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
                                    result.push({
                                        active: true,
                                        allRead: false,
                                        podcast: false,
                                        sort: 'up',
                                        subscriptions: [
                                            {
                                                uuid: 'b1c2eff2-81e8-4f19-a1ba-8fff123fb89a',
                                                author: null,
                                                description: 'A source for news on music that is challenging, interesting, different, progressive, introspective, or just plain weird',
                                                link: 'https://avantmusicnews.com/',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/cropped-cropped-amnbanner1.jpg',
                                                items: null,
                                                rss: 'https://avantmusicnews.com/rss',
                                                title: 'Avant Music News',
                                                userRead: false
                },
                                            {
                                                uuid: '2e535aa1-d6d3-4741-9df7-e47ec5ac2260',
                                                author: null,
                                                description: 'The latest from Bandcamp',
                                                link: 'https://daily.bandcamp.com/',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/bc-site-icon1.png',
                                                items: null,
                                                rss: 'https://daily.bandcamp.com/feed',
                                                title: 'Bandcamp Daily',
                                                userRead: false
                },
                                            {
                                                uuid: '9546ff34-ff07-4e31-9332-786ea544ec47',
                                                author: null,
                                                description: 'A blog about Major League Baseball',
                                                link: 'https://www.baseballmusings.com/',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/788443.png',
                                                items: null,
                                                rss: 'http://feeds2.feedburner.com/Baseballmusingscom',
                                                title: 'Baseball Musings',
                                                userRead: false
                },
                                            {
                                                uuid: '321d2897-f108-45c1-96ca-3aa70ec46590',
                                                author: null,
                                                description: 'The main page.',
                                                link: 'http://www.dailykos.com/blogs/main',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/daily-kos-squarelogo-1517554340259.png',
                                                items: null,
                                                rss: 'https://feeds.dailykos.com',
                                                title: 'Daily Kos',
                                                userRead: false
                },
                                            {
                                                uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
                                                author: null,
                                                description: 'Links for the intellectually curious, ranked by readers.',
                                                link: 'https://news.ycombinator.com/',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
                                                items: null,
                                                rss: 'https://news.ycombinator.com/rss',
                                                title: 'Hacker News',
                                                userRead: false
                },
                                            {
                                                uuid: 'b081d79b-ff77-4586-83f3-e9eea5e22c9a',
                                                author: null,
                                                description: 'The news according to John Marshall',
                                                link: 'https://talkingpointsmemo.com/',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/tpm-sq.svg',
                                                items: null,
                                                rss: 'https://talkingpointsmemo.com/feed/all',
                                                title: 'Talking Points Memo',
                                                userRead: false
                },
                                            {
                                                uuid: '5eb65b5e-6896-4357-94af-e48fad7c64cc',
                                                author: null,
                                                description: 'Wonkette',
                                                link: 'https://www.wonkette.com/',
                                                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/wonkette.jpg',
                                                items: null,
                                                rss: 'https://www.wonkette.com/feeds/feed.rss',
                                                title: 'Wonkette',
                                                userRead: false
                }
              ],
                                        title: 'Dailies'
                                    });
                                    //TODO copy userMondayFeeds.tabs.tabs into remaining array with added details to fit needed object
                                    for (let i = 0; i < userMondayFeeds.tabs.tabs.length; i++) {
                                        result[i + 1] = {
                                            active: userMondayFeeds.tabs.tabs[i].active,
                                            allRead: userMondayFeeds.tabs.tabs[i].allRead,
                                            podcast: userMondayFeeds.tabs.tabs[i].podcast,
                                            sort: userMondayFeeds.tabs.tabs[i].sort,
                                            subscriptions: [],
                                            title: userMondayFeeds.tabs.tabs[i].title
                                        };
                                        for (let j = 0; j < userMondayFeeds.tabs.tabs[i].subscriptions.length; j++) {
                                            if (userMondayFeeds.tabs.tabs[i].podcast) {
                                                sub = podcastFeeds.filter(pod => {
                                                    return (pod.uuid === userMondayFeeds.tabs.tabs[i].subscriptions[j].uuid);
                                                });
                                            } else {
                                                sub = blogFeeds.filter(blo => {
                                                    return (blo.uuid === userMondayFeeds.tabs.tabs[i].subscriptions[j].uuid);
                                                });
                                            }
                                            result[i + 1].subscriptions.push({
                                                uuid: userMondayFeeds.tabs.tabs[i].subscriptions[j].uuid,
                                                author: sub[0].author,
                                                description: sub[0].description,
                                                link: sub[0].link,
                                                image: sub[0].image,
                                                items: sub[0].items,
                                                rss: sub[0].rss,
                                                title: sub[0].title,
                                                userRead: userMondayFeeds.tabs.tabs[i].subscriptions[j].userRead
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

        })
        .catch(err => {
            next(err);
        });
});

router.patch('/:userUuid', (req, res, next) => {
    knex('monday_subscriptions')
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
