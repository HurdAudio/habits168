'use strict';

const express = require('express');
const knex = require('../../knex');
const uuid4 = require('uuid4');

const router = express.Router();

router.get('/', (req, res, next) => {
    knex('skins')
        .select('*')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/landing', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.landing[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.landing.available[Math.floor(Math.random() * skinsTable.skins.landing.available.length)];
        } else {
            selectedSkin = skinsTable.skins.landing[months[now.getMonth()]][now.getDate()];
        }
        res.send({ landing: selectedSkin });
    });
});

router.get('/viewer', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.viewer[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.viewer.available[Math.floor(Math.random() * skinsTable.skins.viewer.available.length)];
        } else {
            selectedSkin = skinsTable.skins.viewer[months[now.getMonth()]][now.getDate()];
        }
        res.send({ viewer: selectedSkin });
    });
});

module.exports = router;
