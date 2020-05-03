(function () {
    'use strict';

    angular.module('app')
        .component('tuesday', {
            controller: TuesdayController,
            templateUrl: '/js/tuesday/tuesday.template.html'
        });

    TuesdayController.$inject = ['$http', '$state', '$stateParams'];

    function TuesdayController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.tuesdayMonth = '_JanuaryC';
        vm.tuesdayContainerState = 'tuesdayContainerActive' + vm.tuesdayMonth;
        vm.navigateToHub = navigateToHub;
//        vm.tuesdayTabs = [
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
//                    },
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
//                    },
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
//                    },
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
//                    },
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
//                    },
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
//                    },
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
//                    }
//                  ],
//                tab: 'tuesdayTabActive' + vm.tuesdayMonth,
//                title: 'Dailies'
//                },
//            {
//                active: false,
//                allRead: false,
//                podcast: false,
//                sort: 'up',
//                subscriptions: [
//                    {
//                        uuid: 'f7fb07b5-11a7-4304-8fd7-9447219717f1',
//                        author: null,
//                        description: 'An Astutely Savvy Blend of Talent &amp; Opportunity',
//                        link: 'http://authenticjobs.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/authenticjobs2-150x150.png',
//                        items: null,
//                        rss: 'https://authenticjobs.com/rss/fulltime.xml',
//                        title: 'AuthenticJobs.com Job Listings - Full-time',
//                        userRead: false
//                    }
//                  ],
//                tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
//                title: 'Job Boards'
//                },
//            {
//                active: false,
//                allRead: false,
//                podcast: false,
//                sort: 'up',
//                subscriptions: [
//                    {
//                        uuid: '83cfdddd-a5f7-4f46-b4db-c698f082def7',
//                        author: null,
//                        description: 'A website powered by alien technology from the future.',
//                        link: 'https://catonmat.net/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/catonmat-logo-powered-by-alien-technology.png',
//                        items: null,
//                        rss: 'https://catonmat.net/feed',
//                        title: 'catonmat.net – less is more',
//                        userRead: false
//                    },
//                    {
//                        uuid: '33ce0ce6-7f8e-4e1a-919e-035719852076',
//                        author: null,
//                        description: 'Essays, opinions, and advice on the act of computer programming from Stack Overflow.',
//                        link: 'https://stackoverflow.blog/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/cropped-SO_Logo_glyph-use-this-one-smaller-32x32.jpg',
//                        items: null,
//                        rss: 'https://stackoverflow.blog/rss',
//                        title: 'Stack Overflow Blog',
//                        userRead: false
//                    },
//                    {
//                        uuid: 'c2f08cfd-3860-490b-b1ed-c3810c800289',
//                        author: null,
//                        description: 'Online reference, blog and news source for the Web as Platform. Because the world\'s your programmable oyster.',
//                        link: 'https://www.programmableweb.com/rss_blog',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/programmableWebPiece.jpeg',
//                        items: null,
//                        rss: 'https://feeds.feedburner.com/ProgrammableWeb',
//                        title: 'ProgrammableWeb',
//                        userRead: false
//                    },
//                    {
//                        uuid: '017317fd-72bf-411f-a41a-401b4fff5043',
//                        author: null,
//                        description: 'Scott Hanselman on Programming, User Experience, The Zen of Computers and Life in General',
//                        link: 'https://www.hanselman.com/blog/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/tinyheadshot2.jpg',
//                        items: null,
//                        rss: 'https://hanselman.com/blog/feed',
//                        title: 'Scott Hanselman\'s Blog',
//                        userRead: false
//                    },
//                    {
//                        uuid: 'b1ea9fb5-378a-4616-8142-f5db5a953adf',
//                        author: null,
//                        description: 'Recent content in Articles on Smashing Magazine — For Web Designers And Developers',
//                        link: 'https://www.smashingmagazine.com/articles/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/smashing-logo-avatar-opt.png',
//                        items: null,
//                        rss: 'https://smashingmagazine.com/feed',
//                        title: 'Articles on Smashing Magazine — For Web Designers And Developers',
//                        userRead: false
//                    },
//                    {
//                        uuid: '460065c7-f949-4bbb-9397-8a0b2193baf4',
//                        author: null,
//                        description: 'CSS Architecture, Web Performance Optimisation, and more, by Harry Roberts',
//                        link: 'https://csswizardry.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/cssWizardryLogo.png',
//                        items: null,
//                        rss: 'https://csswizardry.com/feed',
//                        title: 'CSS Wizardry',
//                        userRead: false
//                    },
//                    {
//                        uuid: '5efd84d8-4155-421e-8f00-eaad72d4ea9d',
//                        author: null,
//                        description: 'Weekly e-mail roundup of latest CSS articles, tutorials, tools and experiments',
//                        link: 'https://css-weekly.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/css_weekly_shirt.png',
//                        items: null,
//                        rss: 'https://css-weekly.com/feed',
//                        title: 'CSS WeeklyCSS Weekly',
//                        userRead: false
//                    }
//                  ],
//                tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
//                title: 'Coding'
//                },
//            {
//                active: false,
//                allRead: false,
//                podcast: false,
//                sort: 'up',
//                subscriptions: [
//                    {
//                        uuid: '7ff858d2-670f-453b-92fd-51398dd05820',
//                        author: null,
//                        description: 'Book Recommendations and Reviews',
//                        link: 'https://bookriot.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/bookriot.png',
//                        items: null,
//                        rss: 'https://feeds.feedburner.com/bookriot',
//                        title: 'BOOK RIOT',
//                        userRead: false
//                    },
//                    {
//                        uuid: '88b924d8-f158-4cf6-b3d0-11b0588d35ca',
//                        author: null,
//                        description: 'Arts and Culture News',
//                        link: 'https://www.theparisreview.org/blog',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/theParisReview.png',
//                        items: null,
//                        rss: 'https://feeds.feedburner.com/TheParisReviewBlog',
//                        title: 'The Paris Review',
//                        userRead: false
//                    },
//                    {
//                        uuid: '0100e49e-c3c5-4420-8fb7-d4b223b6b0a2',
//                        author: null,
//                        description: 'Timothy McSweeney’s Internet Tendency',
//                        link: 'https://www.mcsweeneys.net/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/McS_Logo_stacked_hires-02.jpg',
//                        items: null,
//                        rss: 'https://feeds.feedburner.com/mcsweeneys',
//                        title: 'McSweeney’s',
//                        userRead: false
//                    },
//                    {
//                        uuid: 'f76faa65-0f19-4d6e-bebc-de39568f4745',
//                        author: null,
//                        description: '',
//                        link: 'https://www.nytimes.com/section/books?emc=rss&amp;partner=rss',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/NYTimes-book-review.png',
//                        items: null,
//                        rss: 'http://www.nytimes.com/services/xml/rss/nyt/Books.xml',
//                        title: 'NYT &gt; Books',
//                        userRead: false
//                    },
//                    {
//                        uuid: '25be2cba-57fe-4371-bc06-ccf8ce1afd49',
//                        author: null,
//                        description: 'Book World',
//                        link: 'http://www.washingtonpost.com/wp-dyn/print/sunday/bookworld?nav=rss_print/sunday/bookworld',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/p412741g.png',
//                        items: null,
//                        rss: 'http://www.washingtonpost.com/wp-srv/print/sunday/bookworld/rssheadlines.xml',
//                        title: 'washingtonpost.com - Book World',
//                        userRead: false
//                    }
//                  ],
//                tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
//                title: 'Books'
//                },
//            {
//                active: false,
//                allRead: false,
//                podcast: false,
//                sort: 'up',
//                subscriptions: [
//                    {
//                        uuid: '046a8434-14de-443e-b24c-f4998cf2de80',
//                        author: null,
//                        description: 'Proudly lowering the level of political discourse',
//                        link: 'http://rudepundit.blogspot.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/-uUknLBF_400x400.jpg',
//                        items: null,
//                        rss: 'http://rudepundit.blogspot.com/feeds/posts/default',
//                        title: 'The Rude Pundit',
//                        userRead: false
//                    },
//                    {
//                        uuid: '8bd35411-98ed-4cf5-8fa5-b416f6ffcfb2',
//                        author: null,
//                        description: 'Smart, fearless journalism',
//                        link: 'https://www.motherjones.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/mother-jones.jpg',
//                        items: null,
//                        rss: 'http://feeds.feedburner.com/motherjones/feed',
//                        title: 'Mother Jones',
//                        userRead: false
//                    },
//                    {
//                        uuid: '32b76269-7bf8-404f-a857-7afdcb6970d7',
//                        author: null,
//                        description: 'The Nation Magazine',
//                        link: 'https://www.thenation.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/the-nation-logo.png',
//                        items: null,
//                        rss: 'http://www.thenation.com/feed/?post_type=article',
//                        title: 'Article – The Nation',
//                        userRead: false
//                    },
//                    {
//                        uuid: '22c40084-bac5-4ff5-9f24-fefaabb78e37',
//                        author: null,
//                        description: 'The New Republic',
//                        link: 'https://newrepublic.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/theNewRepublic.png',
//                        items: null,
//                        rss: 'https://newrepublic.com/pages/rss',
//                        title: 'The New Republic',
//                        userRead: false
//                    },
//                    {
//                        uuid: '3eebc536-dc48-4711-9901-e546f0d73650',
//                        author: null,
//                        description: '',
//                        link: 'https://www.theatlantic.com/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/the_atlantic_2019_logo.png',
//                        items: null,
//                        rss: 'https://www.theatlantic.com/feed/all/',
//                        title: 'The Atlantic',
//                        userRead: false
//                    }
//                  ],
//                tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
//                title: 'Politics'
//                },
//            {
//                active: false,
//                allRead: false,
//                podcast: true,
//                sort: 'up',
//                subscriptions: [
//                    {
//                        uuid: '4a275da9-36f2-4356-b546-b5052b72bee5',
//                        author: 'Taran',
//                        description: 'The Baddest Show on Free Jazz &amp; Creative Improvised Music!',
//                        link: 'http://taransfreejazzhour.com/podcast/',
//                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/taranfreejazzhour.gif',
//                        items: null,
//                        rss: 'http://taransfreejazzhour.com/podcast/rss.xml',
//                        title: 'Taran\'s Free Jazz Hour',
//                        userRead: false
//                    }
//                  ],
//                tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
//                title: 'Music Podcasts'
//                },
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
//                    },
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
//                    },
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
//                    }
//                  ],
//                tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
//                title: 'Externals'
//                }
//              ];
        vm.toggleTabs = toggleTabs;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.toggleReadStatus = toggleReadStatus;
        vm.tuesdayManagerEngaged = tuesdayManagerEngaged;
        vm.managerModalState = 'tuesdayManageTabsSubsModalInactive' + vm.tuesdayMonth;
        vm.exitTuesdayManagerModal = exitTuesdayManagerModal;
        vm.tuesdayManageTabber = tuesdayManageTabber;
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
        vm.tuesdayGuardRailEngaged = false;
        vm.deleteTabLogic = deleteTabLogic;
        vm.guardrailDenied = guardrailDenied;
        vm.guardrailAccepted = guardrailAccepted;
        
        function guardrailAccepted() {
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === vm.editingTab.title) {
                    vm.tuesdayTabs.splice(i, 1);
                    guardrailDenied();
                    return;
                }
            }
        }
        
        function guardrailDenied() {
            vm.tuesdayGuardRailEngaged = false;
            vm.managerModalState = 'tuesdayManageTabsSubsModal' + vm.tuesdayMonth;
        }
        
        function deleteTabLogic(tab) {
            vm.editingTab = tab;
            vm.tuesdayGuardRailEngaged = true;
            vm.guardRailText = 'Delete tab: ' + tab.title + '?';
            vm.managerModalState = 'tuesdayManageTabsSubsModalBlur' + vm.tuesdayMonth;
        }
        
        function addTabLogic() {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.managerModalState = 'tuesdayManageTabsSubsModalBlur' + vm.tuesdayMonth;
            vm.tuesdayCreateEditTabText = 'Create a new tab:';
            setTimeout(() => {
                let tuesdayTabNameInput = document.getElementById('tuesdayTabNameInput');
                tuesdayTabNameInput.value = '';
                tuesdayTabNameInput.focus();
            }, 100);
        }
        
        function overwriteSubscriptionsInTab() {
            let tuesdayTabNameInput = document.getElementById('tuesdayTabNameInput');

            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === vm.editingTab.title) {
                    vm.tuesdayTabs[i].active = vm.editingTab.active;
                    vm.tuesdayTabs[i].allRead = false;
                    vm.tuesdayTabs[i].podcast = vm.tabPodcast;
                    vm.tuesdayTabs[i].sort = vm.editingTab.sort;
                    vm.tuesdayTabs[i].subscriptions = [];
                    vm.tuesdayTabs[i].tab = vm.editingTab.tab;
                    vm.tuesdayTabs[i].title = tuesdayTabNameInput.value;
                    vm.tuesdaySubs = [];
                    cancelAddTabLogic();
                }
            }
            if (vm.tabPodcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.tuesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.tuesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            }
        }

        function submitTabLogic() {
            let tuesdayTabNameInput = document.getElementById('tuesdayTabNameInput');
            if (tuesdayTabNameInput.value === '') {
                vm.emptyTabNameError = true;
                vm.uniqueTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            let duplicate = vm.tuesdayTabs.filter(entry => {
                return (entry.title.toLowerCase() === tuesdayTabNameInput.value.toLowerCase().trim());
            });
            if ((duplicate.length !== 0) && (vm.tuesdayCreateEditTabText === 'Create a new tab:')) {
                vm.uniqueTabNameError = true;
                vm.emptyTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            if (vm.tuesdayCreateEditTabText === 'Create a new tab:') {
                let sorta, sortb;
                let daily = [];
                daily.push(vm.tuesdayTabs[0]);
                let external = [];
                external.push(vm.tuesdayTabs[vm.tuesdayTabs.length - 1]);
                let tueSubs = vm.tuesdayTabs.slice(1, (vm.tuesdayTabs.length - 1));
                let subObj = {
                    active: false,
                    allRead: false,
                    podcast: vm.tabPodcast,
                    sort: 'up',
                    subscriptions: [],
                    tab: 'tuesdayTabInactive' + vm.mondayMonth,
                    title: tuesdayTabNameInput.value
                }
                tueSubs.push(subObj);
                tueSubs = tueSubs.sort((a, b) => {
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
                let subs = daily.concat(tueSubs);
                vm.tuesdayTabs = subs.concat(external);
                cancelAddTabLogic();
                return;
            } else {
                if (tuesdayTabNameInput.value === vm.editingTab.title) {
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
                            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                                if (vm.tuesdayTabs[i].title === vm.editingTab.title) {
                                    vm.tuesdayTabs[i].podcast = vm.tabPodcast;
                                    cancelAddTabLogic();
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    if (vm.tabPodcast === vm.editingTab.podcast) {
                        for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                            if (vm.tuesdayTabs[i].title === vm.editingTab.title) {
                                vm.tuesdayTabs[i].title = tuesdayTabNameInput.value;
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
                            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                                if (vm.tuesdayTabs[i].title === vm.editingTab.title) {
                                    vm.tuesdayTabs[i].title = tuesdayTabNameInput.value;
                                    vm.tuesdayTabs[i].podcast = vm.tabPodcast;
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
            vm.managerModalState = 'tuesdayManageTabsSubsModal' + vm.tuesdayMonth;
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
            vm.managerModalState = 'mondayManageTabsSubsModalBlur' + vm.tuesdayMonth;
            vm.tuesdayCreateEditTabText = 'Edit tab:';
            setTimeout(() => {
                let tuesdayTabNameInput = document.getElementById('tuesdayTabNameInput');
                tuesdayTabNameInput.value = tab.title;
                tuesdayTabNameInput.focus();
            }, 100);
        }

        function addSubscription(feed) {
            let sorta, sortb;

            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === vm.tuesdayManageSelectedTab) {
                    feed.userRead = false;
                    vm.tuesdayTabs[i].subscriptions.push(feed);
                    if (vm.tuesdayTabs[i].sort === 'up') {
                        vm.tuesdayTabs[i].subscriptions = vm.tuesdayTabs[i].subscriptions.sort((a, b) => {
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
                    } else if (vm.tuesdayTabs[i].sort === 'down') {
                        vm.tuesdayTabs[i].subscriptions = vm.tuesdayTabs[i].subscriptions.sort((a, b) => {
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
                    vm.tuesdaySubs = vm.tuesdayTabs[i].subscriptions;
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
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === vm.tuesdayManageSelectedTab) {
                    for (let j = 0; j < vm.tuesdayTabs[i].subscriptions.length; j++) {
                        if (vm.tuesdayTabs[i].subscriptions[j].uuid === sub.uuid) {
                            if (vm.tuesdayTabs[i].title === 'Externals') {
                                removeExternal(sub.uuid);
                            }
                            vm.tuesdayTabs[i].subscriptions.splice(j, 1);
                            vm.tuesdaySubs = vm.tuesdaySubs.filter(entry => {
                                return (entry.uuid !== sub.uuid);
                            });
                            if (vm.tuesdayTabs[i].title !== 'Externals') {
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
            let query = document.getElementById('tuesdayManageSearch').value;
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

        function tuesdayManageTabber(tabTitle) {
            vm.tuesdayManageSelectedTab = tabTitle;
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === tabTitle) {
                    vm.tuesdaySubs = vm.tuesdayTabs[i].subscriptions;
                    if (tabTitle !== 'Externals') {
                        if (vm.tuesdayTabs[i].podcast) {
                            $http.get('/podcast_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.tuesdaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        } else {
                            $http.get('/blog_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.tuesdaySubs, blogFeedsData.data);
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

        function exitTuesdayManagerModal() {
            vm.managerModalState = 'tuesdayManageTabsSubsModalInactive' + vm.tuesdayMonth;
            vm.tuesdayContainerState = 'tuesdayContainerActive' + vm.tuesdayMonth;
        }

        function tuesdayManagerEngaged() {
            //            document.getElementById('tuesdayManageSearch').value = '';
            vm.tuesdayManageSelectedTab = vm.tuesdayTabs[0].title;
            vm.tuesdaySubs = vm.tuesdayTabs[0].subscriptions;
            if (vm.tuesdayTabs[0].podcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.tuesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.tuesdaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            }
            vm.managerModalState = 'tuesdayManageTabsSubsModal' + vm.tuesdayMonth;
            vm.tuesdayContainerState = 'tuesdayContainerInactive' + vm.tuesdayMonth;
        }

        function toggleReadStatus(contentTitle, subUuid) {
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === contentTitle) {
                    for (let j = 0; j < vm.tuesdayTabs[i].subscriptions.length; j++) {
                        if (vm.tuesdayTabs[i].subscriptions[j].uuid === subUuid) {
                            vm.tuesdayTabs[i].subscriptions[j].userRead = !vm.tuesdayTabs[i].subscriptions[j].userRead;
                        }
                    }
                }
            }
        }

        function sortSubscriptions(contentTitle, direction) {
            let sorta, sortb;
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === contentTitle) {
                    vm.tuesdayTabs[i].sort = direction;
                    switch (direction) {
                        case ('up'):
                            vm.tuesdayTabs[i].subscriptions = vm.tuesdayTabs[i].subscriptions.sort((a, b) => {
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
                            vm.tuesdayTabs[i].subscriptions = vm.tuesdayTabs[i].subscriptions.sort((a, b) => {
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
                            for (let k = 0; k < (vm.tuesdayTabs[i].subscriptions.length * 10); k++) {
                                for (let j = 0; j < vm.tuesdayTabs[i].subscriptions.length; j++) {
                                    index = Math.floor(Math.random() * vm.tuesdayTabs[i].subscriptions.length);
                    [vm.tuesdayTabs[i].subscriptions[j], vm.tuesdayTabs[i].subscriptions[index]] = [vm.tuesdayTabs[i].subscriptions[index], vm.tuesdayTabs[i].subscriptions[j]];
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
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === contentTitle) {
                    vm.tuesdayTabs[i].allRead = !vm.tuesdayTabs[i].allRead;
                    for (let j = 0; j < vm.tuesdayTabs[i].subscriptions.length; j++) {
                        vm.tuesdayTabs[i].subscriptions[j].userRead = vm.tuesdayTabs[i].allRead;
                    }
                }
            }
        }

        function toggleTabs(tabTitle) {
            for (let i = 0; i < vm.tuesdayTabs.length; i++) {
                if (vm.tuesdayTabs[i].title === tabTitle) {
                    vm.tuesdayTabs[i].active = true;
                    vm.tuesdayTabs[i].tab = 'tuesdayTabActive' + vm.tuesdayMonth;
                } else {
                    vm.tuesdayTabs[i].active = false;
                    vm.tuesdayTabs[i].tab = 'tuesdayTabInactive' + vm.tuesdayMonth;
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
            let tabs = vm.tuesdayTabs.filter(entry => {
                return ((entry.title !== 'Dailies') && (entry.title !== 'Externals'));
            });
            let dailyTab = vm.tuesdayTabs.filter(entry => {
                return (entry.title === 'Dailies');
            });
            let externalTab = vm.tuesdayTabs.filter(entry => {
                return(entry.title === 'Externals');
            });
            for (let i = 0; i < externalTab[0].subscriptions.length; i++) {
                updateExternalsReadStatus(externalTab[0].subscriptions[i]);
            }
            $http.patch(`/tuesday_subscriptions/${vm.user.uuid}`, {
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
        
        function populateTuesdayTabs(userUuid) {
            $http.get(`/tuesday_subscriptions/assembled/${userUuid}`)
                .then(assembledSubsData => {
                    let assembledSubs = assembledSubsData.data;
                    for (let i = 0; i < assembledSubs.length; i++) {
                        if (assembledSubs[i].active) {
                            assembledSubs[i].tab = 'tuesdayTabActive' + vm.tuesdayMonth;
                            if (i > 0) {
                                assembledSubs[0].active = false;
                                assembledSubs[0].tab = 'tuesdayTabInactive' + vm.tuesdayMonth;
                            }
                        } else {
                            assembledSubs[i].tab = 'tuesdayTabInactive' + vm.tuesdayMonth;
                        }
                    }
                    vm.tuesdayTabs = assembledSubs;
                });
        }

        function onInit() {
            console.log("Tuesday is lit");

            switch (vm.tuesdayMonth) {
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
             populateTuesdayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
