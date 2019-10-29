'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blog_saves').del()
    .then(function () {
      // Inserts seed entries
      return knex('blog_saves').insert([
        {
          uuid: '3685b1e4-2927-4341-aeeb-b45d48e37a9e',
          user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          feed_uuid: '8555fac3-8c0a-42c7-b71a-9ae836a615a9',
          comment: 'Romancing Sarah Conner.',
          title: 'The Terminator Theme On Korg Minilogue',
          pubDate: '2019-10-27 13:43:00',
          link: 'http://www.synthtopia.com/content/2019/10/27/the-terminator-theme-on-korg-minilogue/',
          guid: 'http://www.synthtopia.com/?p=111945',
          author: 'synthhead',
          thumbnail: '',
          description: 'This version features a minimal setup, based around the Korg Minilogue.… <a class="more-link" href="http://www.synthtopia.com/content/2019/10/27/the-terminator-theme-on-korg-minilogue/">Read More <span class="screen-reader-text">The Terminator Theme On Korg Minilogue</span></a> ',
          content: 'This version features a minimal setup, based around the Korg Minilogue.… <a class="more-link" href="http://www.synthtopia.com/content/2019/10/27/the-terminator-theme-on-korg-minilogue/">Read More <span class="screen-reader-text">The Terminator Theme On Korg Minilogue</span></a> ',
          enclosure: {},
          categories: {
            "categories": [
              "Keyboard Synthesizers",
              "covers",
              "Korg",
              "Korg Minilogue",
              "soundtrack",
              "Sunday Synth Jam",
              "synth jam",
              "The Terminator",
              ]
          },
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '784c1583-82c1-4ca7-9b2c-b4628f13ee28',
          user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          feed_uuid: 'b1c2eff2-81e8-4f19-a1ba-8fff123fb89a',
          comment: 'New Coin Coin and other goodies reviewed.',
          title: 'Newsbits: Matana Roberts / New Improvised Music From Buenos Aires / Deep Minimalism in London / Carolina Eyck / Holly Herndon',
          pubDate: '2019-10-27 15:07:25',
          link: 'https://avantmusicnews.com/2019/10/27/newsbits-matana-roberts-new-improvised-music-from-buenos-aires-deep-minimalism-in-london-carolina-eyck-holly-herndon/',
          guid: 'http://avantmusicnews.com/?p=98840',
          author: 'Mike',
          thumbnail: '',
          description: 'Coin Coin Chapter Four from Matana Roberts is reviewed. A collection entitled New Improvised Music From Buenos Aires has been released on ESP Disk. In November, London will be the locale for the second edition of the DEEP∞MINIMALISM series. Carolina Eyck’s Elegies for Theremin &amp; Voice is reviewed. Holly Herndon live in Brighton is reviewed.',
          content: 'Coin Coin Chapter Four from Matana Roberts is reviewed. A collection entitled New Improvised Music From Buenos Aires has been released on ESP Disk. In November, London will be the locale for the second edition of the DEEP∞MINIMALISM series. Carolina Eyck’s Elegies for Theremin &amp; Voice is reviewed. Holly Herndon live in Brighton is reviewed.',
          enclosure: {
            "link": "https://2.gravatar.com/avatar/8d70177b03bbf7b556f5c6843fe5879b?s=96&amp;d=identicon&amp;r=G"
          },
          categories: {
            "categories": [ "General" ]
          },
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: 'd5b0c381-cb96-45a9-8bc5-8283ea60ae88',
          user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          feed_uuid: 'b081d79b-ff77-4586-83f3-e9eea5e22c9a',
          comment: 'Keep your Russian friends close and snub Congress.',
          title: 'Pelosi Hits Trump For Not Informing Her Of ISIS Raid In Advance',
          pubDate: '2019-10-27 22:02:16',
          link: 'https://talkingpointsmemo.com/news/pelosi-criticize-trump-isis-raid-alert-leaders-russia',
          guid: 'https://talkingpointsmemo.com/?p=1258435',
          author: 'Cristina Cabrera',
          thumbnail: 'https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460.jpg',
          description: ' <p><img width="4500" height="3000" src="https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460.jpg 4500w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-804x536.jpg 804w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-600x400.jpg 600w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-1000x667.jpg 1000w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-98x64.jpg 98w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-804x536@2x.jpg 1608w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-600x400@2x.jpg 1200w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-1000x667@2x.jpg 2000w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-98x64@2x.jpg 196w" sizes="(max-width: 4500px) 100vw, 4500px"></p>House Speaker Nancy Pelosi (D-CA) slammed President Donald Trump on Sunday for not giving her or other congressional leaders a...',
          content: ' <p><img width="4500" height="3000" src="https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcset="https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460.jpg 4500w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-804x536.jpg 804w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-600x400.jpg 600w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-1000x667.jpg 1000w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-98x64.jpg 98w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-804x536@2x.jpg 1608w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-600x400@2x.jpg 1200w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-1000x667@2x.jpg 2000w, https://cdn.talkingpointsmemo.com/wp-content/uploads/2019/10/GettyImages-1071817460-98x64@2x.jpg 196w" sizes="(max-width: 4500px) 100vw, 4500px"></p> <p>House Speaker Nancy Pelosi (D-CA) slammed President Donald Trump on Sunday for not giving her or other congressional leaders a heads up about the raid that led to the death of ISIS leader Abu Bakr al-Baghdadi.</p> <p><span></span></p> <p>“The House must be briefed on this raid, which the Russians but not top Congressional leadership were notified of in advance, and on the Administration’s overall strategy in the region,” Pelosi said in a <a href="https://www.speaker.gov/newsroom/102719">statement</a>. “Our military and allies deserve strong, smart and strategic leadership from Washington.”</p> <p>During Trump’s press conference on al-Baghdadi’s death, the President told reporters that Russia had been informed of the operation.</p> <p>“We told the Russians we’re coming in, because we had to go over them,” he said.</p> <p>Trump also repeatedly praised Russia for their “great cooperation.”</p> <p>“Russia treated us great,” he said. “They opened up. We had to fly over certain Russia areas, Russia-held areas. Russia was great.”</p> <p>Trump said that he had not informed Pelosi of the raid because he wanted to prevent leaks.</p> <p>“I wanted to make sure this kept secret,” he said. “I don’t want to have people lost.”</p> <p>House Intelligence Committee Chair Adam Schiff (D-CA) told ABC News anchor Martha Raddatz that Trump hadn’t told the Gang of Eight about the operation either.</p> <p>“Had this escalated, had something gone wrong, had we gotten into a firefight with the Russians, it’s to the administration’s advantage to be able to say, ‘We informed Congress we were going in, they were aware of the risks. We at least gave them the chance to provide feedback,\'” Schiff said. “That wasn’t done here.”</p> ',
          enclosure: {},
          categories: {
            "categories": [
              "News",
              "Donald Trump",
              "ISIS",
              "Nancy Pelosi"
            ]
          },
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
