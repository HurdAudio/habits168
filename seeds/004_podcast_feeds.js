'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('podcast_feeds').del()
    .then(function () {
      // Inserts seed entries
      return knex('podcast_feeds').insert([
        {
          uuid: '9bca6a18-1115-4218-9c0f-0a43ce190eb5',
          author: 'Ed Ball',
          description: 'From modular synthesis, standalone synthesizers and Eurorack, to unusual electronic instruments, Buchla, Ciat-Lonbarde and the arts. Esoteric Modulation is a fortnightly podcast that is about all the latest exciting gear and news of electronic music and the arts. We cover a wide array of interesting equipment, synths, modular and the slightly unusual esoteric side of electronic instruments. We have regular guests covering news, instruments, and art projects that merge sound and visual arts together in interesting ways! We answer listener questions, feature our favourite acts on Bandcamp, and look at the latest up-and-coming events not to be missed! So keep your finger on the pulse, and don\'t miss a show by subscribing to our Podcast on your favourite service or hit our website for more information!',
          link: 'https://www.esotericmodulation.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/player/esotericModulation.jpeg',
          items: null,
          rss: 'https://feeds.buzzsprout.com/361115.rss',
          title: 'Esoteric Modulation',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '4a275da9-36f2-4356-b546-b5052b72bee5',
          author: 'Taran',
          description: 'The Baddest Show on Free Jazz &amp; Creative Improvised Music!',
          link: 'http://taransfreejazzhour.com/podcast/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/taranfreejazzhour.gif',
          items: null,
          rss: 'http://taransfreejazzhour.com/podcast/rss.xml',
          title: 'Taran\'s Free Jazz Hour',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '15c5afac-c36e-4620-8d26-31c20049ab7c',
          author: 'Podular Modcast',
          description: 'Join us on our journey through the world of modular synthesis. We will be chatting with synthesists, module manufacturers/designers and synth shop owners to see how modular has impacted their life. And of course we will be doing some patching.',
          link: 'https://podularmodcast.fireside.fm/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/podularmodcast.jpg',
          items: null,
          rss: 'https://feeds.fireside.fm/podularmodcast/rss',
          title: 'Podular Modcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '95ce2845-8462-48b2-b8fd-c4197718baf9',
          author: 'sourceofuncertainty',
          description: 'A monthly podcast focused on Buchla electronic modular instruments.',
          link: 'https://sourceofuncertainty.podbean.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/buchla_pod_2JPEG.jpg',
          items: null,
          rss: 'https://feed.podbean.com/sourceofuncertainty/feed.xml',
          title: 'Source Of Uncertainty: A Buchla Podcast 4U',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '7f5aca06-17bf-4c99-8c8f-af561999498c',
          author: 'DevChat.tv',
          description: 'Weekly podcast discussion about Javascript on the front and back ends. Also discuss programming practices, coding environments, and the communities related to the technology.',
          link: 'http://javascriptjabber.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/javascript_jabber_thumb.jpg',
          items: null,
          rss: 'https://feeds.feedwrench.com/js-jabber.rss',
          title: 'JavaScript Jabber',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
