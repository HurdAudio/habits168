'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt');
const request = require('request');
const cities = require('all-the-cities');

require('dotenv').config();

const app = express();
const users = require('./routes/users.js');
const logs = require('./routes/logs.js');
const blog_feeds = require('./routes/blog_feeds.js');
const podcast_feeds = require('./routes/podcast_feeds.js');
const blog_shares = require('./routes/blog_shares.js');
const podcast_shares = require('./routes/podcast_shares.js');
const blog_saves = require('./routes/blog_saves.js');
const podcast_saves = require('./routes/podcast_saves.js');
const user_player_data = require('./routes/user_player_data.js');
const emojis = require('./routes/emojis.js');
const assemble_shared_content = require('./routes/assemble_shared_content.js');
const share_reactions = require('./routes/share_reactions.js');
const share_comments = require('./routes/share_comments.js');
const share_comment_reactions = require('./routes/share_comment_reactions.js');
const user_blogs = require('./routes/user_blogs.js');
const user_expanded_profiles = require('./routes/user_expanded_profiles.js');
const messages = require('./routes/messages.js');
const message_responses = require('./routes/message_responses.js');
const contact_messages = require('./routes/contact_messages.js');
const userhub_state = require('./routes/userhub_state.js');
const monday_subscriptions = require('./routes/monday_subscriptions.js');
const skins = require('./routes/skins.js');
const externals = require('./routes/externals.js');
// const financial_modules = require('./routes/financial_modules.js');

const port = process.env.PORT || 3037;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

app.use('/users', users);
app.use('/logs', logs);
app.use('/blog_feeds', blog_feeds);
app.use('/podcast_feeds', podcast_feeds);
app.use('/blog_shares', blog_shares);
app.use('/podcast_shares', podcast_shares);
app.use('/blog_saves', blog_saves);
app.use('/podcast_saves', podcast_saves);
app.use('/user_player_data', user_player_data);
app.use('/emojis', emojis);
app.use('/assemble_shared_content', assemble_shared_content);
app.use('/share_reactions', share_reactions);
app.use('/share_comments', share_comments);
app.use('/share_comment_reactions', share_comment_reactions);
app.use('/user_blogs', user_blogs);
app.use('/user_expanded_profiles', user_expanded_profiles);
app.use('/messages', messages);
app.use('/message_responses', message_responses);
app.use('/contact_messages', contact_messages);
app.use('/userhub_state', userhub_state);
app.use('/monday_subscriptions', monday_subscriptions);
app.use('/skins', skins);
app.use('/externals', externals);

// app.get('/reuters_headlines/:country', (req, res, next) =>{
//   let newUrl = 'https://newsapi.org/v2/top-headlines?country=';
//   let queryString = newUrl + req.params.country + '&apiKey=' + process.env.REUTERS_KEY;
//   return request(queryString).pipe(res);
// });

app.get('/rss_reader/:rss', (req, res, next) => {
    let newUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + req.params.rss;
    newUrl += '&api_key=' + process.env.RSS2JSON_KEY + '&order_by=pubDate&order_dir=desc&count=50';
    return request(newUrl).pipe(res);
});

app.get('/citylist/:filter', (req, res, next) => {
    let result = cities.filter(city => {
        return (city.name.toLowerCase().indexOf(req.params.filter.toLowerCase()) !== -1);
    });
    res.send(result);
});

app.get('/unsplashcity/:city', (req, res, next) => {
    let newURL = 'https://api.unsplash.com/search/photos?page=6&query=' + req.params.city + '&client_id=' + process.env.UNSPLASH_ACCESS_KEY;

    return request(newURL).pipe(res);
});

app.get('/cityhere/:latlon', (req, res, next) => {
    let newURL = 'https://image.maps.api.here.com/mia/1.6/mapview?c=' + req.params.latlon + '&z=12&u=1000&app_id=' + process.env.HERE_APP_ID + '&app_code=' + process.env.HERE_APP_CODE;
    return request(newURL).pipe(res);
});

app.get('/ipaddress', (req, res, next) => {
    let newUrl = 'https://jsonip.com/';
    return request(newUrl).pipe(res);
});

app.use('*', function (req, res, next) {
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public')
    });
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(port, () => {
    console.log('Listening on port', port);
    console.log('postgreSQL is lit.');
});

module.exports = app;
