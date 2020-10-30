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

router.get('/browse', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.browse[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.browse.available[Math.floor(Math.random() * skinsTable.skins.browse.available.length)];
        } else {
            selectedSkin = skinsTable.skins.browse[months[now.getMonth()]][now.getDate()];
        }
        res.send({ browse: selectedSkin });
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
});

router.get('/newusersignup', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.newusersignup[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.newusersignup.available[Math.floor(Math.random() * skinsTable.skins.newusersignup.available.length)];
        } else {
            selectedSkin = skinsTable.skins.newusersignup[months[now.getMonth()]][now.getDate()];
        }
        res.send({ newusersignup: selectedSkin });
    });
});

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

router.get('/tuesday', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.tuesday[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.tuesday.available[Math.floor(Math.random() * skinsTable.skins.tuesday.available.length)];
        } else {
            selectedSkin = skinsTable.skins.tuesday[months[now.getMonth()]][now.getDate()];
        }
        res.send({ tuesday: selectedSkin });
    });
});

router.get('/user_hub', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin, mondaySkin, externalsSkin, dailiesSkin, tuesdaySkin, browseSkin;
    
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
        if (skinsTable.skins.tuesday[months[now.getMonth()]].length === 1) {
            tuesdaySkin = skinsTable.skins.tuesday.available[Math.floor(Math.random() * skinsTable.skins.tuesday.available.length)];
        } else {
            tuesdaySkin = skinsTable.skins.tuesday[months[now.getMonth()]][now.getDate()];
        }
        if (skinsTable.skins.browse[months[now.getMonth()]].length === 1) {
            browseSkin = skinsTable.skins.browse.available[Math.floor(Math.random() * skinsTable.skins.browse.available.length)];
        } else {
            browseSkin = skinsTable.skins.browse[months[now.getMonth()]][now.getDate()];
        }
        
        
        res.send({ browse: browseSkin, dailies: dailiesSkin, externals: externalsSkin, monday_skin: mondaySkin, tuesday_skin: tuesdaySkin, user_hub: selectedSkin });
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

router.get('/wednesday', (req, res, next) => {
    let now = new Date();
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let selectedSkin;
    
    knex('skins')
    .select('*')
    .first()
    .then(skinsTable => {
        if (skinsTable.skins.wednesday[months[now.getMonth()]].length === 1) {
            selectedSkin = skinsTable.skins.wednesday.available[Math.floor(Math.random() * skinsTable.skins.wednesday.available.length)];
        } else {
            selectedSkin = skinsTable.skins.wednesday[months[now.getMonth()]][now.getDate()];
        }
        res.send({ wednesday: selectedSkin });
    });
});

module.exports = router;
