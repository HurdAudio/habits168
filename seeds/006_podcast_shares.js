'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('podcast_shares').del()
    .then(function () {
      // Inserts seed entries
      return knex('podcast_shares').insert([
        {
          uuid: '2f0e6043-8fe6-4a3c-b75b-c8f84a8e137b',
          user_uuid: 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6',
          feed_uuid: '4a275da9-36f2-4356-b546-b5052b72bee5',
          share_status: 'public',
          comment: 'My weekend jams right here.',
          title: '09/2019',
          pubDate: '2019-05-05 06:25:00',
          link: 'http://taransfreejazzhour.com/podcast/092019.html',
          guid: '325367:3420087:36180127',
          author: 'Taran',
          thumbnail: '',
          description: '',
          content: '',
          enclosure: {
            "link": "https://archive.org/download/9TFJH2019/9TFJH2019.mp3",
            "type": "audio/mpeg"
          },
          categories: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '2ef33505-838a-459d-bd66-20c50d923a0e',
          user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          feed_uuid: '9bca6a18-1115-4218-9c0f-0a43ce190eb5',
          share_status: 'friends',
          comment: 'Stepping through a live rig like a boss nerd.',
          title: '008: The Anatomy of a Live Modular System',
          pubDate: '2019-09-04 19:00:00',
          link: 'https://www.buzzsprout.com/361115/1652056',
          guid: 'Buzzsprout-1652056',
          author: 'Ed Ball - Ben Wilson',
          thumbnail: '',
          description: ' <p>In this weeks episode, we run over Ben\'s Eurorack Case set up he put together for a live performance at the Deer Shed Festival. We break it all down. We talk performance set up philosophies, zonal methods, sound examples of those zones, effects chains and the selection of modules and how they were used! <br><br>Ben has kindly organised high-quality audio, videos on the modules and information over on his Patron Account for free access go to:  <a href="https://bit.ly/DivKidLiveCase">bit.ly/DivKidLiveCase</a></p> <p><b>Shown Note Times</b></p> <p>Intro: 0.00<br>Live modular setup intro: 0.39<br>Live performance case overview: 2.30<br>Sound 1- Noise: 12.09<br>Discussion on Noise: 13.09<br>Sound 2- Morphagene + Magneto: 18.37<br>Discussion on Morphagene + Magneto: 19.37<br>Sound 3- Vowel: 24.01<br>Discussion on Vowel:  24.35<br>Sound 4 - BLCK_NOIR: 27.14<br>Discussion on BLCK_NOIR: 28.28<br>Sound 5 - Chord pt1: 33.24<br>Discussion on Chord pt1: 35.17<br>Sound 5 - Chord pt2: 38.28<br>Discussion on Chord pt2: 39.10<br>Sound 6 - Bell: 44.27<br>Discussion on Bell: 45.43<br>Sound 07 - Rings + QPAS pt1: 49.45<br>Discussion on Rings + QPAS pt1: 51.59<br>Sound 07 - Rings + QPAS pt2: 53.30<br>Discussion on Rings + QPAS pt2: 54.57<br>Show round-up and shout outs  <br><br><b>Shoutouts</b> <br>Tim’s podcast Pod Mod <a href="https://podularmodcast.fireside.fm/suzannecianipodmod">https://podularmodcast.fireside.fm/suzannecianipodmod<br></a><br>Waveform Magazine - <a href="https://www.waveformmagazine.com/">https://www.waveformmagazine.com</a><br><br>Kyle Swishers new ‘Source of Uncertainty’ podcast:<br><br><a href="https://podcasts.apple.com/us/podcast/source-of-uncertainty-a-buchla-podcast-4u/id1467860041?ign-mpt=uo%3D4">https://podcasts.apple.com/us/podcast/source-of-uncertainty-a-buchla-podcast-4u/id1467860041?ign-mpt=uo%3D4</a><br><br>Our Pre-show special, check it out <br><a href="https://www.esotericmodulation.com/episodes/001-the-pre-show-special">https://www.esotericmodulation.com/episodes/001-the-pre-show-special<br></a><br><b>Hosts and Guests </b><br>Ed Ball Website:<a href="https://www.buzzsprout.com/admin/podcasts/361115/%20https://www.edwardball.co.uk">https://www.edwardball.co.uk</a><br>Ed Ball on Youtube: <a href="https://www.youtube.com/user/Edwardball">https://www.youtube.com/user/Edwardball</a><br>Ben Wilson aka DivKid: <a href="https://www.youtube.com/user/DivKidVideo">https://www.youtube.com/user/DivKidVideo</a></p> <p><br><br><br></p> ',
          content: ' <p>In this weeks episode, we run over Ben\'s Eurorack Case set up he put together for a live performance at the Deer Shed Festival. We break it all down. We talk performance set up philosophies, zonal methods, sound examples of those zones, effects chains and the selection of modules and how they were used! <br><br>Ben has kindly organised high-quality audio, videos on the modules and information over on his Patron Account for free access go to:  <a href="https://bit.ly/DivKidLiveCase">bit.ly/DivKidLiveCase</a></p> <p><b>Shown Note Times</b></p> <p>Intro: 0.00<br>Live modular setup intro: 0.39<br>Live performance case overview: 2.30<br>Sound 1- Noise: 12.09<br>Discussion on Noise: 13.09<br>Sound 2- Morphagene + Magneto: 18.37<br>Discussion on Morphagene + Magneto: 19.37<br>Sound 3- Vowel: 24.01<br>Discussion on Vowel:  24.35<br>Sound 4 - BLCK_NOIR: 27.14<br>Discussion on BLCK_NOIR: 28.28<br>Sound 5 - Chord pt1: 33.24<br>Discussion on Chord pt1: 35.17<br>Sound 5 - Chord pt2: 38.28<br>Discussion on Chord pt2: 39.10<br>Sound 6 - Bell: 44.27<br>Discussion on Bell: 45.43<br>Sound 07 - Rings + QPAS pt1: 49.45<br>Discussion on Rings + QPAS pt1: 51.59<br>Sound 07 - Rings + QPAS pt2: 53.30<br>Discussion on Rings + QPAS pt2: 54.57<br>Show round-up and shout outs  <br><br><b>Shoutouts</b> <br>Tim’s podcast Pod Mod <a href="https://podularmodcast.fireside.fm/suzannecianipodmod">https://podularmodcast.fireside.fm/suzannecianipodmod<br></a><br>Waveform Magazine - <a href="https://www.waveformmagazine.com/">https://www.waveformmagazine.com</a><br><br>Kyle Swishers new ‘Source of Uncertainty’ podcast:<br><br><a href="https://podcasts.apple.com/us/podcast/source-of-uncertainty-a-buchla-podcast-4u/id1467860041?ign-mpt=uo%3D4">https://podcasts.apple.com/us/podcast/source-of-uncertainty-a-buchla-podcast-4u/id1467860041?ign-mpt=uo%3D4</a><br><br>Our Pre-show special, check it out <br><a href="https://www.esotericmodulation.com/episodes/001-the-pre-show-special">https://www.esotericmodulation.com/episodes/001-the-pre-show-special<br></a><br><b>Hosts and Guests </b><br>Ed Ball Website:<a href="https://www.buzzsprout.com/admin/podcasts/361115/%20https://www.edwardball.co.uk">https://www.edwardball.co.uk</a><br>Ed Ball on Youtube: <a href="https://www.youtube.com/user/Edwardball">https://www.youtube.com/user/Edwardball</a><br>Ben Wilson aka DivKid: <a href="https://www.youtube.com/user/DivKidVideo">https://www.youtube.com/user/DivKidVideo</a></p> <p><br><br><br></p> ',
          enclosure: {
            "link": "https://www.buzzsprout.com/361115/1652056-008-the-anatomy-of-a-live-modular-system.mp3?blob_id=4750921",
            "type": "audio/mpeg",
            "length": 95632837,
            "duration": 3981,
            "rating": {
              "scheme": "urn:itunes",
              "value": "false"
            }
          },
          categories: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '6d93facf-dac3-40af-9e43-86eab15e0382',
          user_uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
          feed_uuid: '7f5aca06-17bf-4c99-8c8f-af561999498c',
          share_status: 'public',
          comment: 'I like to think of myself as an FFx Engineer.',
          title: 'JSJ 389: What Makes a 10x Engineer?',
          pubDate: '2019-09-05 10:00:00',
          link: 'https://devchat.tv/js-jabber/jsj-389-what-makes-a-10x-engineer',
          guid: '7ff406b5-3798-4bc4-9c8f-baae1a5cf6bd',
          author: '',
          thumbnail: '',
          description: ' <h2 dir="ltr"><strong>Sponsors</strong></h2> <ul> <li dir="ltr"> <p dir="ltr"><strong><a href="https://devchat.tv/sustain-our-software/">Sustain Our Software</a></strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="http://sentry.io/">Sentry</a>– use the code “devchat” for $100 credit </strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="https://devchat.tv/adventures-in-blockchain/">Adventures in Blockchain</a></strong></p> </li> </ul> <h3 dir="ltr"><strong>Panel</strong></h3> <ul> <li dir="ltr"> <p dir="ltr"><strong>Charles Max Wood</strong></p> </li> </ul> <h3 dir="ltr"><strong>Episode Summary</strong></h3> <p dir="ltr"><strong>In today’s show, Chuck talks about the recent <a href="https://twitter.com/skirani/status/1149302828420067328?lang=en">tweet thread</a> about 10x engineers. He goes through each of the points in the tweet and talks about each of them in turn. There are only two points he sort of agrees with, and believes the rest to be absolute garbage. One of the issues with this tweet is that it doesn’t define what a 10x engineer is. Defining a 10x engineer is difficult because it is also impossible to measure a truly average engineer because there are many factors that play into measuring productivity. Chuck turns the discussion to what a 10x engineer is to him and how to find one. A 10x engineer is dependent on the organization that they are a part of, because they are not simply found, they are made. When a 10x engineer is added to a team, the productivity of the entire team increases. Employers have to consider firstly what you need in your team and how a person would fit in. You want to avoid changing the entire culture of your organization. Consider also that a 10x engineer may be hired as a 2x engineer, but it is the employer that turns them into a 10x engineer. Overall, Chuck believes these tweets are asinine because it’s impossible to measure what makes a 10x engineer in the first place, and hiring a person that fits the attributes in the list would be toxic to your company. </strong></p> <p dir="ltr"><strong>Links</strong></p> <ul> <li dir="ltr"> <p dir="ltr"><strong><a href="https://twitter.com/skirani/status/1149302828420067328?lang=en">10x engineer twitter thread</a></strong></p> </li> </ul> <p dir="ltr"><strong>Follow DevChat on <a href="https://www.facebook.com/DevChattv/?__tn__=%2Cd%2CP-R&amp;eid=ARDBDrBnK71PDmx_8gE_IeIEo5SnM7cyzylVBjAwfaOo1ck_6q3GXuRBfaUQZaWVvFGyEVjrhDwnS_tV">Facebook</a> and <a href="https://twitter.com/devchattv?lang=en">Twitter</a></strong></p> <h3 dir="ltr"><strong>Picks</strong></h3> <p dir="ltr"><strong>Charles Max Wood:</strong></p> <ul> <li dir="ltr"> <p dir="ltr"><strong><a href="https://copyhackers.com/">Copyhackers.com</a></strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="https://www.amazon.com/Good-Great-Some-Companies-Others-ebook/dp/B0058DRUV6?ie=UTF8&amp;qid=1548462018&amp;sr=8-1&amp;linkCode=ll1&amp;tag=devchattv-20&amp;linkId=f06bfe7482dca8bb751ed6d7cc86e2ab&amp;language=en_US">Good to Great by Jim Collins</a></strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong>Keto diet</strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="https://podcastmovement.com/">Podcast Movement</a></strong></p> </li> </ul> ',
          content: ' <h2 dir="ltr"><strong>Sponsors</strong></h2> <ul> <li dir="ltr"> <p dir="ltr"><strong><a href="https://devchat.tv/sustain-our-software/">Sustain Our Software</a></strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="http://sentry.io/">Sentry</a>– use the code “devchat” for $100 credit </strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="https://devchat.tv/adventures-in-blockchain/">Adventures in Blockchain</a></strong></p> </li> </ul> <h3 dir="ltr"><strong>Panel</strong></h3> <ul> <li dir="ltr"> <p dir="ltr"><strong>Charles Max Wood</strong></p> </li> </ul> <h3 dir="ltr"><strong>Episode Summary</strong></h3> <p dir="ltr"><strong>In today’s show, Chuck talks about the recent <a href="https://twitter.com/skirani/status/1149302828420067328?lang=en">tweet thread</a> about 10x engineers. He goes through each of the points in the tweet and talks about each of them in turn. There are only two points he sort of agrees with, and believes the rest to be absolute garbage. One of the issues with this tweet is that it doesn’t define what a 10x engineer is. Defining a 10x engineer is difficult because it is also impossible to measure a truly average engineer because there are many factors that play into measuring productivity. Chuck turns the discussion to what a 10x engineer is to him and how to find one. A 10x engineer is dependent on the organization that they are a part of, because they are not simply found, they are made. When a 10x engineer is added to a team, the productivity of the entire team increases. Employers have to consider firstly what you need in your team and how a person would fit in. You want to avoid changing the entire culture of your organization. Consider also that a 10x engineer may be hired as a 2x engineer, but it is the employer that turns them into a 10x engineer. Overall, Chuck believes these tweets are asinine because it’s impossible to measure what makes a 10x engineer in the first place, and hiring a person that fits the attributes in the list would be toxic to your company. </strong></p> <p dir="ltr"><strong>Links</strong></p> <ul> <li dir="ltr"> <p dir="ltr"><strong><a href="https://twitter.com/skirani/status/1149302828420067328?lang=en">10x engineer twitter thread</a></strong></p> </li> </ul> <p dir="ltr"><strong>Follow DevChat on <a href="https://www.facebook.com/DevChattv/?__tn__=%2Cd%2CP-R&amp;eid=ARDBDrBnK71PDmx_8gE_IeIEo5SnM7cyzylVBjAwfaOo1ck_6q3GXuRBfaUQZaWVvFGyEVjrhDwnS_tV">Facebook</a> and <a href="https://twitter.com/devchattv?lang=en">Twitter</a></strong></p> <h3 dir="ltr"><strong>Picks</strong></h3> <p dir="ltr"><strong>Charles Max Wood:</strong></p> <ul> <li dir="ltr"> <p dir="ltr"><strong><a href="https://copyhackers.com/">Copyhackers.com</a></strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="https://www.amazon.com/Good-Great-Some-Companies-Others-ebook/dp/B0058DRUV6?ie=UTF8&amp;qid=1548462018&amp;sr=8-1&amp;linkCode=ll1&amp;tag=devchattv-20&amp;linkId=f06bfe7482dca8bb751ed6d7cc86e2ab&amp;language=en_US">Good to Great by Jim Collins</a></strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong>Keto diet</strong></p> </li> <li dir="ltr"> <p dir="ltr"><strong><a href="https://podcastmovement.com/">Podcast Movement</a></strong></p> </li> </ul> ',
          enclosure: {
            "link": "https://media.devchat.tv/js-jabber/JSJ_389_Charles_Max_Wood.mp3",
            "type": "audio/mpeg",
            "length": 55137002,
            "duration": 3432,
            "rating": {
              "scheme": "urn:itunes",
              "value": "no"
            }
          },
          categories: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
