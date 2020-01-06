'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/:uuid', (req, res, next) => {

    let aDate, bDate;
    const result = []

    function setUserData(index, userUuid) {
        knex('users')
            .select()
            .where('uuid', userUuid)
            .first()
            .then((contributor) => {
                if (!contributor) {
                    return;
                }
                result[index].avatar_path = contributor.avatar_path;
                result[index].first_name = contributor.first_name;
                result[index].last_name = contributor.last_name;
            });
    }

    function setFeedData(index, blogOrPodcast, feedUuid) {
        let table = '';
        if (blogOrPodcast === 'blog') {
            table = 'blog_feeds';
        } else {
            table = 'podcast_feeds';
        }
        knex(table)
            .select()
            .where('uuid', feedUuid)
            .first()
            .then((feed) => {
                if (!feed) {
                    return;
                }
                result[index].rss = feed.rss;
                result[index].source_description = feed.description;
                result[index].source_link = feed.link;
                result[index].source_image = feed.image;
                result[index].source_title = feed.title;
            });
    }

    knex('users')
        .select()
        .where('uuid', req.params.uuid)
        .first()
        .then((user) => {
            if (!user) {
                return next();
            }
            knex('blog_shares')
                .then(allBlogShares => {
                    let blogShares = allBlogShares.filter(blog => {
                        return ((blog.public) || (blog.user_uuid === user.uuid) || (user.associates.friends.indexOf(blog.user_uuid) !== -1) || (user.associates.following.indexOf(blog.user_uuid) !== -1));
                    });
                    for (let i = 0; i < blogShares.length; i++) {
                        blogShares[i].blogOrPodcast = 'blog';
                    }
                    knex('podcast_shares')
                        .then(allPodcastShares => {
                            let podcastShares = allPodcastShares.filter(podcast => {
                                return ((podcast.public) || (podcast.user_uuid === user.uuid) || (user.associates.friends.indexOf(podcast.user_uuid) !== -1) || (user.associates.following.indexOf(podcast.user_uuid) !== -1));
                            });
                            for (let i = 0; i < podcastShares.length; i++) {
                                podcastShares[i].blogOrPodcast = 'podcast';
                            }
                            let shares = blogShares.concat(podcastShares);
                            shares = shares.sort((a, b) => {
                                aDate = new Date(a.created_at);
                                bDate = new Date(b.created_at);
                                if (aDate.getTime() > bDate.getTime()) {
                                    return -1;
                                } else if (aDate.getTime() < bDate.getTime()) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            });
                            for (let i = 0; i < shares.length; i++) {
                                result[i] = {
                                    uuid: shares[i].uuid,
                                    author: shares[i].author,
                                    blogOrPodcast: shares[i].blogOrPodcast,
                                    comments: shares[i].comment,
                                    description: shares[i].description,
                                    enclosure: shares[i].enclosure,
                                    feed_uuid: shares[i].feed_uuid,
                                    id: i,
                                    link: shares[i].link,
                                    pubDate: shares[i].pubDate,
                                    select_reactions: false,
                                    title: shares[i].title,
                                    user_uuid: shares[i].user_uuid,
                                    created_at: shares[i].created_at,
                                    updated_at: shares[i].updated_at
                                }
                                if (shares[i].user_uuid === user.uuid) {
                                    result[i].avatar_path = user.avatar_path;
                                    result[i].first_name = user.first_name;
                                    result[i].last_name = user.last_name;
                                } else {
                                    setUserData(i, shares[i].user_uuid);
                                }
                                setFeedData(i, shares[i].blogOrPodcast, shares[i].feed_uuid);

                                // TODO obtain comments from comment tables
                                // TODO obtain reactions from reactions tables
                            }
                            setTimeout(() => {
                                res.send(result);
                            }, 5000);

                        })
                        .catch((err) => {
                            next(err);
                        })
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            next(err);
        });

    //  knex('blog_feeds')
    //    .select()
    //    .where('uuid', req.params.uuid)
    //    .first()
    //    .then((feed) => {
    //      if (!feed) {
    //        return next();
    //      }
    //      res.send(feed);
    //    })
    //    .catch((err) => {
    //      next(err);
    //    });
});

module.exports = router;
