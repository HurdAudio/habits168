'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('podcast_saves').del()
    .then(function () {
      // Inserts seed entries
      return knex('podcast_saves').insert([
        {
          uuid: '9bdb1d3b-a702-47bc-9ab6-611a4ca41e68',
          user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          feed_uuid: '4a275da9-36f2-4356-b546-b5052b72bee5',
          comment: 'Jazz is lyfe.',
          title: '08/2019',
          pubDate: '2019-04-22 06:11:55',
          link: 'http://taransfreejazzhour.com/podcast/082019.html',
          guid: '325367:3420087:36177507',
          author: 'Taran',
          thumbnail: '',
          description: '',
          content: '',
          enclosure: {
            "link": "https://archive.org/download/08TFJH2019/08TFJH2019.mp3",
            "type": "audio/mpeg"
          },
          categories: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
