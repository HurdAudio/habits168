'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('art_blogs')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/assembled', (req, res, next) => {
    let result = [];
    let scratch = [];
    let titleA, titleB;
    
    knex('blog_feeds')
    .select('*')
    .then(allFeeds => {
        knex('art_blogs')
        .select('*')
        .then(artBlogs => {
            for (let i = 0; i < artBlogs.length; i++) {
                scratch = allFeeds.filter(feed => {
                    return(feed.uuid === artBlogs[i].art_uuid);
                });
                if (scratch.length > 0) {
                    result.push(scratch[0]);
                }
            }
            result = result.sort((a, b) => {
                if (a.title.slice(0, 4).toLowerCase() === 'the ') {
                    titleA = a.title.slice(4).toLowerCase();
                } else if (a.title.slice(0, 2).toLowerCase() === 'a ') {
                    titleA = a.title.slice(2).toLowerCase();
                } else {
                    titleA = a.title.toLowerCase();
                }
                if (b.title.slice(0, 4).toLowerCase() === 'the ') {
                    titleB = b.title.slice(4).toLowerCase();
                } else if (b.title.slice(0, 2).toLowerCase() === 'a ') {
                    titleB = b.title.slice(2).toLowerCase();
                } else {
                    titleB = b.title.toLowerCase();
                }
                if (titleA > titleB) {
                    return 1;
                } else if (titleA < titleB) {
                    return -1
                } else {
                    return 0;
                }
            });
            res.send(result);
        });
    });
});

module.exports = router;
