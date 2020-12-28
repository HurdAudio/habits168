(function () {
    'use strict';

    angular.module('app')
        .component('friday', {
            controller: FridaydayController,
            templateUrl: '/js/friday/friday.template.html'
        });

    FridaydayController.$inject = ['$http', '$state', '$stateParams'];

    function FridaydayController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.fridayMonth = '_JanuaryB';
        vm.fridayContainerState = 'fridayContainerActive' + vm.fridayMonth;
        vm.navigateToHub = navigateToHub;
        vm.fridayTabs = [
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
                tab: 'fridayTabActive' + vm.fridayMonth,
                title: 'Dailies'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'a39be841-f63d-4265-bc47-1bc0203414c3',
                        author: '',
                        description: 'Fearless cooking from a tiny NYC kitchen.',
                        link: 'https://smittenkitchen.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/cropped-smitten-kitchen-logo_no_text.jpg',
                        items: null,
                        rss: 'http://feeds.feedburner.com/smittenkitchen',
                        title: 'smitten kitchen',
                        userRead: false
                    },
                    {
                        uuid: '2bafc0a7-8fe1-4014-b3b1-fa125717b946',
                        author: '',
                        description: 'When you own over 100 cookbooks, it is time to stop buying, and start cooking. This site chronicles a cookbook collection, one recipe at a time.',
                        link: 'https://www.101cookbooks.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/unnamed-101cookbooks.png',
                        items: null,
                        rss: 'https://www.101cookbooks.com/feed',
                        title: '101 Cookbooks',
                        userRead: false
                    },
                    {
                        uuid: '6ae0832b-a373-4637-b53d-2ccf359762f0',
                        author: '',
                        description: 'Celebrating Texan home cooking through stories and recipes',
                        link: 'https://www.homesicktexan.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/homesick-texan-93404l2.jpg',
                        items: null,
                        rss: 'https://www.homesicktexan.com/feed',
                        title: 'Homesick Texan',
                        userRead: false
                    },
                    {
                        uuid: 'a2f53f64-7571-4993-af83-d5cf278b94eb',
                        author: '',
                        description: 'A family cooking and food blog with hundreds of healthy, whole-food recipes for the home cook. Photographs, easy-to-follow instructions, and reader comments.',
                        link: 'https://www.simplyrecipes.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/logoSimplyRecipes.png',
                        items: null,
                        rss: 'https://feedproxy.google.com/elise/simplyrecipes',
                        title: 'Simply Recipes',
                        userRead: false
                    },
                    {
                        uuid: '62dd7ecd-f0fd-4455-b35c-ed31bb4a9d18',
                        author: '',
                        description: 'Eat thoughtfully, live joyfully.',
                        link: 'https://food52.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/Food52-Logo-1.jpg',
                        items: null,
                        rss: 'https://food52.com/blog.rss',
                        title: 'Food52',
                        userRead: false
                    }
                  ],
                tab: 'fridayTabInactive' + vm.fridayMonth,
                title: 'Food'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: '81d099be-6953-4e7e-9a3d-7afdbf24c9df',
                        author: '',
                        description: 'Literary review publishing essay-length book reviews and topical articles on politics, literature, history, philosophy, science and the arts by leading writers and thinkers',
                        link: 'https://lrb.co.uk/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/rss-feedLRB.png',
                        items: null,
                        rss: 'https://lrb.co.uk/feeds/rss',
                        title: 'London Review of Books',
                        userRead: false
                    },
                    {
                        uuid: '04154f8d-3049-4445-bab7-f43cd9169ec6',
                        author: '',
                        description: '',
                        link: 'https://lareviewofbooks.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/LARB_logo.jpeg',
                        items: null,
                        rss: 'https://lareviewofbooks.org/feed/',
                        title: 'Los Angeles Review of Books',
                        userRead: false
                    },
                    {
                        uuid: 'c59de8c8-05ac-4784-8a81-72a3e5a89d04',
                        author: '',
                        description: 'The best of the literary web',
                        link: 'https://lithub.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/social_logoLITHUB.png',
                        items: null,
                        rss: 'https://lithub.com/feed/',
                        title: 'Literary Hub',
                        userRead: false
                    },
                    {
                        uuid: '54db951f-5d6e-44fd-a210-87fda5a4aca5',
                        author: '',
                        description: '',
                        link: 'http://blog.pshares.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/0UIWI0F9_400x400.jpg',
                        items: null,
                        rss: 'http://blog.pshares.org/index.php/feed/',
                        title: 'The Ploughshares Blog',
                        userRead: false
                    },
                    {
                        uuid: 'c0775faf-8fc3-4bbd-b629-86105635e95f',
                        author: '',
                        description: '',
                        link: 'https://catapult.co/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/Catapult-Logo%403x-2e093b6454ba383ead5f9b1f5dcd1a90b6bc761ba09af9718f738db1a556a5ec.png',
                        items: null,
                        rss: 'https://catapult.co/rss',
                        title: 'Catapult',
                        userRead: false
                    },
                    {
                        uuid: '89070278-0fd0-4b9f-92c0-d03b26ed34fd',
                        author: '',
                        description: 'Amazon Book Review',
                        link: 'https://www.amazonbookreview.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/amazonBookReview.png',
                        items: null,
                        rss: 'https://www.amazonbookreview.com/feed/entries/rss',
                        title: 'Amazon Book Review',
                        userRead: false
                    }
                  ],
                tab: 'fridayTabInactive' + vm.fridayMonth,
                title: 'Books'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'c185b5af-c574-4012-b3f6-8eab1c27fb7f',
                        author: '',
                        description: 'Total.js Platform news and tutorials',
                        link: 'https://blog.totaljs.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/B20190830T000000005.jpg',
                        items: null,
                        rss: 'https://blog.totaljs.com/rss',
                        title: 'Total.js Platform Blog',
                        userRead: false
                    },
                    {
                        uuid: '21c613e1-446d-4b96-aa55-fff9ebd65a8d',
                        author: '',
                        description: 'Comprehensive learning resources for mastering the JavaScript ecosystem.',
                        link: 'https://ui.dev/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/68747470733a2f2f75692e6465762f696d616765732f6c6f676f732f75692e706e67.png',
                        items: null,
                        rss: 'https://ui.dev/rss.xml',
                        title: 'ui.dev\'s RSS Feed',
                        userRead: false
                    },
                    {
                        uuid: 'cdef7b96-29b7-4361-8fc1-f2675d637e27',
                        author: '',
                        description: 'Development of Maintainable Web Applications',
                        link: 'http://www.zsoltnagy.eu/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/zsoltnagy.jpeg',
                        items: null,
                        rss: 'http://www.zsoltnagy.eu/feed/rss/',
                        title: 'Zsolt Nagy',
                        userRead: false
                    },
                    {
                        uuid: '15000552-03a8-4413-8509-ecd74906fab2',
                        author: '',
                        description: 'Delivering JavaScript Knowledge',
                        link: 'https://jsdiaries.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/jsdiaries-logo.png',
                        items: null,
                        rss: 'https://www.jsdiaries.com/rss.xml',
                        title: 'The JavaScript Diaries',
                        userRead: false
                    },
                    {
                        uuid: 'e2f6963a-da17-4b84-acb6-c9a779862f27',
                        author: '',
                        description: 'Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in Berlin, German/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...',
                        link: 'https://www.robinwieruch.de/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/519rgWOYPjL.jpg',
                        items: null,
                        rss: 'https://www.robinwieruch.de/index.xml',
                        title: 'RWieruch',
                        userRead: false
                    },
                    {
                        uuid: 'ff55e93f-5ce7-417e-b9ed-40b0b5d00c92',
                        author: 'Dave Ceddia',
                        description: '',
                        link: 'https://daveceddia.com/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/m5psqUol.jpg',
                        items: null,
                        rss: 'https://daveceddia.com/feed.xml',
                        title: 'Dave Ceddia',
                        userRead: false
                    }
                  ],
                tab: 'fridayTabInactive' + vm.fridayMonth,
                title: 'Coding'
                },
            {
                active: false,
                allRead: false,
                podcast: false,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'b53c1a88-96d8-4169-8691-3f3131740b84',
                        author: '',
                        description: 'Informed analysis of public policy and the politics of power, from a progressive perspective',
                        link: 'https://prospect.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/TheAmericanProspect.jpeg',
                        items: null,
                        rss: 'https://prospect.org/api/rss/content.rss',
                        title: 'TAP : The American Prospect',
                        userRead: false
                    },
                    {
                        uuid: 'fc453d40-1d9d-45ab-b92a-a00927deedd1',
                        author: '',
                        description: 'A Journal of Ideas',
                        link: 'https://democracyjournal.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/DEM-twitter-icon-01_400x400.png',
                        items: null,
                        rss: 'https://democracyjournal.org/feed/',
                        title: 'Democracy Journal',
                        userRead: false
                    },
                    {
                        uuid: '99a64dee-d700-441d-b31e-493b8ef83ef9',
                        author: '',
                        description: '',
                        link: 'https://firstdraftnews.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/first-draft-asterisk-logo.png',
                        items: null,
                        rss: 'https://firstdraftnews.org/feed/',
                        title: 'First Draft',
                        userRead: false
                    },
                    {
                        uuid: '3e63b8b7-3f93-4219-add9-1ca44d864563',
                        author: '',
                        description: 'Robert Reich’s latest book is “THE SYSTEM: Who Rigged It, How To Fix It,” out March 24. He is Chancellor’s Professor of Public Policy at the University of California at Berkeley and Senior Fellow at the Blum Center. He served as Secretary of Labor in the Clinton administration, for which Time Magazine named him one of the 10 most effective cabinet secretaries of the twentieth century. He has written 17 other books, including the best sellers “Aftershock,”“The Work of Nations,” “Beyond Outrage,” and “The Common Good.” He is a founding editor of the American Prospect magazine, founder of Inequality Media, a member of the American Academy of Arts and Sciences, and co-creator of the award-winning documentaries “Inequality For All,” and “Saving Capitalism,” both now streaming on Netflix.',
                        link: 'https://robertreich.org/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/portraitRR.jpg',
                        items: null,
                        rss: 'https://robertreich.org/rss',
                        title: 'Robert Reich',
                        userRead: false
                    },
                    {
                        uuid: '007dc16f-bb8f-42b6-81cb-115bbef97286',
                        author: '',
                        description: 'Paul Krugman, a New York Times opinion columnist, writes about macroeconomics, trade, health care, social policy and politics. In 2008, he received the Nobel Prize in Economics.',
                        link: 'https://www.nytimes.com/column/paul-krugman',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/paul-krugman-thumbLarge.png',
                        items: null,
                        rss: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/column/paul-krugman/rss.xml',
                        title: 'Paul Krugman',
                        userRead: false
                    },
                    {
                        uuid: 'd9075b62-1de0-4a0e-8b9b-44bffb1637c2',
                        author: '',
                        description: 'Maureen Dowd, a New York Times Op-Ed columnist, writes about American politics, popular culture and international affairs.',
                        link: 'https://www.nytimes.com/column/maureen-dowd',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/maureen-dowd-thumbLarge.png',
                        items: null,
                        rss: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/column/maureen-dowd/rss.xml',
                        title: 'Maureen Dowd',
                        userRead: false
                    }
                  ],
                tab: 'fridayTabInactive' + vm.fridayMonth,
                title: 'Politics'
                },
            {
                active: false,
                allRead: false,
                podcast: true,
                sort: 'up',
                subscriptions: [
                    {
                        uuid: 'ecb02059-d793-42a3-ae31-dadf11ab771c',
                        author: 'Wes Bos &amp; Scott Tolinski - Full Stack JavaScript Web Developers',
                        description: 'Full Stack Developers Wes Bos and Scott Tolinski dive deep into web development topics, explaining how they work and talking about their own experiences. They cover from JavaScript frameworks like React, to the latest advancements in CSS to simplifying web tooling.',
                        link: 'https://syntax.fm/',
                        image: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/syntaxlogo.png',
                        items: null,
                        rss: 'http://feed.syntax.fm/rss',
                        title: 'Syntax - Tasty Web Development Treats',
                        userRead: false
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
                        userRead: false
                    }
                  ],
                tab: 'fridayTabInactive' + vm.fridayMonth,
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
                        title: 'Albuquerque Alibi - friday, September 12, 2019',
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
                tab: 'fridayTabInactive' + vm.fridayMonth,
                title: 'Externals'
                }
              ];
        vm.toggleTabs = toggleTabs;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.toggleReadStatus = toggleReadStatus;
        vm.fridayManagerEngaged = fridayManagerEngaged;
        vm.managerModalState = 'fridayManageTabsSubsModalInactive' + vm.fridayMonth;
        vm.exitFridayManagerModal = exitFridayManagerModal;
        vm.fridayManageTabber = fridayManageTabber;
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
        vm.fridayGuardRailEngaged = false;
        vm.deleteTabLogic = deleteTabLogic;
        vm.guardrailDenied = guardrailDenied;
        vm.guardrailAccepted = guardrailAccepted;
        
        function guardrailAccepted() {
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === vm.editingTab.title) {
                    vm.fridayTabs.splice(i, 1);
                    guardrailDenied();
                    return;
                }
            }
        }
        
        function guardrailDenied() {
            vm.fridayGuardRailEngaged = false;
            vm.managerModalState = 'fridayManageTabsSubsModal' + vm.fridayMonth;
        }
        
        function deleteTabLogic(tab) {
            vm.editingTab = tab;
            vm.fridayGuardRailEngaged = true;
            vm.guardRailText = 'Delete tab: ' + tab.title + '?';
            vm.managerModalState = 'fridayManageTabsSubsModalBlur' + vm.fridayMonth;
        }
        
        function addTabLogic() {
            vm.actionWillDeleteFeedsError = false;
            vm.emptyTabNameError = false;
            vm.uniqueTabNameError = false;
            vm.tabCreateEditEngaged = true;
            vm.managerModalState = 'fridayManageTabsSubsModalBlur' + vm.fridayMonth;
            vm.fridayCreateEditTabText = 'Create a new tab:';
            setTimeout(() => {
                let fridayTabNameInput = document.getElementById('fridayTabNameInput');
                fridayTabNameInput.value = '';
                fridayTabNameInput.focus();
            }, 100);
        }
        
        function overwriteSubscriptionsInTab() {
            let fridayTabNameInput = document.getElementById('fridayTabNameInput');

            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === vm.editingTab.title) {
                    vm.fridayTabs[i].active = vm.editingTab.active;
                    vm.fridayTabs[i].allRead = false;
                    vm.fridayTabs[i].podcast = vm.tabPodcast;
                    vm.fridayTabs[i].sort = vm.editingTab.sort;
                    vm.fridayTabs[i].subscriptions = [];
                    vm.fridayTabs[i].tab = vm.editingTab.tab;
                    vm.fridayTabs[i].title = fridayTabNameInput.value;
                    vm.fridayTabs = [];
                    cancelAddTabLogic();
                }
            }
            if (vm.tabPodcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.fridaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.fridaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                        filterSearch();
                    });
            }
        }

        function submitTabLogic() {
            let fridayTabNameInput = document.getElementById('fridayTabNameInput');
            if (fridayTabNameInput.value === '') {
                vm.emptyTabNameError = true;
                vm.uniqueTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            let duplicate = vm.fridayTabs.filter(entry => {
                return (entry.title.toLowerCase() === fridayTabNameInput.value.toLowerCase().trim());
            });
            if ((duplicate.length !== 0) && (vm.fridayCreateEditTabText === 'Create a new tab:')) {
                vm.uniqueTabNameError = true;
                vm.emptyTabNameError = false;
                vm.actionWillDeleteFeedsError = false;
                return;
            }
            if (vm.fridayCreateEditTabText === 'Create a new tab:') {
                let sorta, sortb;
                let daily = [];
                daily.push(vm.fridayTabs[0]);
                let external = [];
                external.push(vm.fridayTabs[vm.fridayTabs.length - 1]);
                let friSubs = vm.fridayTabs.slice(1, (vm.fridayTabs.length - 1));
                let subObj = {
                    active: false,
                    allRead: false,
                    podcast: vm.tabPodcast,
                    sort: 'up',
                    subscriptions: [],
                    tab: 'fridayTabInactive' + vm.fridayMonth,
                    title: fridayTabNameInput.value
                }
                friSubs.push(subObj);
                friSubs = friSubs.sort((a, b) => {
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
                vm.fridayTabs = subs.concat(external);
                cancelAddTabLogic();
                return;
            } else {
                if (fridayTabNameInput.value === vm.editingTab.title) {
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
                            for (let i = 0; i < vm.fridayTabs.length; i++) {
                                if (vm.fridayTabs[i].title === vm.editingTab.title) {
                                    vm.fridayTabs[i].podcast = vm.tabPodcast;
                                    cancelAddTabLogic();
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    if (vm.tabPodcast === vm.editingTab.podcast) {
                        for (let i = 0; i < vm.fridayTabs.length; i++) {
                            if (vm.fridayTabs[i].title === vm.editingTab.title) {
                                vm.fridayTabs[i].title = fridayTabNameInput.value;
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
                            for (let i = 0; i < vm.fridayTabs.length; i++) {
                                if (vm.fridayTabs[i].title === vm.editingTab.title) {
                                    vm.fridayTabs[i].title = fridayTabNameInput.value;
                                    vm.fridayTabs[i].podcast = vm.tabPodcast;
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
            vm.managerModalState = 'fridayManageTabsSubsModal' + vm.fridayMonth;
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
            vm.managerModalState = 'fridayManageTabsSubsModalBlur' + vm.fridayMonth;
            vm.fridayCreateEditTabText = 'Edit tab:';
            setTimeout(() => {
                let fridayTabNameInput = document.getElementById('fridayTabNameInput');
                fridayTabNameInput.value = tab.title;
                fridayTabNameInput.focus();
            }, 100);
        }

        function addSubscription(feed) {
            let sorta, sortb;

            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === vm.fridayManageSelectedTab) {
                    feed.userRead = false;
                    vm.fridayTabs[i].subscriptions.push(feed);
                    if (vm.fridayTabs[i].sort === 'up') {
                        vm.fridayTabs[i].subscriptions = vm.fridayTabs[i].subscriptions.sort((a, b) => {
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
                    } else if (vm.fridayTabs[i].sort === 'down') {
                        vm.fridayTabs[i].subscriptions = vm.fridayTabs[i].subscriptions.sort((a, b) => {
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
                    vm.fridaySubs = vm.fridayTabs[i].subscriptions;
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
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === vm.fridayManageSelectedTab) {
                    for (let j = 0; j < vm.fridayTabs[i].subscriptions.length; j++) {
                        if (vm.fridayTabs[i].subscriptions[j].uuid === sub.uuid) {
                            if (vm.fridayTabs[i].title === 'Externals') {
                                removeExternal(sub.uuid);
                            }
                            vm.fridayTabs[i].subscriptions.splice(j, 1);
                            vm.fridaySubs = vm.fridaySubs.filter(entry => {
                                return (entry.uuid !== sub.uuid);
                            });
                            if (vm.fridayTabs[i].title !== 'Externals') {
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
            let query = document.getElementById('fridayManageSearch').value;
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

        function fridayManageTabber(tabTitle) {
            vm.fridayManageSelectedTab = tabTitle;
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === tabTitle) {
                    vm.fridaySubs = vm.fridayTabs[i].subscriptions;
                    if (tabTitle !== 'Externals') {
                        if (vm.fridayTabs[i].podcast) {
                            $http.get('/podcast_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.fridaySubs, blogFeedsData.data);
                                    vm.availableFeeds = vm.allFeeds;
                                    filterSearch();
                                });
                        } else {
                            $http.get('/blog_feeds')
                                .then(blogFeedsData => {
                                    vm.allFeeds = filterSubscriptions(vm.fridaySubs, blogFeedsData.data);
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

        function exitFridayManagerModal() {
            vm.managerModalState = 'fridayManageTabsSubsModalInactive' + vm.fridayMonth;
            vm.fridayContainerState = 'fridayContainerActive' + vm.fridayMonth;
        }

        function fridayManagerEngaged() {
            //            document.getElementById('fridayManageSearch').value = '';
            vm.fridayManageSelectedTab = vm.fridayTabs[0].title;
            vm.fridaySubs = vm.fridayTabs[0].subscriptions;
            if (vm.fridayTabs[0].podcast) {
                $http.get('/podcast_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.fridaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            } else {
                $http.get('/blog_feeds')
                    .then(blogFeedsData => {
                        vm.allFeeds = filterSubscriptions(vm.fridaySubs, blogFeedsData.data);
                        vm.availableFeeds = vm.allFeeds;
                    });
            }
            vm.managerModalState = 'fridayManageTabsSubsModal' + vm.fridayMonth;
            vm.fridayContainerState = 'fridayContainerInactive' + vm.fridayMonth;
        }

        function toggleReadStatus(contentTitle, subUuid) {
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === contentTitle) {
                    for (let j = 0; j < vm.fridayTabs[i].subscriptions.length; j++) {
                        if (vm.fridayTabs[i].subscriptions[j].uuid === subUuid) {
                            vm.fridayTabs[i].subscriptions[j].userRead = !vm.fridayTabs[i].subscriptions[j].userRead;
                        }
                    }
                }
            }
        }

        function sortSubscriptions(contentTitle, direction) {
            let sorta, sortb;
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === contentTitle) {
                    vm.fridayTabs[i].sort = direction;
                    switch (direction) {
                        case ('up'):
                            vm.fridayTabs[i].subscriptions = vm.fridayTabs[i].subscriptions.sort((a, b) => {
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
                            vm.fridayTabs[i].subscriptions = vm.fridayTabs[i].subscriptions.sort((a, b) => {
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
                            for (let k = 0; k < (vm.fridayTabs[i].subscriptions.length * 10); k++) {
                                for (let j = 0; j < vm.fridayTabs[i].subscriptions.length; j++) {
                                    index = Math.floor(Math.random() * vm.fridayTabs[i].subscriptions.length);
                    [vm.fridayTabs[i].subscriptions[j], vm.fridayTabs[i].subscriptions[index]] = [vm.fridayTabs[i].subscriptions[index], vm.fridayTabs[i].subscriptions[j]];
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
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === contentTitle) {
                    vm.fridayTabs[i].allRead = !vm.fridayTabs[i].allRead;
                    for (let j = 0; j < vm.fridayTabs[i].subscriptions.length; j++) {
                        vm.fridayTabs[i].subscriptions[j].userRead = vm.fridayTabs[i].allRead;
                    }
                }
            }
        }

        function toggleTabs(tabTitle) {
            for (let i = 0; i < vm.fridayTabs.length; i++) {
                if (vm.fridayTabs[i].title === tabTitle) {
                    vm.fridayTabs[i].active = true;
                    vm.fridayTabs[i].tab = 'fridayTabActive' + vm.fridayMonth;
                } else {
                    vm.fridayTabs[i].active = false;
                    vm.fridayTabs[i].tab = 'fridayTabInactive' + vm.fridayMonth;
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
            let tabs = vm.fridayTabs.filter(entry => {
                return ((entry.title !== 'Dailies') && (entry.title !== 'Externals'));
            });
            let dailyTab = vm.fridayTabs.filter(entry => {
                return (entry.title === 'Dailies');
            });
            let externalTab = vm.fridayTabs.filter(entry => {
                return(entry.title === 'Externals');
            });
            for (let i = 0; i < externalTab[0].subscriptions.length; i++) {
                updateExternalsReadStatus(externalTab[0].subscriptions[i]);
            }
//            $http.patch(`/friday_subscriptions/${vm.user.uuid}`, {
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
        
        function populatefridayTabs(userUuid) {
            $http.get(`/friday_subscriptions/assembled/${userUuid}`)
                .then(assembledSubsData => {
                    let assembledSubs = assembledSubsData.data;
                    for (let i = 0; i < assembledSubs.length; i++) {
                        if (assembledSubs[i].active) {
                            assembledSubs[i].tab = 'fridayTabActive' + vm.fridayMonth;
                            if (i > 0) {
                                assembledSubs[0].active = false;
                                assembledSubs[0].tab = 'fridayTabInactive' + vm.fridayMonth;
                            }
                        } else {
                            assembledSubs[i].tab = 'fridayTabInactive' + vm.fridayMonth;
                        }
                    }
                    vm.fridayTabs = assembledSubs;
                });
        }

        function onInit() {
            console.log("friday is lit");

            switch (vm.fridayMonth) {
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
//            populatefridayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
