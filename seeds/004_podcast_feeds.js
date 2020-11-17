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
        },
        {
          uuid: 'ec2f85e6-aa1d-4195-98f5-217e0525f714',
          author: 'WQXR',
          description: 'Peabody Award-winning podcast that takes listeners into the minds of the composers making some of the most innovative and breathtakingly beautiful music today.',
          link: 'https://www.newsounds.org/shows/meet-composer',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/mtc_waaa_1400.png',
          items: null,
          rss: 'http://feeds.wnyc.org/wqxr-meetthecomposer',
          title: 'Meet the Composer',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'e77fb9d5-5df2-40fd-9010-0d65435c49ca',
          author: 'Book Riot',
          description: 'Book Riot - The Podcast is a weekly news and talk show about what\'s new, cool, and worth talking about in the world of books and reading, brought to you by the editors of BookRiot.com',
          link: 'https://bookriot.com/listen/shows/thepodcast/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/bookRiotPodcast.jpg',
          items: null,
          rss: 'https://omny.fm/shows/book-riot-the-podcast-1/playlists/podcast.rss',
          title: 'Book Riot - The Podcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'ced9116d-00e6-4b86-b99a-b50c65b1be7b',
          author: 'Devchat.tv',
          description: 'A weekly exploration into the people who make JavaScript what it is.',
          link: 'http://devchat.tv/my-js-story',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/MyJSStory.jpg',
          items: null,
          rss: 'https://feeds.feedwrench.com/my-js-story.rss',
          title: 'My JavaScript Story',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'e6619583-0567-4686-af04-7d0a2fb1c9d0',
          author: '',
          description: '',
          link: 'http://www.bestoftheleft.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logo2bestoftheleft.png',
          items: null,
          rss: 'http://www.bestoftheleft.com/podcast.rss',
          title: 'Latest Episodes - Best of the Left Podcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: '61e56ee6-8af8-49e0-b7c5-3b523e66c0e0',
          author: 'Michael Chan',
          description: 'Conversations about React with your favorite developers.',
          link: 'http://reactpodcast.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/reactpodcast.jpg',
          items: null,
          rss: 'https://feeds.simplecast.com/JoR28o79',
          title: 'React Podcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'ef83f6e1-9cde-4a2f-bfd2-b3d299ab0f27',
          author: 'Amanda Adams and Nicole Mueller: Artists and Creative Entrepreneurs',
          description: 'Beyond the Studio is a podcast about the business of being an artist, brought to you by hosts Amanda Adams and Nicole Mueller.',
          link: 'https://www.beyondthe.studio/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/AlbumArtworkBTS.jpg',
          items: null,
          rss: 'http://beyondthestudiopodcast.libsyn.com/rss',
          title: 'Beyond the Studio - A Podcast for Artists',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'c18ed947-76bc-4f0a-8554-6a306e137d9c',
          author: 'Artists Helping Artists',
          description: 'Artists Helping Artists is the #1 Art Show on Blogtalk radio! Join in each week as host Leslie Saeta discusses a specific topic that addresses how to sell more art on-line, along with guest artists, gallerists, and others sharing their knowledge of the business side of art. Leslie Saeta is an artist who paints with a palette knife to create vibrant, colorful paintings. Having spent 30 years in marketing her unique combination of talents has led to a successful career in art. Her non-traditional approach to marketing her art on the internet has created her desire to share her art marketing success with others.',
          link: 'https://www.blogtalkradio.com/artistshelpingartists',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/834032ee-52e7-4594-953e-86c044dac512_artists_helping_artists_small.jpg',
          items: null,
          rss: 'https://www.blogtalkradio.com/artistshelpingartists/podcast',
          title: 'Artists Helping Artists: Selling Your Art On-Line with Leslie Saeta',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: '5cb2083c-0fdd-4656-8890-5a8c004fc34b',
          author: 'Catherine Orer',
          description: 'Discover how to bridge the gap between your creativity and savvy business sense with The Artist Entrepreneur founder and Business + PR Strategist, Catherine Orer. Each episode, Catherine delves deep into a juicy business question, getting insight from artists and professional experts, and sharing her own art world experiences to offer an answer. With no-nonsense advice and actionable strategies, she pushes back on the idea that artists cannot be entrepreneurs, and helps creatives build the successful, fulfilling careers they’ve always dreamed of.',
          link: 'http://theartistentrepreneur.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/TAE%2BSubmark%2BBlack.png',
          items: null,
          rss: 'https://theartistentrepreneur.libsyn.com/rss',
          title: 'The Artist Entrepreneur Podcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: '9e1c4ca3-d4b0-4f45-8b2f-c70551df1cac',
          author: 'Jennifer Dasal/Art Curious',
          description: 'Think art history is boring? Think again. It\'s weird, funny, mysterious, enthralling, and liberating. Join us as we cover the strangest stories in art. Is the Mona Lisa fake? Did Van Gogh actually kill himself? And why were the Impressionists so great? Subscribe to us here, and follow us at www.artcuriouspodcast.com for further information and fun extras. © 2020 Jennifer Dasal // Find us on Twitter and Instagram: @artcuriouspod',
          link: 'http://www.artcuriouspodcast.com/artcuriouspodcast/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/Oakbur%2BQuill%2BCo..jpg',
          items: null,
          rss: 'https://feeds.megaphone.fm/artcuriouspodcast',
          title: 'ArtCurious Podcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: '0ed68c5d-d936-400c-aed2-65aa69fc29bb',
          author: 'ArtTactic',
          description: 'The ArtTactic Podcast, the leading podcast on the art market, covers a wide range of topics from art investment to general topics about the global art market industry. Each episode features an in-depth interview with a key art market figure.',
          link: 'http://www.arttactic.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/avatars-000719128720-id8dxw-original.jpg',
          items: null,
          rss: 'http://feeds.soundcloud.com/users/soundcloud:users:185340078/sounds.rss',
          title: 'ArtTactic',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'cbf0b29f-c524-46d3-ba20-f66c986f2099',
          author: 'Alyson Stanfield',
          description: 'Looking for art career inspiration and ideas while you’re working in the studio or schlepping your art across the country? Alyson Stanfield helps you be a more productive artist, a more empowered artist, and a more successful artist.',
          link: 'https://artbizsuccess.com/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/Podcast-Cover_artbiz.jpg',
          items: null,
          rss: 'http://artbiz.libsyn.com/rss',
          title: 'Art Biz Podcast',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: '4f90a738-8997-4d13-a474-e99352eefe48',
          author: 'The Jealous Curator',
          description: 'ART FOR YOUR EAR brings you stories from some of my favorite contemporary artists. When I studied Art History, the best part was, well, the gossip. I loved finding out why artists did certain things, what was going on in their personal lives, and behind-the-scenes details about other artists they knew and worked with. This podcast is exactly that ... inside-scoop stories from the artsiest people I know. You\'ll hear first-hand from these talented, successful, full-time artists (who also happen to be regular people with hilarious stories) BEFORE they’re in the Art History books. - Danielle (aka The Jealous Curator)',
          link: 'http://thejealouscurator.libsyn.com/podcast',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/tjc_podcast_ituneslogo2.png',
          items: null,
          rss: 'https://thejealouscurator.libsyn.com/rss',
          title: 'The Jealous Curator : ART FOR YOUR EAR',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: '6d40d0de-4321-4110-a5a6-623fb4cb90fc',
          author: 'The Clark Hulings Fund',
          description: 'Insights into the Business of Visual Art',
          link: 'https://clarkhulingsfund.org/chfpodcast',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/thrivingartist_rev2.png',
          items: null,
          rss: 'http://feeds.feedburner.com/thrivingartist',
          title: 'The Thriving Artist',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'ecb02059-d793-42a3-ae31-dadf11ab771c',
          author: 'Wes Bos &amp; Scott Tolinski - Full Stack JavaScript Web Developers',
          description: 'Full Stack Developers Wes Bos and Scott Tolinski dive deep into web development topics, explaining how they work and talking about their own experiences. They cover from JavaScript frameworks like React, to the latest advancements in CSS to simplifying web tooling.',
          link: 'https://syntax.fm/',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/syntaxlogo.png',
          items: null,
          rss: 'http://feed.syntax.fm/rss',
          title: 'Syntax - Tasty Web Development Treats',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
          {
          uuid: 'a3ff08fa-6791-4094-906c-6f0bfdb6a635',
          author: 'Changelog Media',
          description: 'A community celebration of JavaScript and the web. This show records LIVE on Thursdays at 1pm US/Eastern time. Panelists include Suz Hinton, Feross Aboukhadijeh, Kevin Ball, Emma Wedekind, Jerod Santo, Nick Nisi, Divya Sasidharan, Mikeal Rogers, and Chris Hiller. Topics discussed include the web platform (Chrome, Safari, Edge, Firefox, Brave, etc), front-end frameworks (React, Ember, Angular, Vue, etc), Node.js, web animation, SVG, robotics, IoT, and much more. If JavaScript and/or the web touch your life, this show’s for you. Some people search for JSParty and can\'t find the show, so now the string JSParty is in our description too.',
          link: 'https://changelog.com/jsparty',
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/js-party-original.png',
          items: null,
          rss: 'https://changelog.com/jsparty/feed',
          title: 'JS Party: JavaScript &amp; Web Dev',
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
