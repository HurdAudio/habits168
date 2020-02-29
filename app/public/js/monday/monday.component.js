(function () {
    'use strict';

    angular.module('app')
        .component('monday', {
            controller: MondayController,
            templateUrl: '/js/monday/monday.template.html'
        });

    MondayController.$inject = ['$http', '$state', '$stateParams'];

    function MondayController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.mondayMonth = '_FebruaryA';
        vm.mondayContainerState = 'mondayContainerActive' + vm.mondayMonth;
        vm.navigateToHub = navigateToHub;
        //        vm.mondayTabs = [
        //            {
        //                active: true,
        //                allRead: false,
        //                podcast: false,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: 'b1c2eff2-81e8-4f19-a1ba-8fff123fb89a',
        //                        author: null,
        //                        description: 'A source for news on music that is challenging, interesting, different, progressive, introspective, or just plain weird',
        //                        link: 'https://avantmusicnews.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/cropped-cropped-amnbanner1.jpg',
        //                        items: null,
        //                        rss: 'https://avantmusicnews.com/rss',
        //                        title: 'Avant Music News',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '2e535aa1-d6d3-4741-9df7-e47ec5ac2260',
        //                        author: null,
        //                        description: 'The latest from Bandcamp',
        //                        link: 'https://daily.bandcamp.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/bc-site-icon1.png',
        //                        items: null,
        //                        rss: 'https://daily.bandcamp.com/feed',
        //                        title: 'Bandcamp Daily',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '9546ff34-ff07-4e31-9332-786ea544ec47',
        //                        author: null,
        //                        description: 'A blog about Major League Baseball',
        //                        link: 'https://www.baseballmusings.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/788443.png',
        //                        items: null,
        //                        rss: 'http://feeds2.feedburner.com/Baseballmusingscom',
        //                        title: 'Baseball Musings',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '321d2897-f108-45c1-96ca-3aa70ec46590',
        //                        author: null,
        //                        description: 'The main page.',
        //                        link: 'http://www.dailykos.com/blogs/main',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/daily-kos-squarelogo-1517554340259.png',
        //                        items: null,
        //                        rss: 'https://feeds.dailykos.com',
        //                        title: 'Daily Kos',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
        //                        author: null,
        //                        description: 'Links for the intellectually curious, ranked by readers.',
        //                        link: 'https://news.ycombinator.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
        //                        items: null,
        //                        rss: 'https://news.ycombinator.com/rss',
        //                        title: 'Hacker News',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: 'b081d79b-ff77-4586-83f3-e9eea5e22c9a',
        //                        author: null,
        //                        description: 'The news according to John Marshall',
        //                        link: 'https://talkingpointsmemo.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/tpm-sq.svg',
        //                        items: null,
        //                        rss: 'https://talkingpointsmemo.com/feed/all',
        //                        title: 'Talking Points Memo',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '5eb65b5e-6896-4357-94af-e48fad7c64cc',
        //                        author: null,
        //                        description: 'Wonkette',
        //                        link: 'https://www.wonkette.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/wonkette.jpg',
        //                        items: null,
        //                        rss: 'https://www.wonkette.com/feeds/feed.rss',
        //                        title: 'Wonkette',
        //                        userRead: false
        //            }
        //          ],
        //                tab: 'mondayTabActive' + vm.mondayMonth,
        //                title: 'Dailies'
        //        },
        //            {
        //                active: false,
        //                allRead: false,
        //                podcast: false,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: '79f05037-72d3-497e-a57a-54012a79407b',
        //                        author: null,
        //                        description: 'Books, articles, and a blog by the music critic of The New Yorker',
        //                        link: 'https://www.therestisnoise.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/41qc8pZFMcL._SL500_.jpg',
        //                        items: null,
        //                        rss: 'https://www.therestisnoise.com/atom.xml',
        //                        title: 'Alex Ross: The Rest Is Noise',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '009b6c3f-14a2-4add-abc2-4ea3380ae67c',
        //                        author: null,
        //                        description: 'Reviews of Free Jazz and Improvised Music',
        //                        link: 'http://www.freejazzblog.org/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/RQxWDoWr_400x400.jpg',
        //                        items: null,
        //                        rss: 'http://www.freejazzblog.org/atom.xml',
        //                        title: 'The Free Jazz Collective',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '4de05f59-d8df-49a0-9ad7-4cc9b80f15ae',
        //                        author: null,
        //                        description: 'New classical music, art, and technology',
        //                        link: 'https://www.icareifyoulisten.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/TvlOzOKS_400x400.jpg',
        //                        items: null,
        //                        rss: 'https://www.icareifyoulisten.com/rss',
        //                        title: 'I CARE IF YOU LISTEN',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '09689d96-f0fb-4a3e-ad8c-1d71cb9545a8',
        //                        author: null,
        //                        description: 'Fostering connections, deepening knowledge, encouraging appreciation, and providing financial support for new music created in the United States',
        //                        link: 'https://www.newmusicusa.org/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/newmusicbox.png',
        //                        items: null,
        //                        rss: 'https://nmbx.newmusicusa.org/rss',
        //                        title: 'NewMusicBox – NewMusicBox',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: 'c1979d0e-d388-44ca-8ab0-a41d422c831a',
        //                        author: null,
        //                        description: 'The Contemporary Classical Music Community',
        //                        link: 'http://www.sequenza21.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/seq21logo1.jpg',
        //                        items: null,
        //                        rss: 'http://www.sequenza21.com/feed',
        //                        title: 'Sequenza21/',
        //                        userRead: false
        //            }
        //          ],
        //                tab: 'mondayTabInactive' + vm.mondayMonth,
        //                title: 'Music'
        //        },
        //            {
        //                active: false,
        //                allRead: false,
        //                podcast: true,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: 'ec2f85e6-aa1d-4195-98f5-217e0525f714',
        //                        author: 'WQXR',
        //                        description: 'Peabody Award-winning podcast that takes listeners into the minds of the composers making some of the most innovative and breathtakingly beautiful music today.',
        //                        link: 'https://www.newsounds.org/shows/meet-composer',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/mtc_waaa_1400.png',
        //                        items: null,
        //                        rss: 'http://feeds.wnyc.org/wqxr-meetthecomposer',
        //                        title: 'Meet the Composer',
        //                        userRead: false
        //            }
        //          ],
        //                tab: 'mondayTabInactive' + vm.mondayMonth,
        //                title: 'Music Podcasts'
        //        },
        //            {
        //                active: false,
        //                allRead: false,
        //                podcast: false,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: '4c2a61cb-27a2-4c56-805a-8282bcf11221',
        //                        author: null,
        //                        description: 'Axios',
        //                        link: 'https://www.axios.com/top/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/axios-vector-logo.png',
        //                        items: null,
        //                        rss: 'http://api.axios.com/feed/',
        //                        title: 'Axios',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '08030a4a-4d9c-4003-89cc-872ad78c8d89',
        //                        author: null,
        //                        description: 'The latest news from TheHill.com',
        //                        link: 'https://thehill.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/theHillLogo.png',
        //                        items: null,
        //                        rss: 'http://thehill.com/rss/syndicator/19109',
        //                        title: 'The Hill - The Hill News',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: 'bb51cad9-ef52-4910-9184-559edd28647f',
        //                        author: null,
        //                        description: '"We deal in illusions, man. None of it is true. But you people sit there day after day, night after night, all ages, colors, creeds. We\'re all you know. You\'re beginning to believe the illusions we\'re spinning here. You\'re beginning to think that the tube is reality and that your own lives are unreal. You do whatever the tube tells you. You dress like the tube. You eat like the tube. You even think like the tube. In God\'s name, you people are the real thing, WE are the illusion." -Howard Beale',
        //                        link: 'https://digbysblog.blogspot.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/network-howard-beal.jpg',
        //                        items: null,
        //                        rss: 'http://digbysblog.blogspot.com/feeds/posts/default',
        //                        title: 'Hullabaloo',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '972a2dbc-9441-4c12-a262-e3119559d47d',
        //                        author: null,
        //                        description: 'Slate RSS',
        //                        link: 'https://slate.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/slate.png',
        //                        items: null,
        //                        rss: 'https://slate.com/feeds/all.rss',
        //                        title: 'Slate Magazine',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '67dce9dc-df80-4ce4-8516-cf79f3e2388e',
        //                        author: null,
        //                        description: 'Nate Silver’s FiveThirtyEight uses statistical analysis — hard numbers — to tell compelling stories about politics, sports, science, economics and culture.',
        //                        link: 'https://fivethirtyeight.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/0660d8ba58b80eabbfa60e410d32ed7f.jpg',
        //                        items: null,
        //                        rss: 'http://fivethirtyeight.com/politics/feed',
        //                        title: 'Politics – FiveThirtyEight',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '67063476-7716-49e8-8c10-122989636ccd',
        //                        author: null,
        //                        description: 'Smart, fearless journalism',
        //                        link: 'https://www.motherjones.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/MJ_cropped-favicon-512x512.png',
        //                        items: null,
        //                        rss: 'https://www.motherjones.com/politics/feed/',
        //                        title: 'Politics – Mother Jones',
        //                        userRead: false
        //            }
        //          ],
        //                tab: 'mondayTabInactive' + vm.mondayMonth,
        //                title: 'Politics'
        //        },
        //            {
        //                active: false,
        //                allRead: false,
        //                podcast: false,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: 'e8249664-185f-444e-acd0-20928581bfb8',
        //                        author: null,
        //                        description: 'The latest news and tips from the Angular team - Medium',
        //                        link: 'https://blog.angular.io/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/1_TGH72Nnw24QL3iV9IOm4VA.png',
        //                        items: null,
        //                        rss: 'https://blog.angular.io/rss',
        //                        title: 'Angular Blog - Medium',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: 'a4e7fedd-46fb-4d9f-9c17-e8593c0c949b',
        //                        author: null,
        //                        description: 'Curious Perversions in Information Technology',
        //                        link: 'http://thedailywtf.com,',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logoWTF.png',
        //                        items: null,
        //                        rss: 'http://syndication.thedailywtf.com/TheDailyWtf',
        //                        title: 'The Daily WTF',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: 'f9bc3d9c-5960-4fa6-aa28-1b43a01cc73f',
        //                        author: null,
        //                        description: 'A blog featuring tutorials about JavaScript, HTML5, AJAX, PHP, CSS, WordPress, and everything else development.',
        //                        link: 'https://davidwalsh.name/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/dwblogo.png',
        //                        items: null,
        //                        rss: 'https://davidwalsh.name/feed',
        //                        title: 'David Walsh Blog',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '25243f5e-e861-4252-abc5-ccf7aa5c8f8b',
        //                        author: null,
        //                        description: 'Helping you become a better engineer',
        //                        link: 'https://swizec.com/blog',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/swiz.png',
        //                        items: null,
        //                        rss: 'http://swizec.com/blog/feed',
        //                        title: 'A geek with a hat',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '99f6b8cc-dbde-4757-abb3-e46cf6a1ecb1',
        //                        author: null,
        //                        description: 'NodeJS Subreddit',
        //                        link: 'https://www.reddit.com/r/node/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/nodejssubreddit.png',
        //                        items: null,
        //                        rss: 'https://reddit.com/r/node/.rss',
        //                        title: 'node.js',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: 'a10dc8ef-98ec-4b9e-b5f3-3c4705cb13f2',
        //                        author: null,
        //                        description: 'Node.js Support, Training and Consulting for the Enterprise, Worldwide',
        //                        link: 'https://nodesource.com/blog',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/nodesource-512x512.png',
        //                        items: null,
        //                        rss: 'https://nodesource.com/blog/rss',
        //                        title: 'The NodeSource Blog',
        //                        userRead: false
        //            }
        //          ],
        //                tab: 'mondayTabInactive' + vm.mondayMonth,
        //                title: 'Tech'
        //        },
        //            {
        //                active: false,
        //                allRead: false,
        //                podcast: true,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: '7f5aca06-17bf-4c99-8c8f-af561999498c',
        //                        author: 'DevChat.tv',
        //                        description: 'Weekly podcast discussion about Javascript on the front and back ends. Also discuss programming practices, coding environments, and the communities related to the technology.',
        //                        link: 'http://javascriptjabber.com/',
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/javascript_jabber_thumb.jpg',
        //                        items: null,
        //                        rss: 'https://feeds.feedwrench.com/js-jabber.rss',
        //                        title: 'JavaScript Jabber',
        //                        userRead: false
        //            }
        //          ],
        //                tab: 'mondayTabInactive' + vm.mondayMonth,
        //                title: 'Tech Podcasts'
        //        },
        //            {
        //                active: false,
        //                allRead: false,
        //                podcast: false,
        //                sort: 'up',
        //                subscriptions: [
        //                    {
        //                        uuid: 'c2f53e34-5499-4015-80d5-b4fcea47c78b',
        //                        author: null,
        //                        description: 'War Is a Racket',
        //                        link: null,
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/EDD_xVYXsAEtYxP.jpg',
        //                        items: null,
        //                        rss: null,
        //                        title: 'Jacobin Magazine - Summer 2019',
        //                        userRead: false
        //            },
        //                    {
        //                        uuid: '2b7da266-f978-445f-8c5b-07da611f2464',
        //                        author: null,
        //                        description: 'Fair But Not Square',
        //                        link: null,
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/v28_i37_Fair_But_Not_Square.jpg',
        //                        items: null,
        //                        rss: null,
        //                        title: 'Albuquerque Alibi - Thursday, September 12, 2019',
        //                        userRead: true
        //            },
        //                    {
        //                        uuid: '174f6d0e-b7cd-4979-8177-61032be3fefe',
        //                        author: null,
        //                        description: 'All the News that\'s fit to print.',
        //                        link: null,
        //                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/scanNYT2019-09-15.jpg',
        //                        items: null,
        //                        rss: null,
        //                        title: 'New York Times - Sunday, September 15, 2019',
        //                        userRead: true
        //            }
        //          ],
        //                tab: 'mondayTabInactive' + vm.mondayMonth,
        //                title: 'Externals'
        //        }
        //      ];
        vm.toggleTabs = toggleTabs;
        vm.toggleReadStatus = toggleReadStatus;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.exitMondayManagerModal = exitMondayManagerModal;
        vm.managerModalState = 'mondayManageTabsSubsModalInactive' + vm.mondayMonth;
        vm.mondayManagerEngaged = mondayManagerEngaged;
        vm.mondayManageTabber = mondayManageTabber;
        vm.filterSearch = filterSearch;
        vm.mondayCreateEditTabText = 'Create a new tab:';
        vm.tabPodcast = false;
        vm.togglePodcastFeedStatus = togglePodcastFeedStatus;
        vm.uniqueTabNameError = false;
        vm.actionWillDeleteFeedsError = false;
        vm.emptyTabNameError = false;
        vm.tabCreateEditEngaged = false;
        vm.addTabLogic = addTabLogic;
        vm.cancelAddTabLogic = cancelAddTabLogic;
        vm.submitTabLogic = submitTabLogic;
        vm.editTablogic = editTablogic;
        vm.overwriteSubscriptionsInTab = overwriteSubscriptionsInTab;
        vm.mondayGuardRailEngaged = false;
        vm.guardRailText = 'Delete tab: ';
        vm.deleteTabLogic = deleteTabLogic;
        vm.guardrailDenied = guardrailDenied;
        vm.guardrailAccepted = guardrailAccepted;
        vm.removeSubscription = removeSubscription;
        vm.addSubscription = addSubscription;

        function addSubscription(feed) {
            let sorta, sortb;

            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === vm.mondayManageSelectedTab) {
                    feed.userRead = false;
                    vm.mondayTabs[i].subscriptions.push(feed);
                    if (vm.mondayTabs[i].sort === 'up') {
                        vm.mondayTabs[i].subscriptions = vm.mondayTabs[i].subscriptions.sort((a, b) => {
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
                    } else if (vm.mondayTabs[i].sort === 'down') {
                        vm.mondayTabs[i].subscriptions = vm.mondayTabs[i].subscriptions.sort((a, b) => {
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
                    vm.mondaySubs = vm.mondayTabs[i].subscriptions;

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
            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === vm.mondayManageSelectedTab) {
                    for (let j = 0; j < vm.mondayTabs[i].subscriptions.length; j++) {
                        if (vm.mondayTabs[i].subscriptions[j].uuid === sub.uuid) {
                            if (vm.mondayTabs[i].title === 'Externals') {
                                removeExternal(sub.uuid);
                            }
                            vm.mondayTabs[i].subscriptions.splice(j, 1);
                            vm.mondaySubs = vm.mondaySubs.filter(entry => {
                                return (entry.uuid !== sub.uuid);
                            });
                            if (vm.mondayTabs[i].title !== 'Externals') {
                                vm.availableFeeds.push(sub);
                            }
                            filterSearch();
                            return;
                        }
                    }
                }
            }
        }

        function guardrailAccepted() {
            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === vm.editingTab.title) {
                    vm.mondayTabs.splice(i, 1);
                    guardrailDenied();
                    return;
                }
            }
        }

        function guardrailDenied() {
            vm.mondayGuardRailEngaged = false;
            vm.managerModalState = 'mondayManageTabsSubsModal' + vm.mondayMonth;
        }

        function deleteTabLogic(tab) {
            vm.editingTab = tab;
            vm.mondayGuardRailEngaged = true;
            vm.guardRailText = 'Delete tab: ' + tab.title + '?';
            vm.managerModalState = 'mondayManageTabsSubsModalBlur' + vm.mondayMonth;
        }

        function overwriteSubscriptionsInTab() {
            let mondayTabNameInput = document.getElementById('mondayTabNameInput');
            console.log(vm.editingTab.title);

            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === vm.editingTab.title) {
                    vm.mondayTabs[i].active = vm.editingTab.active;
                    vm.mondayTabs[i].allRead = false;
                    vm.mondayTabs[i].podcast = vm.tabPodcast;
                    vm.mondayTabs[i].sort = vm.editingTab.sort;
                    vm.mondayTabs[i].subscriptions = [];
                    vm.mondayTabs[i].tab = vm.editingTab.tab;
                    vm.mondayTabs[i].title = mondayTabNameInput.value;
                    vm.mondaySubs = [];
                    cancelAddTabLogic();
                }
            }
            if (vm.tabPodcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.mondaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.mondaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            }
        }

        function editTablogic(tab) {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.tabPodcast = tab.podcast;
            vm.editingTab = tab;
            vm.managerModalState = 'mondayManageTabsSubsModalBlur' + vm.mondayMonth;
            vm.mondayCreateEditTabText = 'Edit tab:';
            setTimeout(() => {
                let mondayTabNameInput = document.getElementById('mondayTabNameInput');
                mondayTabNameInput.value = tab.title;
                mondayTabNameInput.focus();
            }, 100);
        }

        function submitTabLogic() {
            let mondayTabNameInput = document.getElementById('mondayTabNameInput');
            if (mondayTabNameInput.value === '') {
                vm.emptyTabNameError = true;
                vm.uniqueTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            let duplicate = vm.mondayTabs.filter(entry => {
                return (entry.title.toLowerCase() === mondayTabNameInput.value.toLowerCase().trim());
            });
            if ((duplicate.length !== 0) && vm.mondayCreateEditTabText === 'Create a new tab:') {
                vm.uniqueTabNameError = true;
                vm.emptyTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            if (vm.mondayCreateEditTabText === 'Create a new tab:') {
                let sorta, sortb;
                let daily = [];
                daily.push(vm.mondayTabs[0]);
                let external = [];
                external.push(vm.mondayTabs[vm.mondayTabs.length - 1]);
                let monSubs = vm.mondayTabs.slice(1, (vm.mondayTabs.length - 1));
                let subObj = {
                    active: false,
                    allRead: false,
                    podcast: vm.tabPodcast,
                    sort: 'up',
                    subscriptions: [],
                    tab: 'mondayTabInactive' + vm.mondayMonth,
                    title: mondayTabNameInput.value
                }
                monSubs.push(subObj);
                monSubs = monSubs.sort((a, b) => {
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
                let subs = daily.concat(monSubs);
                vm.mondayTabs = subs.concat(external);
                cancelAddTabLogic();
                return;
            } else {
                if (mondayTabNameInput.value === vm.editingTab.title) {
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
                            for (let i = 0; i < vm.mondayTabs.length; i++) {
                                if (vm.mondayTabs[i].title === vm.editingTab.title) {
                                    vm.mondayTabs[i].podcast = vm.tabPodcast;
                                    cancelAddTabLogic();
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    if (vm.tabPodcast === vm.editingTab.podcast) {
                        for (let i = 0; i < vm.mondayTabs.length; i++) {
                            if (vm.mondayTabs[i].title === vm.editingTab.title) {
                                vm.mondayTabs[i].title = mondayTabNameInput.value;
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
                            for (let i = 0; i < vm.mondayTabs.length; i++) {
                                if (vm.mondayTabs[i].title === vm.editingTab.title) {
                                    vm.mondayTabs[i].title = mondayTabNameInput.value;
                                    vm.mondayTabs[i].podcast = vm.tabPodcast;
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
            vm.managerModalState = 'mondayManageTabsSubsModal' + vm.mondayMonth;
        }

        function addTabLogic() {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.managerModalState = 'mondayManageTabsSubsModalBlur' + vm.mondayMonth;
            vm.mondayCreateEditTabText = 'Create a new tab:';
            setTimeout(() => {
                let mondayTabNameInput = document.getElementById('mondayTabNameInput');
                mondayTabNameInput.value = '';
                mondayTabNameInput.focus();
            }, 100);
        }

        function togglePodcastFeedStatus() {
            vm.tabPodcast = !vm.tabPodcast;
        }

        function filterSearch() {
            let query = document.getElementById('mondayManageSearch').value;
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

        function mondayManageTabber(tabTitle) {
            vm.mondayManageSelectedTab = tabTitle;
            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === tabTitle) {
                    vm.mondaySubs = vm.mondayTabs[i].subscriptions;
                    if (tabTitle !== 'Externals') {
                        if (vm.mondayTabs[i].podcast) {
                            $http.get('/podcast_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.mondaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        } else {
                            $http.get('/blog_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.mondaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        }
                    } else {
                        for (let i = 0; i < vm.mondaySubs.length; i++) {
                            vm.mondaySubs[i].title = 'Externals';
                        }
                        vm.allFeeds = [];
                        vm.availableFeeds = vm.allFeeds;
                    }
                }
            }
        }

        function mondayManagerEngaged() {
            document.getElementById('mondayManageSearch').value = '';
            vm.mondayManageSelectedTab = vm.mondayTabs[0].title;
            vm.mondaySubs = vm.mondayTabs[0].subscriptions;
            if (vm.mondayTabs[0].podcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.mondaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.mondaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            }
            vm.managerModalState = 'mondayManageTabsSubsModal' + vm.mondayMonth;
            vm.mondayContainerState = 'mondayContainerInactive' + vm.mondayMonth;
        }

        function exitMondayManagerModal() {
            vm.managerModalState = 'mondayManageTabsSubsModalInactive' + vm.mondayMonth;
            vm.mondayContainerState = 'mondayContainerActive' + vm.mondayMonth;
        }

        function sortSubscriptions(contentTitle, direction) {
            let sorta, sortb;
            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === contentTitle) {
                    vm.mondayTabs[i].sort = direction;
                    switch (direction) {
                        case ('up'):
                            vm.mondayTabs[i].subscriptions = vm.mondayTabs[i].subscriptions.sort((a, b) => {
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
                            vm.mondayTabs[i].subscriptions = vm.mondayTabs[i].subscriptions.sort((a, b) => {
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
                            for (let k = 0; k < (vm.mondayTabs[i].subscriptions.length * 10); k++) {
                                for (let j = 0; j < vm.mondayTabs[i].subscriptions.length; j++) {
                                    index = Math.floor(Math.random() * vm.mondayTabs[i].subscriptions.length);
                    [vm.mondayTabs[i].subscriptions[j], vm.mondayTabs[i].subscriptions[index]] = [vm.mondayTabs[i].subscriptions[index], vm.mondayTabs[i].subscriptions[j]];
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
            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === contentTitle) {
                    vm.mondayTabs[i].allRead = !vm.mondayTabs[i].allRead;
                    for (let j = 0; j < vm.mondayTabs[i].subscriptions.length; j++) {
                        vm.mondayTabs[i].subscriptions[j].userRead = vm.mondayTabs[i].allRead;
                    }
                }
            }
        }

        function toggleReadStatus(contentTitle, subUuid) {
            for (let i = 0; i < vm.mondayTabs.length; i++) {
                if (vm.mondayTabs[i].title === contentTitle) {
                    for (let j = 0; j < vm.mondayTabs[i].subscriptions.length; j++) {
                        if (vm.mondayTabs[i].subscriptions[j].uuid === subUuid) {
                            vm.mondayTabs[i].subscriptions[j].userRead = !vm.mondayTabs[i].subscriptions[j].userRead;
                        }
                    }
                }
            }
        }

        function toggleTabs(tabTitle) {
            let activeTab = vm.mondayTabs.filter(tab => {
                return (tab.active);
            });
            if (tabTitle !== activeTab[0].title) {
                for (let i = 0; i < vm.mondayTabs.length; i++) {
                    if (vm.mondayTabs[i].title === tabTitle) {
                        vm.mondayTabs[i].active = true;
                        vm.mondayTabs[i].tab = 'mondayTabActive' + vm.mondayMonth;
                    } else {
                        vm.mondayTabs[i].active = false;
                        vm.mondayTabs[i].tab = 'mondayTabInactive' + vm.mondayMonth;
                    }
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
            let tabs = vm.mondayTabs.filter(entry => {
                return ((entry.title !== 'Dailies') && (entry.title !== 'Externals'));
            });
            let dailyTab = vm.mondayTabs.filter(entry => {
                return (entry.title === 'Dailies');
            });
            let externalTab = vm.mondayTabs.filter(entry => {
                return(entry.title === 'Externals');
            });
            for (let i = 0; i < externalTab[0].subscriptions.length; i++) {
                updateExternalsReadStatus(externalTab[0].subscriptions[i]);
            }
            $http.patch(`/monday_subscriptions/${vm.user.uuid}`, {
                    tabs: {
                        tabs: tabs
                    },
                    updated_at: new Date()
                })
                .then(() => {
                    $http.get(`/dailies/byuser/${vm.user.uuid}`)
                        .then(userDailyData => {
                            let userDaily = userDailyData.data;
                            userDaily.dailies.dailies = dailyTab[0];
                            userDaily.updated_at = now;
                            $http.patch(`/dailies/${userDaily.uuid}`, userDaily)
                                .then(() => {
                                    $state.go('userhub', {
                                        id: vm.user.uuid
                                    });
                                });
                        });
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

        function populateMondayTabs(userUuid) {
            $http.get(`/monday_subscriptions/assembled/${userUuid}`)
                .then(assembledSubsData => {
                    let assembledSubs = assembledSubsData.data;
                    for (let i = 0; i < assembledSubs.length; i++) {
                        if (assembledSubs[i].active) {
                            assembledSubs[i].tab = 'mondayTabActive' + vm.mondayMonth;
                            if (i > 0) {
                                assembledSubs[0].active = false;
                                assembledSubs[0].tab = 'mondayTabInactive' + vm.mondayMonth;
                            }
                        } else {
                            assembledSubs[i].tab = 'mondayTabInactive' + vm.mondayMonth;
                        }
                    }
                    vm.mondayTabs = assembledSubs;
                });
        }

        function onInit() {
            console.log("Monday is lit");

            switch (vm.mondayMonth) {
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
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }

            setUserIPAddress();
            setFooterMessage();
            populateMondayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
