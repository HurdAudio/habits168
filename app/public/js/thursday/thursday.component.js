(function () {
    'use strict';

    angular.module('app')
        .component('thursday', {
            controller: ThursdayController,
            templateUrl: '/js/thursday/thursday.template.html'
        });

    ThursdayController.$inject = ['$http', '$state', '$stateParams'];

    function ThursdayController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.thursdayMonth = '_JanuaryA';
        vm.thursdayContainerState = 'thursdayContainerActive' + vm.thursdayMonth;
        vm.navigateToHub = navigateToHub;
        vm.thursdayTabs = [
            {
                active: true,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'b1c2eff2-81e8-4f19-a1ba-8fff123fb89a',
                        author: null,
                        description: 'A source for news on music that is challenging, interesting, different, progressive, introspective, or just plain weird',
                        link: 'https://avantmusicnews.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/cropped-cropped-amnbanner1.jpg',
                        items: null,
                        rss: 'https://avantmusicnews.com/rss',
                        title: 'Avant Music News',
                        userRead: false
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
                        userRead: false
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
                        userRead: false
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
                        userRead: false
                    },
                    {
                        uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
                        author: null,
                        description: 'Links for the intellectually curious, ranked by readers.',
                        link: 'https://news.ycombinator.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
                        items: null,
                        rss: 'https://news.ycombinator.com/rss',
                        title: 'Hacker News',
                        userRead: false
                    },
                    {
                        uuid: 'b081d79b-ff77-4586-83f3-e9eea5e22c9a',
                        author: null,
                        description: 'The news according to John Marshall',
                        link: 'https://talkingpointsmemo.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/tpm-sq.svg',
                        items: null,
                        rss: 'https://talkingpointsmemo.com/feed/all',
                        title: 'Talking Points Memo',
                        userRead: false
                    },
                    {
                        uuid: '5eb65b5e-6896-4357-94af-e48fad7c64cc',
                        author: null,
                        description: 'Wonkette',
                        link: 'https://www.wonkette.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/wonkette.jpg',
                        items: null,
                        rss: 'https://www.wonkette.com/feeds/feed.rss',
                        title: 'Wonkette',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabActive' + vm.thursdayMonth,
                title: 'Dailies'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '3b7b5a1e-3e6a-48a3-9814-5dcebcef1a0c',
                        author: null,
                        description: '',
                        link: 'https://2ality.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/weqOd4wr_400x400.jpeg',
                        items: null,
                        rss: 'https://feeds.feedburner.com/2ality',
                        title: '2ality – JavaScript and more',
                        userRead: false
                    },
                    {
                        uuid: '6559bfa8-3517-4742-a16c-6f55b251765d',
                        author: null,
                        description: 'A JavaScript library for building user interfaces',
                        link: 'https://reactjs.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/react-logo.png',
                        items: null,
                        rss: 'https://reactjs.org/feed.xml',
                        title: 'React',
                        userRead: false
                    },
                    {
                        uuid: 'b3c9d26e-08a3-4531-9005-5775b379db1f',
                        author: null,
                        description: '',
                        link: 'http://www.jackfranklin.co.uk/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/jackfranklin-logo1.jpg',
                        items: null,
                        rss: 'https://www.jackfranklin.co.uk/feed.xml',
                        title: 'Jack Franklin',
                        userRead: false
                    },
                    {
                        uuid: 'dfef5179-d748-47dc-8c23-2f5b6ef9cb54',
                        author: null,
                        description: 'Web Design Resources and Tutorials',
                        link: 'https://www.webdesignerdepot.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/1_ozF62oic4iyz1AeQjERtlA.png',
                        items: null,
                        rss: 'http://feeds2.feedburner.com/webdesignerdepot',
                        title: 'Webdesigner Depot',
                        userRead: false
                    },
                    {
                        uuid: '1589c23f-0cb5-4f9d-b43d-b110d2dbeb6d',
                        author: null,
                        description: 'Software | Information | Community',
                        link: 'http://blog.cwa.me.uk/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/vvOu-0tq.jpg',
                        items: null,
                        rss: 'http://blog.cwa.me.uk/feed/',
                        title: 'The Morning Brew',
                        userRead: false
                    },
                    {
                        uuid: '2de0d70f-a250-4dfc-9950-80cd69f92684',
                        author: null,
                        description: 'The five best design links, every weekday.',
                        link: 'https://sidebar.io/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/1_Q5NVd-xnvHfqDBfVueuKTw.png',
                        items: null,
                        rss: 'https://sidebar.io/feed.xml',
                        title: 'Sidebar',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Coding'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '206b292b-1da1-4efc-af9c-721b131078da',
                        author: null,
                        description: 'Daily baseball statistical analysis and commentary',
                        link: 'https://blogs.fangraphs.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/fanGraphs.jpeg',
                        items: null,
                        rss: 'https://blogs.fangraphs.com/feed/rss/',
                        title: 'FanGraphs Baseball',
                        userRead: false
                    },
                    {
                        uuid: 'cccec1c5-786c-417f-a068-8b3906f2b5e1',
                        author: null,
                        description: '',
                        link: 'https://www.mlbtraderumors.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/sXfGmB-P.jpg',
                        items: null,
                        rss: 'https://www.mlbtraderumors.com/feed',
                        title: 'MLB Trade Rumors',
                        userRead: false
                    },
                    {
                        uuid: 'd41a67ca-aac0-4369-8e01-f0433bde8dfa',
                        author: null,
                        description: 'Recent articles about MLB',
                        link: 'http://www.yardbarker.com/mlb',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/131006_YBlogos_H_Bug_T.png',
                        items: null,
                        rss: 'https://www.yardbarker.com/rss/sport_merged/1',
                        title: 'Yardbarker: MLB',
                        userRead: false
                    },
                    {
                        uuid: '24e0574a-4277-4357-b749-0459fb309495',
                        author: null,
                        description: 'Insightful analysis for the discerning baseball fan',
                        link: 'https://www.baseballprospectus.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/baseballProspectus.png',
                        items: null,
                        rss: 'https://www.baseballprospectus.com/feed/',
                        title: 'Baseball Prospectus',
                        userRead: false
                    },
                    {
                        uuid: 'feaef66a-e7ce-47a2-b77d-086e14067e38',
                        author: null,
                        description: 'The subreddit for the bat-and-ball sport played between two teams of nine players. America\'s Pastime. Mike Trout.',
                        link: 'https://www.reddit.com/r/baseball/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/y7RsbWtW658h_rgTqv76tQnwJqV970QkpGkDeIGnU4U.png',
                        items: null,
                        rss: 'https://reddit.com/r/baseball/.rss',
                        title: 'America\'s Pastime',
                        userRead: false
                    },
                    {
                        uuid: 'c895b5e6-664b-4a30-80d2-ac30d03eb15f',
                        author: null,
                        description: 'Felix is ours.',
                        link: 'https://www.lookoutlanding.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/lookoutLanding.png',
                        items: null,
                        rss: 'https://www.lookoutlanding.com/rss/index.xml',
                        title: 'Lookout Landing - All Posts',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Baseball'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '5adac099-58c6-4389-a3c5-dc3d54244f57',
                        author: null,
                        description: 'Album Reviews content RSS feed',
                        link: 'https://pitchfork.com/feed-album-reviews',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/4e1863811e5488433270988ae82a928f.jpg',
                        items: null,
                        rss: 'https://pitchfork.com/rss/reviews/albums',
                        title: 'RSS: Album Reviews',
                        userRead: false
                    },
                    {
                        uuid: '98f44d3e-ce0d-4c44-831f-52ee4d398b10',
                        author: null,
                        description: '',
                        link: 'https://www.overgrownpath.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/8fb5bfc367dfb6ce1ab767cc4e4e92fd.jpg',
                        items: null,
                        rss: 'https://www.overgrownpath.com/feeds/posts/default',
                        title: 'On An Overgrown Path',
                        userRead: false
                    },
                    {
                        uuid: '50a91935-083c-4b0f-9ec0-211569ec1b00',
                        author: null,
                        description: 'Tim Rutherford-Johnson',
                        link: 'https://johnsonsrambler.wordpress.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/rambler.png',
                        items: null,
                        rss: 'https://johnsonsrambler.wordpress.com/feed/',
                        title: 'The Rambler',
                        userRead: false
                    },
                    {
                        uuid: 'd6413817-60c2-4809-b3e0-b907186b9d4f',
                        author: null,
                        description: 'Superconductor offers music reviews, opera reviews, concert reviews, news articles and criticism in and around New York City. Written and edited by Paul J. Pelkonen.',
                        link: 'http://super-conductor.blogspot.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/thank-you-from-christian-vision-alliance.jpg',
                        items: null,
                        rss: 'https://super-conductor.blogspot.com/feeds/posts/default',
                        title: 'Superconductor Classical and Opera',
                        userRead: false
                    },
                    {
                        uuid: '679aba68-dbbb-4957-b889-5eadd7b7e061',
                        author: null,
                        description: 'Tiny Mix Tapes is a music and film webzine featuring news, reviews, features, and hot replica watches.',
                        link: 'https://www.tinymixtapes.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/tmt2_logo.png',
                        items: null,
                        rss: 'https://www.tinymixtapes.com/feed.xml',
                        title: 'Tiny Mix Tapes',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Music'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '0e0e0359-c8db-4290-a50c-3c9bf9f7635b',
                        author: '',
                        description: 'Art, design, and visual culture.',
                        link: 'https://www.thisiscolossal.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/Colossal.png',
                        items: null,
                        rss: 'https://www.thisiscolossal.com/feed/',
                        title: 'Colossal',
                        userRead: false
                    },
                    {
                        uuid: 'f40998d9-be6c-43d3-a110-a38a3eba2834',
                        author: '',
                        description: 'CREATE * INSPIRE * COMMUNITY * ART * DESIGN * MUSIC * FILM * PHOTO * PROJECTS',
                        link: 'https://www.booooooom.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logo-fb.jpg',
                        items: null,
                        rss: 'https://www.booooooom.com/feed/',
                        title: 'BOOOOOOOM! – CREATE * INSPIRE * COMMUNITY * ART * DESIGN * MUSIC * FILM * PHOTO * PROJECTS',
                        userRead: false
                    },
                    {
                        uuid: '9a3d2f71-9ca3-4c8f-85f0-a38a6df70912',
                        author: '',
                        description: 'Online version of the leading quarterly contemporary and underground art bible, Juxtapoz Art and Culture Magazine, with featured articles, blogs, video, reader art, gallery guides, and archives.',
                        link: 'https://www.juxtapoz.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/Juxtapoz_logo_425x113.png',
                        items: null,
                        rss: 'https://www.juxtapoz.com/feed/',
                        title: 'Juxtapoz Magazine - Juxtapoz Magazine - Home',
                        userRead: false
                    },
                    {
                        uuid: 'defa75f9-f581-4410-8586-4825e498ced1',
                        author: '',
                        description: 'IGNANT is an award-winning online magazine featuring the finest in art, design, photography, travel and architecture',
                        link: 'https://www.ignant.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/rUcBP8hDTIIm0xcOpmWw_48361450_2855126224504886_4936663533468254208_o.jpg',
                        items: null,
                        rss: 'https://www.ignant.com/feed/',
                        title: 'IGNANT',
                        userRead: false
                    },
                    {
                        uuid: '52039a0b-79c8-407e-91f2-4e67db67dc6d',
                        author: '',
                        description: 'Artzine - Latest News',
                        link: 'https://artzine.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logo-1024artzine.png',
                        items: null,
                        rss: 'https://api.artzine.com/feeds/news.rss',
                        title: 'Artzine',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Art'
                },
            {
                active: false,
                allRead: false,
                podcast: true,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'e6619583-0567-4686-af04-7d0a2fb1c9d0',
                        author: '',
                        description: '',
                        link: 'http://www.bestoftheleft.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logo2bestoftheleft.png',
                        items: null,
                        rss: 'http://www.bestoftheleft.com/podcast.rss',
                        title: 'Latest Episodes - Best of the Left Podcast',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Political Podcasts'
                },
            {
                active: false,
                allRead: false,
                podcast: true,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '61e56ee6-8af8-49e0-b7c5-3b523e66c0e0',
                        author: 'Michael Chan',
                        description: 'Conversations about React with your favorite developers.',
                        link: 'http://reactpodcast.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/reactpodcast.jpg',
                        items: null,
                        rss: 'https://feeds.simplecast.com/JoR28o79',
                        title: 'React Podcast',
                        userRead: false
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Tech Podcasts'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'c2f53e34-5499-4015-80d5-b4fcea47c78b',
                        author: null,
                        description: 'War Is a Racket',
                        link: null,
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/EDD_xVYXsAEtYxP.jpg',
                        items: null,
                        rss: null,
                        title: 'Jacobin Magazine - Summer 2019',
                        userRead: false
                    },
                    {
                        uuid: '2b7da266-f978-445f-8c5b-07da611f2464',
                        author: null,
                        description: 'Fair But Not Square',
                        link: null,
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/v28_i37_Fair_But_Not_Square.jpg',
                        items: null,
                        rss: null,
                        title: 'Albuquerque Alibi - Thursday, September 12, 2019',
                        userRead: true
                    },
                    {
                        uuid: '174f6d0e-b7cd-4979-8177-61032be3fefe',
                        author: null,
                        description: 'All the News that\'s fit to print.',
                        link: null,
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/scanNYT2019-09-15.jpg',
                        items: null,
                        rss: null,
                        title: 'New York Times - Sunday, September 15, 2019',
                        userRead: true
                    }
                  ],
                tab: 'thursdayTabInactive' + vm.thursdayMonth,
                title: 'Externals'
                }
              ];
        vm.toggleTabs = toggleTabs;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.toggleReadStatus = toggleReadStatus;
        vm.thursdayManagerEngaged = thursdayManagerEngaged;
        vm.managerModalState = 'thursdayManageTabsSubsModalInactive' + vm.thursdayMonth;
        vm.exitThursdayManagerModal = exitThursdayManagerModal;
        vm.thursdayManageTabber = thursdayManageTabber;
        vm.filterSearch = filterSearch;
        vm.removeSubscription = removeSubscription;
        vm.addSubscription = addSubscription;
        vm.tabCreateEditEngaged = false;
        vm.uniqueTabNameError = false;
        vm.actionWillDeleteFeedsError = false;
        vm.editTablogic = editTablogic;
        vm.togglePodcastFeedStatus = togglePodcastFeedStatus;
        vm.cancelAddTabLogic = cancelAddTabLogic;
        vm.submitTabLogic = submitTabLogic;
        vm.overwriteSubscriptionsInTab = overwriteSubscriptionsInTab;
        vm.addTabLogic = addTabLogic;
        vm.thursdayGuardRailEngaged = false;
        vm.deleteTabLogic = deleteTabLogic;
        vm.guardrailDenied = guardrailDenied;
        vm.guardrailAccepted = guardrailAccepted;
        
        function guardrailAccepted() {
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === vm.editingTab.title) {
                    vm.thursdayTabs.splice(i, 1);
                    guardrailDenied();
                    return;
                }
            }
        }
        
        function guardrailDenied() {
            vm.thursdayGuardRailEngaged = false;
            vm.managerModalState = 'thursdayManageTabsSubsModal' + vm.thursdayMonth;
        }
        
        function deleteTabLogic(tab) {
            vm.editingTab = tab;
            vm.thursdayGuardRailEngaged = true;
            vm.guardRailText = 'Delete tab: ' + tab.title + '?';
            vm.managerModalState = 'thursdayManageTabsSubsModalBlur' + vm.thursdayMonth;
        }
        
        function addTabLogic() {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.managerModalState = 'thursdayManageTabsSubsModalBlur' + vm.thursdayMonth;
            vm.thursdayCreateEditTabText = 'Create a new tab:';
            setTimeout(() => {
                let thursdayTabNameInput = document.getElementById('thursdayTabNameInput');
                thursdayTabNameInput.value = '';
                thursdayTabNameInput.focus();
            }, 100);
        }
        
        function overwriteSubscriptionsInTab() {
            let thursdayTabNameInput = document.getElementById('thursdayTabNameInput');

            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === vm.editingTab.title) {
                    vm.thursdayTabs[i].active = vm.editingTab.active;
                    vm.thursdayTabs[i].allRead = false;
                    vm.thursdayTabs[i].podcast = vm.tabPodcast;
                    vm.thursdayTabs[i].sort = vm.editingTab.sort;
                    vm.thursdayTabs[i].subscriptions = [];
                    vm.thursdayTabs[i].tab = vm.editingTab.tab;
                    vm.thursdayTabs[i].title = thursdayTabNameInput.value;
                    vm.thursdayTabs = [];
                    cancelAddTabLogic();
                }
            }
            if (vm.tabPodcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.thursdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.thursdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            }
        }

        function submitTabLogic() {
            let thursdayTabNameInput = document.getElementById('thursdayTabNameInput');
            if (thursdayTabNameInput.value === '') {
                vm.emptyTabNameError = true;
                vm.uniqueTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            let duplicate = vm.thursdayTabs.filter(entry => {
                return (entry.title.toLowerCase() === thursdayTabNameInput.value.toLowerCase().trim());
            });
            if ((duplicate.length !== 0) && (vm.thursdayCreateEditTabText === 'Create a new tab:')) {
                vm.uniqueTabNameError = true;
                vm.emptyTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            if (vm.thursdayCreateEditTabText === 'Create a new tab:') {
                let sorta, sortb;
                let daily = [];
                daily.push(vm.thursdayTabs[0]);
                let external = [];
                external.push(vm.thursdayTabs[vm.thursdayTabs.length - 1]);
                let thursSubs = vm.thursdayTabs.slice(1, (vm.thursdayTabs.length - 1));
                let subObj = {
                    active: false,
                    allRead: false,
                    podcast: vm.tabPodcast,
                    sort: 'up',
                    subscriptions: [],
                    tab: 'thursdayTabInactive' + vm.thursdayMonth,
                    title: thursdayTabNameInput.value
                }
                thursSubs.push(subObj);
                thursSubs = thursSubs.sort((a, b) => {
                    sorta = a.title.toLowerCase();
                    sortb = b.title.toLowerCase();
                    if (a.title.toLowerCase().slice(0, 4) === 'the ') {
                        sorta = a.title.toLowerCase().slice(4);
                    }
                    if (b.title.toLowerCase().slice(0, 4) === 'the ') {
                        sortb = b.title.toLowerCase().slice(4);
                    }
                    if (a.title.toLowerCase().slice(0, 2) === 'a ') {
                        sorta = a.title.toLowerCase().slice(2);
                    }
                    if (b.title.toLowerCase().slice(0, 2) === 'a ') {
                        sortb = b.title.toLowerCase().slice(2);
                    }
                    if (sorta < sortb) {
                        return -1;
                    } else if (sorta > sortb) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                let subs = daily.concat(wedSubs);
                vm.thursdayTabs = subs.concat(external);
                cancelAddTabLogic();
                return;
            } else {
                if (thursdayTabNameInput.value === vm.editingTab.title) {
                    if (vm.tabPodcast === vm.editingTab.podcast) {
                        cancelAddTabLogic();
                        return;
                    } else {
                        if (vm.editingTab.subscriptions.length > 0) {
                            vm.actionWillDeleteFeedsError = true;
                            vm.emptyTabNameError = false;
                            vm.uniqueTabNameError = false;
                            return;
                        } else {
                            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                                if (vm.thursdayTabs[i].title === vm.editingTab.title) {
                                    vm.thursdayTabs[i].podcast = vm.tabPodcast;
                                    cancelAddTabLogic();
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    if (vm.tabPodcast === vm.editingTab.podcast) {
                        for (let i = 0; i < vm.thursdayTabs.length; i++) {
                            if (vm.thursdayTabs[i].title === vm.editingTab.title) {
                                vm.thursdayTabs[i].title = thursdayTabNameInput.value;
                                cancelAddTabLogic();
                                return;
                            }
                        }
                    } else {
                        if (vm.editingTab.subscriptions.length > 0) {
                            vm.actionWillDeleteFeedsError = true;
                            vm.emptyTabNameError = false;
                            vm.uniqueTabNameError = false;
                            return;
                        } else {
                            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                                if (vm.thursdayTabs[i].title === vm.editingTab.title) {
                                    vm.thursdayTabs[i].title = thursdayTabNameInput.value;
                                    vm.thursdayTabs[i].podcast = vm.tabPodcast;
                                    return;
                                }
                            }
                        }
                    }

                }
            }
        }

        function cancelAddTabLogic() {
            vm.tabCreateEditEngaged = false;
            vm.managerModalState = 'thursdayManageTabsSubsModal' + vm.thursdayMonth;
        }

        function togglePodcastFeedStatus() {
            vm.tabPodcast = !vm.tabPodcast;
        }

        function editTablogic(tab) {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.tabPodcast = tab.podcast;
            vm.editingTab = tab;
            vm.managerModalState = 'thursdayManageTabsSubsModalBlur' + vm.thursdayMonth;
            vm.thursdayCreateEditTabText = 'Edit tab:';
            setTimeout(() => {
                let thursdayTabNameInput = document.getElementById('thursdayTabNameInput');
                thursdayTabNameInput.value = tab.title;
                thursdayTabNameInput.focus();
            }, 100);
        }

        function addSubscription(feed) {
            let sorta, sortb;

            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === vm.thursdayManageSelectedTab) {
                    feed.userRead = false;
                    vm.thursdayTabs[i].subscriptions.push(feed);
                    if (vm.thursdayTabs[i].sort === 'up') {
                        vm.thursdayTabs[i].subscriptions = vm.thursdayTabs[i].subscriptions.sort((a, b) => {
                            sorta = a.title.toLowerCase();
                            sortb = b.title.toLowerCase();
                            if (a.title.toLowerCase().slice(0, 4) === 'the ') {
                                sorta = a.title.toLowerCase().slice(4);
                            }
                            if (b.title.toLowerCase().slice(0, 4) === 'the ') {
                                sortb = b.title.toLowerCase().slice(4);
                            }
                            if (a.title.toLowerCase().slice(0, 2) === 'a ') {
                                sorta = a.title.toLowerCase().slice(2);
                            }
                            if (b.title.toLowerCase().slice(0, 2) === 'a ') {
                                sortb = b.title.toLowerCase().slice(2);
                            }
                            if (sorta < sortb) {
                                return -1;
                            } else if (sorta > sortb) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    } else if (vm.thursdayTabs[i].sort === 'down') {
                        vm.thursdayTabs[i].subscriptions = vm.thursdayTabs[i].subscriptions.sort((a, b) => {
                            sorta = a.title.toLowerCase();
                            sortb = b.title.toLowerCase();
                            if (a.title.toLowerCase().slice(0, 4) === 'the ') {
                                sorta = a.title.toLowerCase().slice(4);
                            }
                            if (b.title.toLowerCase().slice(0, 4) === 'the ') {
                                sortb = b.title.toLowerCase().slice(4);
                            }
                            if (a.title.toLowerCase().slice(0, 2) === 'a ') {
                                sorta = a.title.toLowerCase().slice(2);
                            }
                            if (b.title.toLowerCase().slice(0, 2) === 'a ') {
                                sortb = b.title.toLowerCase().slice(2);
                            }
                            if (sorta < sortb) {
                                return 1;
                            } else if (sorta > sortb) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                    }
                    vm.thursdaySubs = vm.thursdayTabs[i].subscriptions;
                    for (let k = 0; k < vm.availableFeeds.length; k++) {
                        if (vm.availableFeeds[k].uuid === feed.uuid) {
                            vm.availableFeeds.splice(k, 1);
                            return;
                        }
                    }
                }
            }
        }
        
        function removeExternal(uuid) {
            $http.delete(`/externals/${uuid}`);
        }

        function removeSubscription(sub) {
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === vm.thursdayManageSelectedTab) {
                    for (let j = 0; j < vm.thursdayTabs[i].subscriptions.length; j++) {
                        if (vm.thursdayTabs[i].subscriptions[j].uuid === sub.uuid) {
                            if (vm.thursdayTabs[i].title === 'Externals') {
                                removeExternal(sub.uuid);
                            }
                            vm.thursdayTabs[i].subscriptions.splice(j, 1);
                            vm.thursdaySubs = vm.thursdaySubs.filter(entry => {
                                return (entry.uuid !== sub.uuid);
                            });
                            if (vm.thursdayTabs[i].title !== 'Externals') {
                                vm.availableFeeds.push(sub);
                            }
                            filterSearch();
                            return;
                        }
                    }
                }
            }
        }

        function filterSearch() {
            let query = document.getElementById('thursdayManageSearch').value;
            if (query === '') {
                vm.availableFeeds = vm.allFeeds;
            } else {
                vm.availableFeeds = vm.allFeeds.filter(entry => {
                    return (entry.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                });
            }
        }

        function filterSubscriptions(feedsList, subsList) {
            let index = null;
            let sorta, sortb;

            for (let i = 0; i < feedsList.length; i++) {
                index = null;
                for (let j = 0; j < subsList.length; j++) {
                    if (feedsList[i].uuid === subsList[j].uuid) {
                        index = j;
                        j = subsList.length;
                    }
                }
                if (index !== null) {
                    subsList.splice(index, 1);
                }
            }

            subsList = subsList.sort((a, b) => {
                sorta = a.title.toLowerCase();
                sortb = b.title.toLowerCase();
                if (a.title.toLowerCase().slice(0, 4) === 'the ') {
                    sorta = a.title.toLowerCase().slice(4);
                }
                if (b.title.toLowerCase().slice(0, 4) === 'the ') {
                    sortb = b.title.toLowerCase().slice(4);
                }
                if (a.title.toLowerCase().slice(0, 2) === 'a ') {
                    sorta = a.title.toLowerCase().slice(2);
                }
                if (b.title.toLowerCase().slice(0, 2) === 'a ') {
                    sortb = b.title.toLowerCase().slice(2);
                }
                if (sorta < sortb) {
                    return -1;
                } else if (sorta > sortb) {
                    return 1;
                } else {
                    return 0;
                }
            });

            return (subsList);
        }

        function thursdayManageTabber(tabTitle) {
            vm.thursdayManageSelectedTab = tabTitle;
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === tabTitle) {
                    vm.thursdaySubs = vm.thursdayTabs[i].subscriptions;
                    if (tabTitle !== 'Externals') {
                        if (vm.thursdayTabs[i].podcast) {
                            $http.get('/podcast_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.thursdaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        } else {
                            $http.get('/blog_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.thursdaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        }
                    } else {
                        vm.allFeeds = [];
                        vm.availableFeeds = vm.allFeeds;
                    }
                }
            }
        }

        function exitThursdayManagerModal() {
            vm.managerModalState = 'thursdayManageTabsSubsModalInactive' + vm.thursdayMonth;
            vm.thursdayContainerState = 'thursdayContainerActive' + vm.thursdayMonth;
        }

        function thursdayManagerEngaged() {
            //            document.getElementById('thursdayManageSearch').value = '';
            vm.thursdayManageSelectedTab = vm.thursdayTabs[0].title;
            vm.thursdaySubs = vm.thursdayTabs[0].subscriptions;
            if (vm.thursdayTabs[0].podcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.thursdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.thursdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            }
            vm.managerModalState = 'thursdayManageTabsSubsModal' + vm.thursdayMonth;
            vm.thursdayContainerState = 'thursdayContainerInactive' + vm.thursdayMonth;
        }

        function toggleReadStatus(contentTitle, subUuid) {
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === contentTitle) {
                    for (let j = 0; j < vm.thursdayTabs[i].subscriptions.length; j++) {
                        if (vm.thursdayTabs[i].subscriptions[j].uuid === subUuid) {
                            vm.thursdayTabs[i].subscriptions[j].userRead = !vm.thursdayTabs[i].subscriptions[j].userRead;
                        }
                    }
                }
            }
        }

        function sortSubscriptions(contentTitle, direction) {
            let sorta, sortb;
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === contentTitle) {
                    vm.thursdayTabs[i].sort = direction;
                    switch (direction) {
                        case ('up'):
                            vm.thursdayTabs[i].subscriptions = vm.thursdayTabs[i].subscriptions.sort((a, b) => {
                                sorta = a.title.toLowerCase();
                                sortb = b.title.toLowerCase();
                                if (a.title.toLowerCase().slice(0, 4) === 'the ') {
                                    sorta = a.title.toLowerCase().slice(4);
                                }
                                if (b.title.toLowerCase().slice(0, 4) === 'the ') {
                                    sortb = b.title.toLowerCase().slice(4);
                                }
                                if (a.title.toLowerCase().slice(0, 2) === 'a ') {
                                    sorta = a.title.toLowerCase().slice(2);
                                }
                                if (b.title.toLowerCase().slice(0, 2) === 'a ') {
                                    sortb = b.title.toLowerCase().slice(2);
                                }
                                if (sorta < sortb) {
                                    return -1;
                                } else if (sorta > sortb) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            });
                            break;
                        case ('down'):
                            vm.thursdayTabs[i].subscriptions = vm.thursdayTabs[i].subscriptions.sort((a, b) => {
                                sorta = a.title.toLowerCase();
                                sortb = b.title.toLowerCase();
                                if (a.title.toLowerCase().slice(0, 4) === 'the ') {
                                    sorta = a.title.toLowerCase().slice(4);
                                }
                                if (b.title.toLowerCase().slice(0, 4) === 'the ') {
                                    sortb = b.title.toLowerCase().slice(4);
                                }
                                if (a.title.toLowerCase().slice(0, 2) === 'a ') {
                                    sorta = a.title.toLowerCase().slice(2);
                                }
                                if (b.title.toLowerCase().slice(0, 2) === 'a ') {
                                    sortb = b.title.toLowerCase().slice(2);
                                }
                                if (sorta < sortb) {
                                    return 1;
                                } else if (sorta > sortb) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                            break;
                        case ('random'):
                            let index
                            for (let k = 0; k < (vm.wednthursdayTabsesdayTabs[i].subscriptions.length * 10); k++) {
                                for (let j = 0; j < vm.thursdayTabs[i].subscriptions.length; j++) {
                                    index = Math.floor(Math.random() * vm.thursdayTabs[i].subscriptions.length);
                    [vm.thursdayTabs[i].subscriptions[j], vm.thursdayTabs[i].subscriptions[index]] = [vm.thursdayTabs[i].subscriptions[index], vm.thursdayTabs[i].subscriptions[j]];
                                }
                            }
                            break;
                        default:
                            console.log(direction + ' is unsupported.');
                            alert('ERROR: ' + direction + ' failed.');
                    }
                }
            }
        }

        function toggleAllReadStatus(contentTitle) {
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === contentTitle) {
                    vm.thursdayTabs[i].allRead = !vm.thursdayTabs[i].allRead;
                    for (let j = 0; j < vm.thursdayTabs[i].subscriptions.length; j++) {
                        vm.thursdayTabs[i].subscriptions[j].userRead = vm.thursdayTabs[i].allRead;
                    }
                }
            }
        }

        function toggleTabs(tabTitle) {
            for (let i = 0; i < vm.thursdayTabs.length; i++) {
                if (vm.thursdayTabs[i].title === tabTitle) {
                    vm.thursdayTabs[i].active = true;
                    vm.thursdayTabs[i].tab = 'thursdayTabActive' + vm.thursdayMonth;
                } else {
                    vm.thursdayTabs[i].active = false;
                    vm.thursdayTabs[i].tab = 'thursdayTabInactive' + vm.thursdayMonth;
                }
            }
        }
        
        function updateExternalsReadStatus(sub) {
            let now = new Date();
            $http.patch(`/externals/${sub.uuid}`, {
                userRead: sub.userRead,
                updated_at: now
            });
        }


        function navigateToHub() {
//            let now = new Date();
//            let tabs = vm.thursdayTabs.filter(entry => {
//                return ((entry.title !== 'Dailies') && (entry.title !== 'Externals'));
//            });
//            let dailyTab = vm.thursdayTabs.filter(entry => {
//                return (entry.title === 'Dailies');
//            });
//            let externalTab = vm.thursdayTabs.filter(entry => {
//                return(entry.title === 'Externals');
//            });
//            for (let i = 0; i < externalTab[0].subscriptions.length; i++) {
//                updateExternalsReadStatus(externalTab[0].subscriptions[i]);
//            }
//            $http.patch(`/thursday_subscriptions/${vm.user.uuid}`, {
//                    tabs: {
//                        tabs: tabs
//                    },
//                    updated_at: new Date()
//                })
//                .then(() => {
//                    $http.get(`/dailies/byuser/${vm.user.uuid}`)
//                        .then(userDailyData => {
//                            let userDaily = userDailyData.data;
//                            userDaily.dailies.dailies = dailyTab[0];
//                            userDaily.updated_at = now;
//                            $http.patch(`/dailies/${userDaily.uuid}`, userDaily)
//                                .then(() => {
//                                    $state.go('userhub', {
//                                        id: vm.user.uuid
//                                    });
//                                });
//                        });
//                });
            $state.go('userhub', {
                id: vm.user.uuid
            });

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
        
        function populatethursdayTabs(userUuid) {
            $http.get(`/thursday_subscriptions/assembled/${userUuid}`)
                .then(assembledSubsData => {
                    let assembledSubs = assembledSubsData.data;
                    for (let i = 0; i < assembledSubs.length; i++) {
                        if (assembledSubs[i].active) {
                            assembledSubs[i].tab = 'thursdayTabActive' + vm.thursdayMonth;
                            if (i > 0) {
                                assembledSubs[0].active = false;
                                assembledSubs[0].tab = 'thursdayTabInactive' + vm.thursdayMonth;
                            }
                        } else {
                            assembledSubs[i].tab = 'thursdayTabInactive' + vm.thursdayMonth;
                        }
                    }
                    vm.thursdayTabs = assembledSubs;
                });
        }

        function onInit() {
            console.log("Thursday is lit");

            switch (vm.thursdayMonth) {
                case ('_JanuaryA'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                    break;
                case ('_JanuaryB'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
                    break;
                case ('_JanuaryC'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }

            setUserIPAddress();
            setFooterMessage();
//            populatethursdayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
