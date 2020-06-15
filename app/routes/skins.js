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

router.get('/dailies', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.dailies[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.dailies.available[Math.floor(Math.random() * skinsTable.skins.dailies.available.length)];
        } else {
            selectedSkin = skinsTable.skins.dailies[months[now.getMonth()]][now.getDate()];
        }
        res.send({ dailies: selectedSkin });
    });
});

router.get('/externals', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.externals[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.externals.available[Math.floor(Math.random() * skinsTable.skins.externals.available.length)];
        } else {
            selectedSkin = skinsTable.skins.externals[months[now.getMonth()]][now.getDate()];
        }
        res.send({ externals: selectedSkin });
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

router.get('/monday', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.monday[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.monday.available[Math.floor(Math.random() * skinsTable.skins.monday.available.length)];
        } else {
            selectedSkin = skinsTable.skins.monday[months[now.getMonth()]][now.getDate()];
        }
        res.send({ monday: selectedSkin });
    });
})

router.get('/player', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.player[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.player.available[Math.floor(Math.random() * skinsTable.skins.player.available.length)];
        } else {
            selectedSkin = skinsTable.skins.player[months[now.getMonth()]][now.getDate()];
        }
        res.send({ player: selectedSkin });
    });
});

router.get('/user_hub', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin, mondaySkin, externalsSkin, dailiesSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.user_hub[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.user_hub.available[Math.floor(Math.random() * skinsTable.skins.user_hub.available.length)];
        } else {
            selectedSkin = skinsTable.skins.user_hub[months[now.getMonth()]][now.getDate()];
        }
        if (skinsTable.skins.monday[months[now.getMonth()]].length === 1) {
            mondaySkin = skinsTable.skins.monday.available[Math.floor(Math.random() * skinsTable.skins.monday.available.length)];
        } else {
            mondaySkin = skinsTable.skins.monday[months[now.getMonth()]][now.getDate()];
        }
        if (skinsTable.skins.externals[months[now.getMonth()]].length === 1) {
            externalsSkin = skinsTable.skins.externals.available[Math.floor(Math.random() * skinsTable.skins.externals.available.length)];
        } else {
            externalsSkin = skinsTable.skins.externals[months[now.getMonth()]][now.getDate()];
        }
        if (skinsTable.skins.dailies[months[now.getMonth()]].length === 1) {
            dailiesSkin = skinsTable.skins.dailies.available[Math.floor(Math.random() * skinsTable.skins.dailies.available.length)];
        } else {
            dailiesSkin = skinsTabl.skins.dailies[months[now.getMonth()]][now.getDate()];
        }
        
        
        res.send({ dailies: dailiesSkin, externals: externalsSkin, monday_skin: mondaySkin, user_hub: selectedSkin });
    })
});

router.get('/user_profile_editor', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.user_profile_editor[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.user_profile_editor.available[Math.floor(Math.random() * skinsTable.skins.user_profile_editor.available.length)];
        } else {
            selectedSkin = skinsTable.skins.user_profile_editor[months[now.getMonth()]][now.getDate()];
        }
        res.send({user_profile_editor: selectedSkin});
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
