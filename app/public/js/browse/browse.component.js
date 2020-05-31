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
        vm.browseMonth = '_FebruaryA';
        vm.navigateToHub = navigateToHub;
        vm.browseContainer = 'browseActive' + vm.browseMonth;
        vm.blogFeedTabState = 'browseTabActive' + vm.browseMonth;
        vm.podcastFeedTabState = 'browseTabInactive' + vm.browseMonth;
        vm.toggleTabs = toggleTabs;
        vm.browseBlogsContainerState = 'browseContainerActive' + vm.browseMonth;
        vm.browsePodcastContainerState = 'browseContainerInactive' + vm.browseMonth;
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
        vm.browseSubscriptionModalState = 'browseSubscriptionModalInactive' + vm.browseMonth;
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
        vm.techBlogs = [
            {
                uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
                author: null,
                description: 'Links for the intellectually curious, ranked by readers.',
                link: 'https://news.ycombinator.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
                items: null,
                rss: 'https://news.ycombinator.com/rss',
                title: 'Hacker News'
            },
            {
                uuid: '3b7cdbfa-751e-4622-85e2-31c17abd351f',
                author: null,
                description: 'A community for the awesome MVC JS framework.',
                link: 'https://www.reddit.com/r/angularjs/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/Z4ki_RNzhlka_Gnb.png',
                items: null,
                rss: 'https://reddit.com/r/angularjs/.rss',
                title: 'angular.js'
            },
            {
                uuid: 'a10dc8ef-98ec-4b9e-b5f3-3c4705cb13f2',
                author: null,
                description: 'Node.js Support, Training and Consulting for the Enterprise, Worldwide',
                link: 'https://nodesource.com/blog',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/nodesource-512x512.png',
                items: null,
                rss: 'https://nodesource.com/blog/rss',
                title: 'The NodeSource Blog'
            },
            {
                uuid: 'a4e7fedd-46fb-4d9f-9c17-e8593c0c949b',
                author: null,
                description: 'Curious Perversions in Information Technology',
                link: 'http://thedailywtf.com',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/logoWTF.png',
                items: null,
                rss: 'http://syndication.thedailywtf.com/TheDailyWtf',
                title: 'The Daily WTF'
            },
            {
                uuid: '25243f5e-e861-4252-abc5-ccf7aa5c8f8b',
                author: null,
                description: 'Helping you become a better engineer',
                link: 'https://swizec.com/blog',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/swiz.png',
                items: null,
                rss: 'http://swizec.com/blog/feed',
                title: 'A geek with a hat'
            },
            {
                uuid: 'f9bc3d9c-5960-4fa6-aa28-1b43a01cc73f',
                author: null,
                description: 'A blog featuring tutorials about JavaScript, HTML5, AJAX, PHP, CSS, WordPress, and everything else development.',
                link: 'https://davidwalsh.name/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/dwblogo.png',
                items: null,
                rss: 'https://davidwalsh.name/feed',
                title: 'David Walsh Blog'
            },
            {
                uuid: '99f6b8cc-dbde-4757-abb3-e46cf6a1ecb1',
                author: null,
                description: 'NodeJS Subreddit',
                link: 'https://www.reddit.com/r/node/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/nodejssubreddit.png',
                items: null,
                rss: 'https://reddit.com/r/node/.rss',
                title: 'node.js'
            },
            {
                uuid: 'e8249664-185f-444e-acd0-20928581bfb8',
                author: null,
                description: 'The latest news and tips from the Angular team - Medium',
                link: 'https://blog.angular.io/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/1_TGH72Nnw24QL3iV9IOm4VA.png',
                items: null,
                rss: 'https://blog.angular.io/rss',
                title: 'Angular Blog - Medium'
            },
            {
                uuid: '83cfdddd-a5f7-4f46-b4db-c698f082def7',
                author: null,
                description: 'A website powered by alien technology from the future.',
                link: 'https://catonmat.net/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/catonmat-logo-powered-by-alien-technology.png',
                items: null,
                rss: 'https://catonmat.net/feed',
                title: 'catonmat.net – less is more'
            },
            {
                uuid: '33ce0ce6-7f8e-4e1a-919e-035719852076',
                author: null,
                description: 'Essays, opinions, and advice on the act of computer programming from Stack Overflow.',
                link: 'https://stackoverflow.blog/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/cropped-SO_Logo_glyph-use-this-one-smaller-32x32.jpg',
                items: null,
                rss: 'https://stackoverflow.blog/rss',
                title: 'Stack Overflow Blog'
            },
            {
                uuid: 'c2f08cfd-3860-490b-b1ed-c3810c800289',
                author: null,
                description: 'Online reference, blog and news source for the Web as Platform. Because the world\'s your programmable oyster.',
                link: 'https://www.programmableweb.com/rss_blog',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/programmableWebPiece.jpeg',
                items: null,
                rss: 'https://feeds.feedburner.com/ProgrammableWeb',
                title: 'ProgrammableWeb'
            },
            {
                uuid: '017317fd-72bf-411f-a41a-401b4fff5043',
                author: null,
                description: 'Scott Hanselman on Programming, User Experience, The Zen of Computers and Life in General',
                link: 'https://www.hanselman.com/blog/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/tinyheadshot2.jpg',
                items: null,
                rss: 'https://hanselman.com/blog/feed',
                title: 'Scott Hanselman\'s Blog'
            },
            {
                uuid: 'b1ea9fb5-378a-4616-8142-f5db5a953adf',
                author: null,
                description: 'Recent content in Articles on Smashing Magazine — For Web Designers And Developers',
                link: 'https://www.smashingmagazine.com/articles/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/smashing-logo-avatar-opt.png',
                items: null,
                rss: 'https://smashingmagazine.com/feed',
                title: 'Articles on Smashing Magazine — For Web Designers And Developers'
            },
            {
                uuid: '460065c7-f949-4bbb-9397-8a0b2193baf4',
                author: null,
                description: 'CSS Architecture, Web Performance Optimisation, and more, by Harry Roberts',
                link: 'https://csswizardry.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/cssWizardryLogo.png',
                items: null,
                rss: 'https://csswizardry.com/feed',
                title: 'CSS Wizardry'
            },
            {
                uuid: '5efd84d8-4155-421e-8f00-eaad72d4ea9d',
                author: null,
                description: 'Weekly e-mail roundup of latest CSS articles, tutorials, tools and experiments',
                link: 'https://css-weekly.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/css_weekly_shirt.png',
                items: null,
                rss: 'https://css-weekly.com/feed',
                title: 'CSS WeeklyCSS Weekly'
            },
            {
                uuid: 'af66bdc7-e46c-43b8-a39c-878d80f01b6b',
                author: null,
                description: 'All about the JavaScript programming language!',
                link: 'https://www.reddit.com/r/javascript/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/5589238-reddit-icon-vector-images-icon-sign-and-symbols-reddit-logo-png-300_300_preview.png',
                items: null,
                rss: 'https://reddit.com/r/javascript/.rss',
                title: '𝚓𝚊𝚟𝚊𝚜𝚌𝚛𝚒𝚙𝚝'
            },
            {
                uuid: 'f99c2c48-c52c-4d9d-8d60-8756a61620a6',
                author: null,
                description: 'Learn CSS | HTML5 | JavaScript | Wordpress | Tutorials-Web Development | Reference | Books and More',
                link: 'https://www.sitepoint.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/58482e76cef1014c0b5e4a6c.png',
                items: null,
                rss: 'https://sitepoint.com/feed',
                title: 'SitePoint'
            },
            {
                uuid: 'fceb9120-e6a1-4be1-bbe5-aef9db874440',
                author: null,
                description: 'Where programmers share ideas and help each other grow—A constructive and inclusive social network.',
                link: 'https://dev.to/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/devtorainbow.png',
                items: null,
                rss: 'https://dev.to/feed',
                title: 'DEV Community'
            },
            {
                uuid: 'cce488c6-e563-4de3-b6bc-266ba896ce61',
                author: null,
                description: 'Description pending',
                link: 'http://www.echojs.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/acdaff17c49fc10cfb43a2e557804099_400x400.png',
                items: null,
                rss: 'https://www.echojs.com/rss',
                title: 'Echo JS'
            },
            {
                uuid: '03520f1f-b069-4a3d-9329-69451cf9c9e6',
                author: null,
                description: 'A free, once–weekly e-mail round-up of Node.js news and articles.',
                link: 'https://nodeweekly.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/qzlqdaj4qzm2bzcdliyp.png',
                items: null,
                rss: 'https://nodeweekly.com/rss/12acdl5j',
                title: 'Node Weekly'
            },
            {
                uuid: '6ba1eb91-375b-4d49-b47a-f9661682f9ba',
                author: null,
                description: 'Google News',
                link: 'https://news.google.com/search?q=javascript&hl=en-US&gl=US&ceid=US%3Aen',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/1200px-Google_News_icon.svg.png',
                items: null,
                rss: 'https://news.google.com/rss/search?pz=1&cf=all&topic=topics&q=javascript&hl=en-US&num=10&gl=US&ceid=US:en',
                title: 'Google News - Javascript'
            },
            {
                uuid: '66a55437-b871-43c3-b420-fb4fd4b3105f',
                author: 'JSConf',
                description: '',
                link: 'https://www.youtube.com/channel/UCzoVCacndDCfGDf41P-z0iA',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/jsconf_eu.png',
                items: null,
                rss: 'https://www.youtube.com/channel/UCzoVCacndDCfGDf41P-z0iA',
                title: 'JSConf'
            }
        ];

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
                    tableName = 'tech_feeds';
                    break;
                default:
                    alert('non-supported blog category');
            }
            if (tableName !== '') {
                if (tableName === 'tech_feeds') {
                    vm.viewBlogFeeds = vm.techBlogs.sort((a, b) => {
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
                } else {
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

        function onInit() {
            console.log("Browse Feeds is lit");

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
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }

            setUserIPAddress();
            setFooterMessage();
            // populateTuesdayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
