'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blog_feeds').del()
    .then(function () {
      // Inserts seed entries
      return knex('blog_feeds').insert([
        {
          uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
          author: null,
          description: 'Links for the intellectually curious, ranked by readers.',
          link: 'https://news.ycombinator.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
          items: null,
          rss: 'https://news.ycombinator.com/rss',
          title: 'Hacker News',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '8555fac3-8c0a-42c7-b71a-9ae836a615a9',
          author: null,
          description: 'Synthesizer and electronic music news, synth and music software reviews and more!',
          link: 'http://www.synthtopia.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/press-synthtopia-logo.jpg',
          items: null,
          rss: 'http://www.synthtopia.com/feed',
          title: 'Synthtopia',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
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
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
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
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
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
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '3b7cdbfa-751e-4622-85e2-31c17abd351f',
          author: null,
          description: 'A community for the awesome MVC JS framework.',
          link: 'https://www.reddit.com/r/angularjs/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/Z4ki_RNzhlka_Gnb.png',
          items: null,
          rss: 'https://reddit.com/r/angularjs/.rss',
          title: '',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
