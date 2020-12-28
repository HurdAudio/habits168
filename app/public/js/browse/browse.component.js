(function () {
    'use strict';

    angular.module('app')
        .component('browse', {
            controller: BrowseController,
            templateUrl: '/js/browse/browse.template.html'
        });

    BrowseController.$inject = ['$http', '$state', '$stateParams'];

    function BrowseController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.navigateToHub = navigateToHub;
        vm.toggleTabs = toggleTabs;
        vm.clickBrowseViewFeedsButton = clickBrowseViewFeedsButton;
        vm.clickBrowseViewPodcastFeedsButton = clickBrowseViewPodcastFeedsButton;
        vm.currentView = "_generic";
        vm.viewBlogFeeds = [];
        vm.browseIndividualFeed = browseIndividualFeed;
        vm.currentFeed = {
            noFeed: true,
            subscribed: true
        };
        vm.currentPodcastFeed = {
            noFeed: true,
            subscribed: true
        };
        vm.addSubscription = addSubscription;
        vm.blogSubscriptionCancel = blogSubscriptionCancel;
        vm.updateBlogSubscriptionDestination = updateBlogSubscriptionDestination;
        vm.subDestination = 'dailies';
        vm.blogSubTabs = [];
        vm.newBlogTabInput = false;
        vm.updateBlogSubscriptionTab = updateBlogSubscriptionTab;
        vm.currentSubTab = null;
        vm.updateNewTabTitle = updateNewTabTitle;
        vm.addedTabTitle = '';
        vm.blogSubscriptionSubmit = blogSubscriptionSubmit;
        vm.removeSubscription = removeSubscription;
        vm.browseIndividualPodcastFeed = browseIndividualPodcastFeed;
        vm.removePodSubscription = removePodSubscription;
        vm.addPodSubscription = addPodSubscription;
        vm.currentAdder = null;
//        vm.artBlogs = [
//            {
//                uuid: '0e0e0359-c8db-4290-a50c-3c9bf9f7635b',
//                author: null,
//                description: 'Art, design, and visual culture.',
//                link: 'https://www.thisiscolossal.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/Colossal.png',
//                items: null,
//                rss: 'https://www.thisiscolossal.com/feed/',
//                title: 'Colossal'
//            },
//            {
//                uuid: 'f40998d9-be6c-43d3-a110-a38a3eba2834',
//                author: null,
//                description: 'CREATE * INSPIRE * COMMUNITY * ART * DESIGN * MUSIC * FILM * PHOTO * PROJECTS',
//                link: 'https://www.booooooom.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logo-fb.jpg',
//                items: null,
//                rss: 'https://www.booooooom.com/feed/',
//                title: 'BOOOOOOOM! – CREATE * INSPIRE * COMMUNITY * ART * DESIGN * MUSIC * FILM * PHOTO * PROJECTS'
//            },
//            {
//                uuid: '9a3d2f71-9ca3-4c8f-85f0-a38a6df70912',
//                author: null,
//                description: 'Online version of the leading quarterly contemporary and underground art bible, Juxtapoz Art and Culture Magazine, with featured articles, blogs, video, reader art, gallery guides, and archives.',
//                link: 'https://www.juxtapoz.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/Juxtapoz_logo_425x113.png',
//                items: null,
//                rss: 'https://www.juxtapoz.com/feed/',
//                title: 'Juxtapoz Magazine - Juxtapoz Magazine - Home'
//            },
//            {
//                uuid: 'defa75f9-f581-4410-8586-4825e498ced1',
//                author: null,
//                description: 'IGNANT is an award-winning online magazine featuring the finest in art, design, photography, travel and architecture',
//                link: 'https://www.ignant.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/rUcBP8hDTIIm0xcOpmWw_48361450_2855126224504886_4936663533468254208_o.jpg',
//                items: null,
//                rss: 'https://www.ignant.com/feed/',
//                title: 'IGNANT',
//            },
//            {
//                uuid: '52039a0b-79c8-407e-91f2-4e67db67dc6d',
//                author: null,
//                description: 'Artzine - Latest News',
//                link: 'https://artzine.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logo-1024artzine.png',
//                items: null,
//                rss: 'https://api.artzine.com/feeds/news.rss',
//                title: 'Artzine'
//            }
//        ];
        vm.musicBlogs = [
            {
                uuid: '8555fac3-8c0a-42c7-b71a-9ae836a615a9',
                    author: null,
                    description: 'Synthesizer and electronic music news, synth and music software reviews and more!',
                    link: 'http://www.synthtopia.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/press-synthtopia-logo.jpg',
                    items: null,
                    rss: 'http://www.synthtopia.com/feed',
                    title: 'Synthtopia'
            },
            {
                    uuid: 'b1c2eff2-81e8-4f19-a1ba-8fff123fb89a',
                    author: null,
                    description: 'A source for news on music that is challenging, interesting, different, progressive, introspective, or just plain weird',
                    link: 'https://avantmusicnews.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/cropped-cropped-amnbanner1.jpg',
                    items: null,
                    rss: 'https://avantmusicnews.com/rss',
                    title: 'Avant Music News'
            },
            {
                    uuid: '09689d96-f0fb-4a3e-ad8c-1d71cb9545a8',
                    author: null,
                    description: 'Fostering connections, deepening knowledge, encouraging appreciation, and providing financial support for new music created in the United States',
                    link: 'https://www.newmusicusa.org/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/newmusicbox.png',
                    items: null,
                    rss: 'https://nmbx.newmusicusa.org/rss',
                    title: 'NewMusicBox – NewMusicBox'
            },
            {
                    uuid: '4de05f59-d8df-49a0-9ad7-4cc9b80f15ae',
                    author: null,
                    description: 'New classical music, art, and technology',
                    link: 'https://www.icareifyoulisten.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/TvlOzOKS_400x400.jpg',
                    items: null,
                    rss: 'https://www.icareifyoulisten.com/rss',
                    title: 'I CARE IF YOU LISTEN'
            },
            {
                    uuid: '79f05037-72d3-497e-a57a-54012a79407b',
                    author: null,
                    description: 'Books, articles, and a blog by the music critic of The New Yorker',
                    link: 'https://www.therestisnoise.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/41qc8pZFMcL._SL500_.jpg',
                    items: null,
                    rss: 'https://www.therestisnoise.com/atom.xml',
                    title: 'Alex Ross: The Rest Is Noise'
            },
            {
                    uuid: '009b6c3f-14a2-4add-abc2-4ea3380ae67c',
                    author: null,
                    description: 'Reviews of Free Jazz and Improvised Music',
                    link: 'http://www.freejazzblog.org/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/RQxWDoWr_400x400.jpg',
                    items: null,
                    rss: 'http://www.freejazzblog.org/atom.xml',
                    title: 'The Free Jazz Collective'
            },
            {
                    uuid: 'c1979d0e-d388-44ca-8ab0-a41d422c831a',
                    author: null,
                    description: 'The Contemporary Classical Music Community',
                    link: 'http://www.sequenza21.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/seq21logo1.jpg',
                    items: null,
                    rss: 'http://www.sequenza21.com/feed',
                    title: 'Sequenza21/'
            },
            {
                    uuid: '5adac099-58c6-4389-a3c5-dc3d54244f57',
                    author: null,
                    description: 'Album Reviews content RSS feed',
                    link: 'https://pitchfork.com/feed-album-reviews',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/4e1863811e5488433270988ae82a928f.jpg',
                    items: null,
                    rss: 'https://pitchfork.com/rss/reviews/albums',
                    title: 'RSS: Album Reviews'
            },
            {
                    uuid: '98f44d3e-ce0d-4c44-831f-52ee4d398b10',
                    author: null,
                    description: '',
                    link: 'https://www.overgrownpath.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/8fb5bfc367dfb6ce1ab767cc4e4e92fd.jpg',
                    items: null,
                    rss: 'https://www.overgrownpath.com/feeds/posts/default',
                    title: 'On An Overgrown Path'
            },
            {
                    uuid: '50a91935-083c-4b0f-9ec0-211569ec1b00',
                    author: null,
                    description: 'Tim Rutherford-Johnson',
                    link: 'https://johnsonsrambler.wordpress.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/rambler.png',
                    items: null,
                    rss: 'https://johnsonsrambler.wordpress.com/feed/',
                    title: 'The Rambler'
            },
            {
                    uuid: 'd6413817-60c2-4809-b3e0-b907186b9d4f',
                    author: null,
                    description: 'Superconductor offers music reviews, opera reviews, concert reviews, news articles and criticism in and around New York City. Written and edited by Paul J. Pelkonen.',
                    link: 'http://super-conductor.blogspot.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/thank-you-from-christian-vision-alliance.jpg',
                    items: null,
                    rss: 'https://super-conductor.blogspot.com/feeds/posts/default',
                    title: 'Superconductor Classical and Opera'
            },
            {
                    uuid: '679aba68-dbbb-4957-b889-5eadd7b7e061',
                    author: null,
                    description: 'Tiny Mix Tapes is a music and film webzine featuring news, reviews, features, and hot replica watches.',
                    link: 'https://www.tinymixtapes.com/',
                    image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/tmt2_logo.png',
                    items: null,
                    rss: 'https://www.tinymixtapes.com/feed.xml',
                    title: 'Tiny Mix Tapes'
            }
        ];
//        vm.artPodcasts = [
//            {
//                uuid: 'ef83f6e1-9cde-4a2f-bfd2-b3d299ab0f27',
//                author: 'Amanda Adams and Nicole Mueller: Artists and Creative Entrepreneurs',
//                description: 'Beyond the Studio is a podcast about the business of being an artist, brought to you by hosts Amanda Adams and Nicole Mueller.',
//                link: 'https://www.beyondthe.studio/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/AlbumArtworkBTS.jpg',
//                items: null,
//                rss: 'http://beyondthestudiopodcast.libsyn.com/rss',
//                title: 'Beyond the Studio - A Podcast for Artists'
//            },
//            {
//                uuid: 'c18ed947-76bc-4f0a-8554-6a306e137d9c',
//                author: 'Artists Helping Artists',
//                description: 'Artists Helping Artists is the #1 Art Show on Blogtalk radio! Join in each week as host Leslie Saeta discusses a specific topic that addresses how to sell more art on-line, along with guest artists, gallerists, and others sharing their knowledge of the business side of art. Leslie Saeta is an artist who paints with a palette knife to create vibrant, colorful paintings. Having spent 30 years in marketing her unique combination of talents has led to a successful career in art. Her non-traditional approach to marketing her art on the internet has created her desire to share her art marketing success with others.',
//                link: 'https://www.blogtalkradio.com/artistshelpingartists',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/834032ee-52e7-4594-953e-86c044dac512_artists_helping_artists_small.jpg',
//                items: null,
//                rss: 'https://www.blogtalkradio.com/artistshelpingartists/podcast',
//                title: 'Artists Helping Artists: Selling Your Art On-Line with Leslie Saeta'
//            },
//            {
//                uuid: '5cb2083c-0fdd-4656-8890-5a8c004fc34b',
//                author: 'Catherine Orer',
//                description: 'Discover how to bridge the gap between your creativity and savvy business sense with The Artist Entrepreneur founder and Business + PR Strategist, Catherine Orer. Each episode, Catherine delves deep into a juicy business question, getting insight from artists and professional experts, and sharing her own art world experiences to offer an answer. With no-nonsense advice and actionable strategies, she pushes back on the idea that artists cannot be entrepreneurs, and helps creatives build the successful, fulfilling careers they’ve always dreamed of.',
//                link: 'http://theartistentrepreneur.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/TAE%2BSubmark%2BBlack.png',
//                items: null,
//                rss: 'https://theartistentrepreneur.libsyn.com/rss',
//                title: 'The Artist Entrepreneur Podcast'
//            },
//            {
//                uuid: '9e1c4ca3-d4b0-4f45-8b2f-c70551df1cac',
//                author: 'Jennifer Dasal/Art Curious',
//                description: 'Think art history is boring? Think again. It\'s weird, funny, mysterious, enthralling, and liberating. Join us as we cover the strangest stories in art. Is the Mona Lisa fake? Did Van Gogh actually kill himself? And why were the Impressionists so great? Subscribe to us here, and follow us at www.artcuriouspodcast.com for further information and fun extras. © 2020 Jennifer Dasal // Find us on Twitter and Instagram: @artcuriouspod',
//                link: 'http://www.artcuriouspodcast.com/artcuriouspodcast/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/Oakbur%2BQuill%2BCo..jpg',
//                items: null,
//                rss: 'https://feeds.megaphone.fm/artcuriouspodcast',
//                title: 'ArtCurious Podcast'
//            },
//            {
//                uuid: '0ed68c5d-d936-400c-aed2-65aa69fc29bb',
//                author: 'ArtTactic',
//                description: 'The ArtTactic Podcast, the leading podcast on the art market, covers a wide range of topics from art investment to general topics about the global art market industry. Each episode features an in-depth interview with a key art market figure.',
//                link: 'http://www.arttactic.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/avatars-000719128720-id8dxw-original.jpg',
//                items: null,
//                rss: 'http://feeds.soundcloud.com/users/soundcloud:users:185340078/sounds.rss',
//                title: 'ArtTactic'
//            },
//            {
//                uuid: 'cbf0b29f-c524-46d3-ba20-f66c986f2099',
//                author: 'Alyson Stanfield',
//                description: 'Looking for art career inspiration and ideas while you’re working in the studio or schlepping your art across the country? Alyson Stanfield helps you be a more productive artist, a more empowered artist, and a more successful artist.',
//                link: 'https://artbizsuccess.com/',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/Podcast-Cover_artbiz.jpg',
//                items: null,
//                rss: 'http://artbiz.libsyn.com/rss',
//                title: 'Art Biz Podcast'
//            },
//            {
//                uuid: '4f90a738-8997-4d13-a474-e99352eefe48',
//                author: 'The Jealous Curator',
//                description: 'ART FOR YOUR EAR brings you stories from some of my favorite contemporary artists. When I studied Art History, the best part was, well, the gossip. I loved finding out why artists did certain things, what was going on in their personal lives, and behind-the-scenes details about other artists they knew and worked with. This podcast is exactly that ... inside-scoop stories from the artsiest people I know. You\'ll hear first-hand from these talented, successful, full-time artists (who also happen to be regular people with hilarious stories) BEFORE they’re in the Art History books. - Danielle (aka The Jealous Curator)',
//                link: 'http://thejealouscurator.libsyn.com/podcast',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/tjc_podcast_ituneslogo2.png',
//                items: null,
//                rss: 'https://thejealouscurator.libsyn.com/rss',
//                title: 'The Jealous Curator : ART FOR YOUR EAR'
//            },
//            {
//                uuid: '6d40d0de-4321-4110-a5a6-623fb4cb90fc',
//                author: 'The Clark Hulings Fund',
//                description: 'Insights into the Business of Visual Art',
//                link: 'https://clarkhulingsfund.org/chfpodcast',
//                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/thrivingartist_rev2.png',
//                items: null,
//                rss: 'http://feeds.feedburner.com/thrivingartist',
//                title: 'The Thriving Artist'
//            }
//        ];

        function removeSubscription() {
            // TODO: wire subscription removal into the backend
            vm.currentFeed = {
                noFeed: true,
                subscribed: true
            };
        }
        
        function removePodSubscription() {
            // TODO: wire subscription removal into the backend
            vm.currentPodcastFeed = {
                noFeed: true,
                subscribed: true
            };
        }

        function blogSubscriptionSubmit() {
            // TODO: wire subscriptions into the backend with a patch
            blogSubscriptionCancel();
            vm.currentFeed = {
                noFeed: true,
                subscribed: true
            };
            vm.currentPodcastFeed = {
                noFeed: true,
                subscribed: true 
            }
        }

        function updateNewTabTitle() {
            vm.addedTabTitle = document.getElementById('browseTabAdder').value;
        }

        function updateBlogSubscriptionTab() {
            vm.currentSubTab = document.getElementById('browseTabSelector').value;
            if (vm.currentSubTab === 'add new tab') {
                vm.newBlogTabInput = true;
            } else {
                vm.newBlogTabInput = false;
            }
        }
        
        function subTabsToTuesday() {
            vm.blogSubTabs = [];
            $http.get(`/tuesday_subscriptions/assembled/${vm.user.uuid}`)
            .then(tuesdaySubsData => {
                const tuesdaySubs = tuesdaySubsData.data;
                for (let i = 0; i < tuesdaySubs.length; i++) {
                    if (tuesdaySubs[i].title === 'Dailies') {
                        vm.blogSubTabs.push({
                            title: 'add new tab'
                        });
                        if (i === 0) {
                            vm.newBlogTabInput = true;
                            vm.currentSubTab = null;
                        }
                    } else {
                        vm.blogSubTabs.push({
                            title: tuesdaySubs[i].title,
                            podcast: tuesdaySubs[i].podcast
                        });
                        if (i === 0) {
                            vm.currentSubTab = tuesdaySubs[i].title;
                        }
                    }
                }
            });
        }

        function subTabsToMonday() {
            vm.blogSubTabs = [];
            $http.get(`/monday_subscriptions/assembled/${vm.user.uuid}`)
                .then(mondaySubsData => {
                    const mondaySubs = mondaySubsData.data;
                    for (let i = 0; i < mondaySubs.length; i++) {
                        if (mondaySubs[i].title === 'Dailies') {
                            vm.blogSubTabs.push({
                                title: 'add new tab'
                            });
                            if (i === 0) {
                                vm.newBlogTabInput = true;
                                vm.currentSubTab = null;
                            }
                        } else {
                            vm.blogSubTabs.push({
                                title: mondaySubs[i].title,
                                podcast: mondaySubs[i].podcast
                            });
                            if (i === 0) {
                                vm.currentSubTab = mondaySubs[i].title;
                            }
                        }
                    }
                });
        }

        function updateBlogSubscriptionDestination() {
            vm.subDestination = document.getElementById('blogSubscriptionDaySelector').value;
            switch (vm.subDestination) {
                case ('dailies'):
                    vm.blogSubTabs = [];
                    break;
                case ('monday'):
                    subTabsToMonday();
                    break;
                case ('tuesday'):
                    subTabsToTuesday();
                    break;
                default:
                    alert('unsupported destination');
            }
        }

        function blogSubscriptionCancel() {
            vm.browseSubscriptionModalState = 'browseSubscriptionModalInactive' + vm.browseMonth;
            vm.browseContainer = 'browseActive' + vm.browseMonth;
        }

        function addSubscription() {
            vm.browseContainer = 'browseInactive' + vm.browseMonth;
            vm.browseSubscriptionModalState = 'browseSubscriptionModalActive' + vm.browseMonth;
            vm.currentAdder = 'blog';
        }
        
        function addPodSubscription() {
            vm.browseContainer = 'browseInactive' + vm.browseMonth;
            vm.browseSubscriptionModalState = 'browseSubscriptionModalActive' + vm.browseMonth;
            vm.currentAdder = 'podcast';
        }
        
        function checkTuesdaySubscriptions() {
            $http.get(`/tuesday_subscriptions/assembled/${vm.user.uuid}`)
                .then(tuesdaySubsData => {
                    const tuesdaySubs = tuesdaySubsData.data;
                    console.log(tuesdaySubs);
                    for (let i = 0; i < tuesdaySubs.length; i++) {
                        for (let j = 0; j < tuesdaySubs[i].subscriptions.length; j++) {
                            if ((tuesdaySubs[i].subscriptions[j].uuid === vm.currentFeed.uuid) || (tuesdaySubs[i].subscriptions[j].uuid === vm.currentPodcastFeed.uuid)) {
                                if (tuesdaySubs[i].podcast) {
                                    vm.currentPodcastFeed.subscribed = true;
                                } else {
                                    vm.currentFeed.subscribed = true;
                                }
                                if (tuesdaySubs[i].title === 'Dailies') {
                                    vm.currentFeed.subscriptionString = 'Currently subscribed as a Dailies subscription.'
                                } else {
                                    if (tuesdaySubs[i].podcast) {
                                        vm.currentPodcastFeed.subscriptionString = `Currently subscribed for Tuesday: ${tuesdaySubs[i].title} tab.`;
                                    } else {
                                        vm.currentFeed.subscriptionString = `Currently subscribed for Tuesday: ${tuesdaySubs[i].title} tab.`;
                                    }
                                }
                            }
                        }
                    }
                });
        }

        function checkMondaySubscriptions() {
            vm.currentPodcastFeed.subscribed = false;
            vm.currentFeed.subscribed = false;
            $http.get(`/monday_subscriptions/assembled/${vm.user.uuid}`)
                .then(mondaySubsData => {
                    const mondaySubs = mondaySubsData.data;
                    for (let i = 0; i < mondaySubs.length; i++) {
                        for (let j = 0; j < mondaySubs[i].subscriptions.length; j++) {
                            if ((mondaySubs[i].subscriptions[j].uuid === vm.currentFeed.uuid) || (mondaySubs[i].subscriptions[j].uuid === vm.currentPodcastFeed.uuid)) {
                                if (mondaySubs[i].podcast) {
                                    vm.currentPodcastFeed.subscribed = true;
                                } else {
                                    vm.currentFeed.subscribed = true;
                                }
                                if (mondaySubs[i].title === 'Dailies') {
                                    vm.currentFeed.subscriptionString = 'Currently subscribed as a Dailies subscription.'
                                } else {
                                    if (mondaySubs[i].podcast) {
                                        vm.currentPodcastFeed.subscriptionString = `Currently subscribed for Monday: ${mondaySubs[i].title} tab.`;
                                    } else {
                                        vm.currentFeed.subscriptionString = `Currently subscribed for Monday: ${mondaySubs[i].title} tab.`;
                                    }
                                }
                            }
                        }
                    }
                    console.log(vm.currentFeed.subscribed);
                    console.log(vm.currentPodcastFeed.subscribed);
                    if ((!vm.currentPodcastFeed.subscribed) && (!vm.currentFeed.subscribed)) {
                        console.log('next day');
                        checkTuesdaySubscriptions();
                    }
                });
        }

        function browseIndividualFeed(feed) {
            vm.currentFeed = feed;
            vm.currentFeed.subscribed = false;
            vm.currentFeed.subscriptionString = null;
            checkMondaySubscriptions();

        }
        
        function browseIndividualPodcastFeed(feed) {
            vm.currentPodcastFeed = feed;
            vm.currentPodcastFeed.subscribed = false;
            vm.currentPodcastFeed.subscriptionString = null;
            checkMondaySubscriptions();
        }
        
        function clickBrowseViewPodcastFeedsButton() {
            let tableName = '';
            let first, second;
            vm.viewPodcastFeeds = [];
            vm.currentPodcastFeed = {
                noFeed: true,
                subscribed: true
            };
            vm.currentPodView = document.getElementById('browsePodcastCategorySelect').value;
            switch (vm.currentPodView) {
                case('_generic'):
                    tableName = 'podcast_feeds';
                    break;
                case('_tech'):
                    tableName = 'tech_podcasts/assembled';
                    break;
                case('_art'):
                    tableName = 'art_podcasts/assembled';
                    break;
                default:
                    alert('non-supported podcast category');
            }

            if (tableName !== '') {
                
                $http.get(`/${tableName}`)
                .then(allFeeds => {
                    vm.viewPodcastFeeds = allFeeds.data.sort((a, b) => {
                        first = a.title.toLowerCase();
                        second = b.title.toLowerCase();
                        if (first.slice(0, 4) === 'the ') {
                            first = first.slice(4);
                        } else if (first.slice(0, 2) === 'a ') {
                            first = first.slice(2);
                        }
                        if (second.slice(0, 4) === 'the ') {
                            second = second.slice(4);
                        } else if (second.slice(0, 2) === 'a ') {
                            second = second.slice(2);
                        }
                        if (first < second) {
                            return -1;
                        } else if (first > second) {
                            return 1;
                        } else {
                            return 0;
                        }
                        });
                    });
                
                
            }
        }

        function clickBrowseViewFeedsButton() {
            let tableName = '';
            let first, second;
            vm.viewBlogFeeds = [];
            vm.currentFeed = {
                noFeed: true,
                subscribed: true
            };
            vm.currentView = document.getElementById('browseCategorySelect').value;
            switch (vm.currentView) {
                case ('_generic'):
                    tableName = 'blog_feeds';
                    break;
                case('_tech'):
                    tableName = 'tech_blogs/assembled';
                    break;
                case('_art'):
                    tableName = 'art_blogs/assembled';
                    break;
                case('_music'):
                    tableName = 'music';
                    break;
                default:
                    alert('non-supported blog category');
            }
            if (tableName === 'music') {
                vm.viewBlogFeeds = vm.musicBlogs;
                return;
            }
            if (tableName !== '') {  
                $http.get(`/${tableName}`)
                .then(allFeeds => {
                    vm.viewBlogFeeds = allFeeds.data.sort((a, b) => {
                        first = a.title.toLowerCase();
                        second = b.title.toLowerCase();
                        if (first.slice(0, 4) === 'the ') {
                            first = first.slice(4);
                        } else if (first.slice(0, 2) === 'a ') {
                            first = first.slice(2);
                        }
                        if (second.slice(0, 4) === 'the ') {
                            second = second.slice(4);
                        } else if (second.slice(0, 2) === 'a ') {
                            second = second.slice(2);
                        }
                        if (first < second) {
                            return -1;
                        } else if (first > second) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                });
                
            }
        }

        function toggleTabs() {
            if (vm.blogFeedTabState === ('browseTabActive' + vm.browseMonth)) {
                vm.blogFeedTabState = 'browseTabInactive' + vm.browseMonth;
                vm.podcastFeedTabState = 'browseTabActive' + vm.browseMonth;
                vm.browseBlogsContainerState = 'browseContainerInactive' + vm.browseMonth;
                vm.browsePodcastContainerState = 'browseContainerActive' + vm.browseMonth;
            } else {
                vm.blogFeedTabState = 'browseTabActive' + vm.browseMonth;
                vm.podcastFeedTabState = 'browseTabInactive' + vm.browseMonth;
                vm.browseBlogsContainerState = 'browseContainerActive' + vm.browseMonth;
                vm.browsePodcastContainerState = 'browseContainerInactive' + vm.browseMonth;
            }
        }

        function navigateToHub() {
            //            let tabs = vm.tuesdayTabs.filter(entry => {
            //                return ((entry.title !== 'Dailies') && (entry.title !== 'Externals'));
            //            });
            //            $http.patch(`/monday_subscriptions/${vm.user.uuid}`, {
            //                    tabs: {
            //                        tabs: tabs
            //                    },
            //                    updated_at: new Date()
            //                })
            //                .then(() => {
            $state.go('userhub', {
                id: vm.user.uuid
            });
            //                });

        }

        function resetSecuritySettings() {
            let oldKey = vm.user.security.key;

            let storage = window.localStorage;
            let now = new Date();

            $http.post(`/users/resetsecurity`, {
                    uuid: vm.user.uuid,
                    ip: vm.ip
                })
                .then(userData => {
                    let user = userData.data[0];
                    vm.user = user;
                    storage.removeItem(oldKey);
                    document.cookie = oldKey + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    storage.setItem(vm.user.security.key, vm.user.security.value);
                    storage.setItem('habitualOffender', vm.user.uuid);
                    storage.setItem('habitualRelease', vm.user.security.expire);
                    document.cookie = vm.user.security.key + "=" + vm.user.security.value;
                    document.cookie = "habitualOffender=" + vm.user.uuid;
                    document.cookie = "habitualRelease=" + vm.user.security.expire;
                });
        }

        function clearCookiesAndStorage() {
            let storage = window.localStorage;
            storage.removeItem('habitualOffender');
            storage.removeItem('habitualRelease');
            document.cookie = "habitualOffender=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "habitualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }

        function navigateToLanding() {
            $state.go('landing');
        }

        function getCookie(name) {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; ++i) {
                var pair = cookies[i].trim().split('=');
                if (pair[0] === name) {
                    return (pair[1]);
                }
            }
            return null;
        }

        function setUserIPAddress() {
            $http.get('/ipaddress')
                .then(responseData => {
                    vm.ip = responseData.data.ip;
                    checkLoginStatus($stateParams.userUuid);
                });
        }

        function setFooterMessage() {
            let today = new Date();
            if (today.getFullYear() > 2019) {
                vm.footerMessage = '©2019 - ' + today.getFullYear() + ' HurdAudio';
            } else {
                vm.footerMessage = '©2019 HurdAudio'
            }
        }

        function checkLoginStatus(userUuid) {
            let storage = window.localStorage;
            let now = new Date();

            if ((!storage.getItem('habitualOffender')) || (getCookie('habitualOffender') === null)) {
                vm.user = null;
                vm.userLoggedIn = false;
                navigateToLanding();
                return;
            }

            if (storage.getItem('habitualOffender') !== getCookie('habitualOffender')) {
                vm.user = null;
                vm.userLoggedIn = false;
                clearCookiesAndStorage();
                navigateToLanding();
                return;
            }

            if (storage.getItem('habitualOffender') !== userUuid) {
                vm.user = null;
                vm.userLoggedIn = false;
                clearCookiesAndStorage();
                navigateToLanding();
                return;
            }

            $http.get(`/users/${userUuid}`)
                .then(userData => {
                    vm.user = userData.data;

                    if ((!storage.getItem('habitualRelease')) || (getCookie('habitualRelease') === null)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    if ((storage.getItem('habitualRelease')) !== getCookie('habitualRelease')) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    let expiration = new Date(storage.getItem('habitualRelease'));
                    if (now.getTime() > expiration.getTime()) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    if ((!storage.getItem(vm.user.security.key)) || (getCookie(vm.user.security.key) === null)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    if ((storage.getItem(vm.user.security.key) !== getCookie(vm.user.security.key)) || (storage.getItem(vm.user.security.key) !== vm.user.security.value) || (getCookie(vm.user.security.key) !== vm.user.security.value)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }
                    vm.userLoggedIn = true;
                    resetSecuritySettings();
                });

        }
        
        function setSkin() {
            $http.get('/skins/browse')
                .then(skinData => {
                    let skin = skinData.data;
                    vm.browseMonth = skin.browse;
//                    vm.browseMonth = '_JanuaryA';
                    vm.browseContainer = 'browseActive' + vm.browseMonth;
                    vm.blogFeedTabState = 'browseTabActive' + vm.browseMonth;
                    vm.podcastFeedTabState = 'browseTabInactive' + vm.browseMonth;
                    vm.browseBlogsContainerState = 'browseContainerActive' + vm.browseMonth;
                    vm.browsePodcastContainerState = 'browseContainerInactive' + vm.browseMonth;
                    vm.browseSubscriptionModalState = 'browseSubscriptionModalInactive' + vm.browseMonth;
                
                    switch (vm.browseMonth) {
                        case ('_JanuaryA'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                            break;
                        case ('_JanuaryB'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
                            break;
                        case ('_JanuaryC'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                            break;
                        case ('_FebruaryA'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_png_by_piccolapersempre_dbuithu-fullview.png';
                            break;
                        case ('_FebruaryB'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/digital_painting__liquid_sleep_by_ukulelemoon_d888syz-pre.jpg';
                            break;
                        case ('_FebruaryC'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_cup_by_lashonda1980_dazsks6-pre.png';
                            break;
                        case ('_MarchA'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/dd749ir-a2fcf5b4-5422-46d6-8d79-8166d3a47633.jpg';
                            break;
                        case('_MarchB'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee-32284_1280.png';
                            break;
                        case('_MarchC'):
                            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-4929161_1920.jpg';
                            break;
                        default:
                            alert('UNSUPPORTED MONTH SELECT for LOGO');
                    }

                });
        }

        function onInit() {
            console.log("Browse Feeds is lit");

            setSkin();

            setUserIPAddress();
            setFooterMessage();
            // populateTuesdayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
