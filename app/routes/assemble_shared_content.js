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

    function setCommentReactionsData(index, commentIndex, commentUuid, userUuid) {
        let comment_reactions = [];
        let unique, emoj, emoti;

        knex('share_comment_reactions')
            .select()
            .where('comment_uuid', commentUuid)
            .then((reactions) => {
                if ((!reactions) || (reactions.length === 0)) {
                    result[index].share_comments[commentIndex].comment_reactions = comment_reactions;
                    return;
                }
                for (let i = 0; i < reactions.length; i++) {
                    unique = true;
                    for (let j = 0; j < comment_reactions.length; j++) {
                        if (comment_reactions[j].reaction_uuid === reactions[i].reaction_uuid) {
                            unique = false;
                            comment_reactions[j].from.push(reactions[i].user_uuid);
                        }
                    }
                    if (unique) {
                        comment_reactions.push({
                            from: [reactions[i].user_uuid],
                            reaction_uuid: reactions[i].reaction_uuid
                        });
                    }
                }
                knex('emojis')
                    .then((emojis) => {
                        for (let i = 0; i < comment_reactions.length; i++) {
                            comment_reactions[i].id = i;
                            emoj = emojis.filter((emo) => {
                                return (emo.uuid === comment_reactions[i].reaction_uuid);
                            });
                            comment_reactions[i].link = emoj[0].path;
                            comment_reactions[i].reaction = emoj[0].value;
                        }
                        knex('users')
                            .then((users) => {
                                for (let i = 0; i < comment_reactions.length; i++) {
                                    for (let j = 0; j < comment_reactions[i].from.length; j++) {
                                        emoti = users.filter((u) => {
                                            return (u.uuid === comment_reactions[i].from[j]);
                                        });
                                        if ((comment_reactions[i].hover_text === undefined) || (comment_reactions[i].hover_text.length === 0)) {
                                            comment_reactions[i].hover_text = emoti[0].first_name + ' ' + emoti[0].last_name;
                                        } else {
                                            comment_reactions[i].hover_text += ', ' + emoti[0].first_name + ' ' + emoti[0].last_name;
                                        }
                                    }
                                    comment_reactions[i].tally = comment_reactions[i].from.length;
                                    if (comment_reactions[i].from.indexOf(userUuid) === -1) {
                                        comment_reactions[i].user_contributed = false;
                                    } else {
                                        comment_reactions[i].user_contributed = true;
                                    }
                                }
                                result[index].share_comments[commentIndex].comment_reactions = comment_reactions;
                            });
                    });
            });
    }

    function setCommentsData(index, feedUuid, userUuid) {
        let share_comments = [];
        let aDate, bDate;
        let usr;

        knex('share_comments')
            .select()
            .where('share_uuid', feedUuid)
            .then((shareComments) => {
                if ((!shareComments) || (shareComments.length === 0)) {
                    result[index].share_comments = share_comments;
                    return;
                }
                let comments = shareComments.sort((a, b) => {
                    aDate = new Date(a.created_at);
                    bDate = new Date(b.created_at);
                    if (aDate.getTime() > bDate.getTime()) {
                        return 1;
                    } else if (aDate.getTime() < bDate.getTime()) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                knex('users')
                    .then((users) => {
                        for (let i = 0; i < comments.length; i++) {
                            usr = users.filter((u) => {
                                return (u.uuid === comments[i].user_uuid);
                            });
                            share_comments.push({
                                avatar: usr[0].avatar_path,
                                blogOrPodcast: comments[i].blogOrPodcast,
                                comment: comments[i].comment,
                                id: i,
                                name: usr[0].first_name + ' ' + usr[0].last_name,
                                select_reactions: false,
                                share_uuid: comments[i].share_uuid,
                                user_uuid: comments[i].user_uuid,
                                uuid: comments[i].uuid,
                                created_at: comments[i].created_at,
                                updated_at: comments[i].updated_at
                            });
                            setCommentReactionsData(index, i, comments[i].uuid, userUuid);
                        }
                        result[index].share_comments = share_comments;

                    });
            });
    }

    function setReactionsData(index, feedUuid, userUuid) {
        let share_reactions = [];
        let unique = true;
        let emoj;
        let emoti;

        knex('share_reactions')
            .select()
            .where('share_uuid', feedUuid)
            .then((reactions) => {
                if ((!reactions) || (reactions.length === 0)) {
                    result[index].share_reactions = share_reactions;
                    return;
                }
                for (let i = 0; i < reactions.length; i++) {
                    unique = true;
                    for (let j = 0; j < share_reactions.length; j++) {
                        if (share_reactions[j].reaction_uuid === reactions[i].reaction_uuid) {
                            unique = false;
                            share_reactions[j].from.push(reactions[i].user_uuid);
                        }
                    }
                    if (unique) {
                        share_reactions.push({
                            from: [reactions[i].user_uuid],
                            reaction_uuid: reactions[i].reaction_uuid
                        });
                    }
                }
                knex('emojis')
                    .then((emojis) => {
                        for (let i = 0; i < share_reactions.length; i++) {
                            share_reactions[i].id = i;
                            emoj = emojis.filter((emo) => {
                                return (emo.uuid === share_reactions[i].reaction_uuid);
                            });
                            share_reactions[i].link = emoj[0].path;
                            share_reactions[i].reaction = emoj[0].value;
                        }
                        knex('users')
                            .then((users) => {
                                for (let i = 0; i < share_reactions.length; i++) {
                                    for (let j = 0; j < share_reactions[i].from.length; j++) {
                                        emoti = users.filter((u) => {
                                            return (u.uuid === share_reactions[i].from[j]);
                                        });
                                        if ((share_reactions[i].hover_text === undefined) || (share_reactions[i].hover_text.length === 0)) {
                                            share_reactions[i].hover_text = emoti[0].first_name + ' ' + emoti[0].last_name;
                                        } else {
                                            share_reactions[i].hover_text += ', ' + emoti[0].first_name + ' ' + emoti[0].last_name;
                                        }
                                    }
                                    share_reactions[i].tally = share_reactions[i].from.length;
                                    if (share_reactions[i].from.indexOf(userUuid) === -1) {
                                        share_reactions[i].user_contributed = false;
                                    } else {
                                        share_reactions[i].user_contributed = true;
                                    }
                                }
                                result[index].share_reactions = share_reactions;
                            });
                    });
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
                        return ((blog.user_uuid === user.uuid) || (user.associates.friends.indexOf(blog.user_uuid) !== -1) || (user.associates.following.indexOf(blog.user_uuid) !== -1));
                    });
                    blogShares = blogShares.filter(share => {
                        return (((share.share_status === 'private') && (share.user_uuid === user.uuid)) || (share.share_status !== 'private'));
                    });
                    for (let i = 0; i < blogShares.length; i++) {
                        blogShares[i].blogOrPodcast = 'blog';
                    }
                    knex('podcast_shares')
                        .then(allPodcastShares => {
                            let podcastShares = allPodcastShares.filter(podcast => {
                                return ((podcast.share_status !== 'private') && ((podcast.user_uuid === user.uuid) || (user.associates.friends.indexOf(podcast.user_uuid) !== -1) || (user.associates.following.indexOf(podcast.user_uuid) !== -1)));
                            });
                            podcastShares = podcastShares.filter(share => {
                                return (((share.share_status === 'private') && (share.user_uuid === user.uuid)) || (share.share_status !== 'private'));
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
                                    categories: shares[i].categories,
                                    comments: shares[i].comment,
                                    content: shares[i].content,
                                    description: shares[i].description,
                                    enclosure: shares[i].enclosure,
                                    feed_uuid: shares[i].feed_uuid,
                                    guid: shares[i].guid,
                                    id: i,
                                    link: shares[i].link,
                                    pubDate: shares[i].pubDate,
                                    select_reactions: false,
                                    share_status: shares[i].share_status,
                                    thumbnail: shares[i].thumbnail,
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
                                setReactionsData(i, shares[i].uuid, user.uuid);
                                setCommentsData(i, shares[i].uuid, user.uuid);
                            }
                            setTimeout(() => {
                                res.send(result);
                            }, (result.length * 100));

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
