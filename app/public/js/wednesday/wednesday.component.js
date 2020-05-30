(function () {
    'use strict';

    angular.module('app')
        .component('wednesday', {
            controller: WednesdayController,
            templateUrl: '/js/wednesday/wednesday.template.html'
        });

    WednesdayController.$inject = ['$http', '$state', '$stateParams'];

    function WednesdayController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.wednesdayMonth = '_JanuaryB';
        vm.wednesdayContainerState = 'wednesdayContainerActive' + vm.wednesdayMonth;
        vm.navigateToHub = navigateToHub;
        vm.wednesdayTabs = [
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
                tab: 'wednesdayTabActive' + vm.wednesdayMonth,
                title: 'Dailies'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'af66bdc7-e46c-43b8-a39c-878d80f01b6b',
                        author: null,
                        description: 'All about the JavaScript programming language!',
                        link: 'https://www.reddit.com/r/javascript/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/5589238-reddit-icon-vector-images-icon-sign-and-symbols-reddit-logo-png-300_300_preview.png',
                        items: null,
                        rss: 'https://reddit.com/r/javascript/.rss',
                        title: 'javascript',
                        userRead: false
                    },
                    {
                        uuid: 'f99c2c48-c52c-4d9d-8d60-8756a61620a6',
                        author: null,
                        description: 'Learn CSS | HTML5 | JavaScript | Wordpress | Tutorials-Web Development | Reference | Books and More',
                        link: 'https://www.sitepoint.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/58482e76cef1014c0b5e4a6c.png',
                        items: null,
                        rss: 'https://sitepoint.com/feed',
                        title: 'SitePoint',
                        userRead: false
                    },
                    {
                        uuid: 'fceb9120-e6a1-4be1-bbe5-aef9db874440',
                        author: null,
                        description: 'Where programmers share ideas and help each other grow—A constructive and inclusive social network.',
                        link: 'https://dev.to/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/devtorainbow.png',
                        items: null,
                        rss: 'https://dev.to/feed',
                        title: 'DEV Community',
                        userRead: false
                    },
                    {
                        uuid: 'cce488c6-e563-4de3-b6bc-266ba896ce61',
                        author: null,
                        description: 'Description pending',
                        link: 'http://www.echojs.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/acdaff17c49fc10cfb43a2e557804099_400x400.png',
                        items: null,
                        rss: 'https://www.echojs.com/rss',
                        title: 'Echo JS',
                        userRead: false
                    },
                    {
                        uuid: '03520f1f-b069-4a3d-9329-69451cf9c9e6',
                        author: null,
                        description: 'A free, once–weekly e-mail round-up of Node.js news and articles.',
                        link: 'https://nodeweekly.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/qzlqdaj4qzm2bzcdliyp.png',
                        items: null,
                        rss: 'https://nodeweekly.com/rss/12acdl5j',
                        title: 'Node Weekly',
                        userRead: false
                    },
                    {
                        uuid: '6ba1eb91-375b-4d49-b47a-f9661682f9ba',
                        author: null,
                        description: 'Google News',
                        link: 'https://news.google.com/search?q=javascript&hl=en-US&gl=US&ceid=US%3Aen',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/1200px-Google_News_icon.svg.png',
                        items: null,
                        rss: 'https://news.google.com/rss/search?pz=1&cf=all&topic=topics&q=javascript&hl=en-US&num=10&gl=US&ceid=US:en',
                        title: 'Google News - Javascript',
                        userRead: false
                    },
                    {
                        uuid: '66a55437-b871-43c3-b420-fb4fd4b3105f',
                        author: 'JSConf',
                        description: '',
                        link: 'https://www.youtube.com/channel/UCzoVCacndDCfGDf41P-z0iA',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/jsconf_eu.png',
                        items: null,
                        rss: 'https://www.youtube.com/channel/UCzoVCacndDCfGDf41P-z0iA',
                        title: 'JSConf',
                        userRead: false
                    }
                  ],
                tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                title: 'Coding'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '2cae1952-92b6-47ba-a071-6c26ffb7bf3b',
                        author: null,
                        description: '',
                        link: 'https://www.dailywritingtips.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/dwt_400x400.gif',
                        items: null,
                        rss: 'https://www.dailywritingtips.com/feed/',
                        title: 'Daily Writing Tips',
                        userRead: false
                    },
                    {
                        uuid: '4fab6bab-b9bf-4e30-8ff4-2b2929d624be',
                        author: null,
                        description: 'Writing, self-publishing, book marketing, making a living with your writing',
                        link: 'https://www.thecreativepenn.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/theCreativePenn.jpg',
                        items: null,
                        rss: 'http://feeds.feedburner.com/TheCreativePenn',
                        title: 'The Creative Penn',
                        userRead: false
                    },
                    {
                        uuid: 'a03e655b-8905-4009-8637-054a3a2781f0',
                        author: null,
                        description: 'The Online Writing Workbook',
                        link: 'https://thewritepractice.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/writePracticeLogo.jpeg',
                        items: null,
                        rss: 'https://thewritepractice.com/feed/',
                        title: 'The Write Practice',
                        userRead: false
                    },
                    {
                        uuid: '5b0e0672-1206-476e-86e1-6a5c10cf0eb9',
                        author: null,
                        description: 'about the craft and business of fiction',
                        link: 'https://writerunboxed.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/smaller-jpg-Unconference-e1399854512236.jpg',
                        items: null,
                        rss: 'http://feeds.feedburner.com/WriterUnboxed',
                        title: 'Writer Unboxed',
                        userRead: false
                    },
                    {
                        uuid: 'e6d6a7ec-ab9a-4b89-a4e3-cb9309e25b22',
                        author: null,
                        description: 'Creative Writing Tips and Ideas',
                        link: 'https://www.writingforward.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/4f6ee35db80d664bb6fb85dfa71e8963.jpg',
                        items: null,
                        rss: 'http://feeds.feedburner.com/WritingForward',
                        title: 'Writing Forward',
                        userRead: false
                    }
                  ],
                tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                title: 'Writing'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'fdb900a9-b8d3-4408-b7f2-f379a468df22',
                        author: null,
                        description: 'The Internet\'s Band of Incorrigible Spitballers® Since 2006',
                        link: 'https://mockpaperscissors.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/dump-trump.jpg',
                        items: null,
                        rss: 'https://mockpaperscissors.com/feed/',
                        title: 'Mock Paper Scissors',
                        userRead: false
                    },
                    {
                        uuid: 'bb51cad9-ef52-4910-9184-559edd28647f',
                        author: null,
                        description: '"We deal in illusions, man. None of it is true. But you people sit there day after day, night after night, all ages, colors, creeds. We\'re all you know. You\'re beginning to believe the illusions we\'re spinning here. You\'re beginning to think that the tube is reality and that your own lives are unreal. You do whatever the tube tells you. You dress like the tube. You eat like the tube. You even think like the tube. In God\'s name, you people are the real thing, WE are the illusion." -Howard Beale',
                        link: 'https://digbysblog.blogspot.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/network-howard-beal.jpg',
                        items: null,
                        rss: 'http://digbysblog.blogspot.com/feeds/posts/default',
                        title: 'Hullabaloo',
                        userRead: false
                    },
                    {
                        uuid: 'a56f0791-9ade-4c22-9ef8-564efdaaa4ff',
                        author: null,
                        description: 'Like Kryptonite To Stupid',
                        link: 'https://oliverwillis.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/willis1.jpeg',
                        items: null,
                        rss: 'https://oliverwillis.com/feed/',
                        title: 'Oliver Willis',
                        userRead: false
                    },
                    {
                        uuid: 'd4449a9f-0589-4875-bb7e-daa523666a94',
                        author: 'DownWithTyranny',
                        description: '"When fascism comes to America, it will be wrapped in the flag and carrying the cross." -- Sinclair Lewis',
                        link: 'https://downwithtyranny.blogspot.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/dwtlgob_400x400.jpg',
                        items: null,
                        rss: 'https://downwithtyranny.blogspot.com/feeds/posts/default',
                        title: 'DownWithTyranny!',
                        userRead: false
                    },
                    {
                        uuid: '5a271358-a6d3-471a-ba17-30f481d3b98b',
                        author: null,
                        description: 'Music, Film, TV and Political News Coverage',
                        link: 'https://www.rollingstone.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/RS_Monogram_3000px-copy-e1530547673203.png',
                        items: null,
                        rss: 'https://www.rollingstone.com/politics/feed',
                        title: 'Politics',
                        userRead: false
                    }
                  ],
                tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                title: 'Politics'
                },
            {
                active: false,
                allRead: false,
                podcast: true,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'e77fb9d5-5df2-40fd-9010-0d65435c49ca',
                        author: 'Book Riot',
                        description: 'Book Riot - The Podcast is a weekly news and talk show about what\'s new, cool, and worth talking about in the world of books and reading, brought to you by the editors of BookRiot.com',
                        link: 'https://bookriot.com/listen/shows/thepodcast/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/bookRiotPodcast.jpg',
                        items: null,
                        rss: 'https://omny.fm/shows/book-riot-the-podcast-1/playlists/podcast.rss',
                        title: 'Book Riot - The Podcast',
                        userRead: false
                    }
                  ],
                tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                title: 'Book Podcasts'
                },
            {
                active: false,
                allRead: false,
                podcast: true,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'ced9116d-00e6-4b86-b99a-b50c65b1be7b',
                        author: 'Devchat.tv',
                        description: 'A weekly exploration into the people who make JavaScript what it is.',
                        link: 'http://devchat.tv/my-js-story',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/MyJSStory.jpg',
                        items: null,
                        rss: 'https://feeds.feedwrench.com/my-js-story.rss',
                        title: 'My JavaScript Story',
                        userRead: false
                    }
                  ],
                tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                title: 'Coding Podcasts'
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
                tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                title: 'Externals'
                }
              ];
        vm.toggleTabs = toggleTabs;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.toggleReadStatus = toggleReadStatus;
        vm.wednesdayManagerEngaged = wednesdayManagerEngaged;
        vm.managerModalState = 'wednesdayManageTabsSubsModalInactive' + vm.wednesdayMonth;
        vm.exitWednesdayManagerModal = exitWednesdayManagerModal;
        vm.wednesdayManageTabber = wednesdayManageTabber;
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
        vm.wednesdayGuardRailEngaged = false;
        vm.deleteTabLogic = deleteTabLogic;
        vm.guardrailDenied = guardrailDenied;
        vm.guardrailAccepted = guardrailAccepted;
        
        function guardrailAccepted() {
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === vm.editingTab.title) {
                    vm.wednesdayTabs.splice(i, 1);
                    guardrailDenied();
                    return;
                }
            }
        }
        
        function guardrailDenied() {
            vm.wednesdayGuardRailEngaged = false;
            vm.managerModalState = 'wednesdayManageTabsSubsModal' + vm.wednesdayMonth;
        }
        
        function deleteTabLogic(tab) {
            vm.editingTab = tab;
            vm.wednesdayGuardRailEngaged = true;
            vm.guardRailText = 'Delete tab: ' + tab.title + '?';
            vm.managerModalState = 'wednesdayManageTabsSubsModalBlur' + vm.wednesdayMonth;
        }
        
        function addTabLogic() {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.managerModalState = 'wednesdayManageTabsSubsModalBlur' + vm.wednesdayMonth;
            vm.wednesdayCreateEditTabText = 'Create a new tab:';
            setTimeout(() => {
                let wednesdayTabNameInput = document.getElementById('wednesdayTabNameInput');
                wednesdayTabNameInput.value = '';
                wednesdayTabNameInput.focus();
            }, 100);
        }
        
        function overwriteSubscriptionsInTab() {
            let wednesdayTabNameInput = document.getElementById('wednesdayTabNameInput');

            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === vm.editingTab.title) {
                    vm.wednesdayTabs[i].active = vm.editingTab.active;
                    vm.wednesdayTabs[i].allRead = false;
                    vm.wednesdayTabs[i].podcast = vm.tabPodcast;
                    vm.wednesdayTabs[i].sort = vm.editingTab.sort;
                    vm.wednesdayTabs[i].subscriptions = [];
                    vm.wednesdayTabs[i].tab = vm.editingTab.tab;
                    vm.wednesdayTabs[i].title = wednesdayTabNameInput.value;
                    vm.wednesdaySubs = [];
                    cancelAddTabLogic();
                }
            }
            if (vm.tabPodcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.wednesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.wednesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            }
        }

        function submitTabLogic() {
            let wednesdayTabNameInput = document.getElementById('wednesdayTabNameInput');
            if (wednesdayTabNameInput.value === '') {
                vm.emptyTabNameError = true;
                vm.uniqueTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            let duplicate = vm.wednesdayTabs.filter(entry => {
                return (entry.title.toLowerCase() === wednesdayTabNameInput.value.toLowerCase().trim());
            });
            if ((duplicate.length !== 0) && (vm.wednesdayCreateEditTabText === 'Create a new tab:')) {
                vm.uniqueTabNameError = true;
                vm.emptyTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            if (vm.wednesdayCreateEditTabText === 'Create a new tab:') {
                let sorta, sortb;
                let daily = [];
                daily.push(vm.wednesdayTabs[0]);
                let external = [];
                external.push(vm.wednesdayTabs[vm.wednesdayTabs.length - 1]);
                let wedSubs = vm.wednesdayTabs.slice(1, (vm.wednesdayTabs.length - 1));
                let subObj = {
                    active: false,
                    allRead: false,
                    podcast: vm.tabPodcast,
                    sort: 'up',
                    subscriptions: [],
                    tab: 'wednesdayTabInactive' + vm.wednesdayMonth,
                    title: wednesdayTabNameInput.value
                }
                wedSubs.push(subObj);
                wedSubs = wedSubs.sort((a, b) => {
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
                vm.wednesdayTabs = subs.concat(external);
                cancelAddTabLogic();
                return;
            } else {
                if (wednesdayTabNameInput.value === vm.editingTab.title) {
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
                            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                                if (vm.wednesdayTabs[i].title === vm.editingTab.title) {
                                    vm.wednesdayTabs[i].podcast = vm.tabPodcast;
                                    cancelAddTabLogic();
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    if (vm.tabPodcast === vm.editingTab.podcast) {
                        for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                            if (vm.wednesdayTabs[i].title === vm.editingTab.title) {
                                vm.wednesdayTabs[i].title = wednesdayTabNameInput.value;
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
                            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                                if (vm.wednesdayTabs[i].title === vm.editingTab.title) {
                                    vm.wednesdayTabs[i].title = wednesdayTabNameInput.value;
                                    vm.wednesdayTabs[i].podcast = vm.tabPodcast;
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
            vm.managerModalState = 'wednesdayManageTabsSubsModal' + vm.wednesdayMonth;
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
            vm.managerModalState = 'wednesdayManageTabsSubsModalBlur' + vm.wednesdayMonth;
            vm.wednesdayCreateEditTabText = 'Edit tab:';
            setTimeout(() => {
                let wednesdayTabNameInput = document.getElementById('wednesdayTabNameInput');
                wednesdayTabNameInput.value = tab.title;
                wednesdayTabNameInput.focus();
            }, 100);
        }

        function addSubscription(feed) {
            let sorta, sortb;

            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === vm.wednesdayManageSelectedTab) {
                    feed.userRead = false;
                    vm.wednesdayTabs[i].subscriptions.push(feed);
                    if (vm.wednesdayTabs[i].sort === 'up') {
                        vm.wednesdayTabs[i].subscriptions = vm.wednesdayTabs[i].subscriptions.sort((a, b) => {
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
                    } else if (vm.wednesdayTabs[i].sort === 'down') {
                        vm.wednesdayTabs[i].subscriptions = vm.wednesdayTabs[i].subscriptions.sort((a, b) => {
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
                    vm.wednesdaySubs = vm.wednesdayTabs[i].subscriptions;
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
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === vm.wednesdayManageSelectedTab) {
                    for (let j = 0; j < vm.wednesdayTabs[i].subscriptions.length; j++) {
                        if (vm.wednesdayTabs[i].subscriptions[j].uuid === sub.uuid) {
                            if (vm.wednesdayTabs[i].title === 'Externals') {
                                removeExternal(sub.uuid);
                            }
                            vm.wednesdayTabs[i].subscriptions.splice(j, 1);
                            vm.wednesdaySubs = vm.wednesdaySubs.filter(entry => {
                                return (entry.uuid !== sub.uuid);
                            });
                            if (vm.wednesdayTabs[i].title !== 'Externals') {
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
            let query = document.getElementById('wednesdayManageSearch').value;
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

        function wednesdayManageTabber(tabTitle) {
            vm.wednesdayManageSelectedTab = tabTitle;
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === tabTitle) {
                    vm.wednesdaySubs = vm.wednesdayTabs[i].subscriptions;
                    if (tabTitle !== 'Externals') {
                        if (vm.wednesdayTabs[i].podcast) {
                            $http.get('/podcast_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.wednesdaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        } else {
                            $http.get('/blog_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.wednesdaySubs, blogFeedsData.data);
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

        function exitWednesdayManagerModal() {
            vm.managerModalState = 'wednesdayManageTabsSubsModalInactive' + vm.wednesdayMonth;
            vm.wednesdayContainerState = 'wednesdayContainerActive' + vm.wednesdayMonth;
        }

        function wednesdayManagerEngaged() {
            //            document.getElementById('wednesdayManageSearch').value = '';
            vm.wednesdayManageSelectedTab = vm.wednesdayTabs[0].title;
            vm.wednesdaySubs = vm.wednesdayTabs[0].subscriptions;
            if (vm.wednesdayTabs[0].podcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.wednesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.wednesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            }
            vm.managerModalState = 'wednesdayManageTabsSubsModal' + vm.wednesdayMonth;
            vm.wednesdayContainerState = 'wednesdayContainerInactive' + vm.wednesdayMonth;
        }

        function toggleReadStatus(contentTitle, subUuid) {
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === contentTitle) {
                    for (let j = 0; j < vm.wednesdayTabs[i].subscriptions.length; j++) {
                        if (vm.wednesdayTabs[i].subscriptions[j].uuid === subUuid) {
                            vm.wednesdayTabs[i].subscriptions[j].userRead = !vm.wednesdayTabs[i].subscriptions[j].userRead;
                        }
                    }
                }
            }
        }

        function sortSubscriptions(contentTitle, direction) {
            let sorta, sortb;
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === contentTitle) {
                    vm.wednesdayTabs[i].sort = direction;
                    switch (direction) {
                        case ('up'):
                            vm.wednesdayTabs[i].subscriptions = vm.wednesdayTabs[i].subscriptions.sort((a, b) => {
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
                            vm.wednesdayTabs[i].subscriptions = vm.wednesdayTabs[i].subscriptions.sort((a, b) => {
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
                            for (let k = 0; k < (vm.wednesdayTabs[i].subscriptions.length * 10); k++) {
                                for (let j = 0; j < vm.wednesdayTabs[i].subscriptions.length; j++) {
                                    index = Math.floor(Math.random() * vm.wednesdayTabs[i].subscriptions.length);
                    [vm.wednesdayTabs[i].subscriptions[j], vm.wednesdayTabs[i].subscriptions[index]] = [vm.wednesdayTabs[i].subscriptions[index], vm.wednesdayTabs[i].subscriptions[j]];
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
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === contentTitle) {
                    vm.wednesdayTabs[i].allRead = !vm.wednesdayTabs[i].allRead;
                    for (let j = 0; j < vm.wednesdayTabs[i].subscriptions.length; j++) {
                        vm.wednesdayTabs[i].subscriptions[j].userRead = vm.wednesdayTabs[i].allRead;
                    }
                }
            }
        }

        function toggleTabs(tabTitle) {
            for (let i = 0; i < vm.wednesdayTabs.length; i++) {
                if (vm.wednesdayTabs[i].title === tabTitle) {
                    vm.wednesdayTabs[i].active = true;
                    vm.wednesdayTabs[i].tab = 'wednesdayTabActive' + vm.wednesdayMonth;
                } else {
                    vm.wednesdayTabs[i].active = false;
                    vm.wednesdayTabs[i].tab = 'wednesdayTabInactive' + vm.wednesdayMonth;
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
            let now = new Date();
//            let tabs = vm.wednesdayTabs.filter(entry => {
//                return ((entry.title !== 'Dailies') && (entry.title !== 'Externals'));
//            });
//            let dailyTab = vm.wednesdayTabs.filter(entry => {
//                return (entry.title === 'Dailies');
//            });
//            let externalTab = vm.wednesdayTabs.filter(entry => {
//                return(entry.title === 'Externals');
//            });
//            for (let i = 0; i < externalTab[0].subscriptions.length; i++) {
//                updateExternalsReadStatus(externalTab[0].subscriptions[i]);
//            }
//            $http.patch(`/tuesday_subscriptions/${vm.user.uuid}`, {
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
        
        function populatewednesdayTabs(userUuid) {
//            $http.get(`/tuesday_subscriptions/assembled/${userUuid}`)
//                .then(assembledSubsData => {
//                    let assembledSubs = assembledSubsData.data;
//                    for (let i = 0; i < assembledSubs.length; i++) {
//                        if (assembledSubs[i].active) {
//                            assembledSubs[i].tab = 'wednesdayTabActive' + vm.wednesdayMonth;
//                            if (i > 0) {
//                                assembledSubs[0].active = false;
//                                assembledSubs[0].tab = 'wednesdayTabInactive' + vm.wednesdayMonth;
//                            }
//                        } else {
//                            assembledSubs[i].tab = 'wednesdayTabInactive' + vm.wednesdayMonth;
//                        }
//                    }
//                    vm.wednesdayTabs = assembledSubs;
//                });
        }

        function onInit() {
            console.log("Wednesday is lit");

            switch (vm.wednesdayMonth) {
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
//             populatewednesdayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
