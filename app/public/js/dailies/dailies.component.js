(function () {
    'use strict';

    angular.module('app')
        .component('dailies', {
            controller: DailiesController,
            templateUrl: '/js/dailies/dailies.template.html'
        });

    DailiesController.$inject = ['$http', '$state', '$stateParams'];

    function DailiesController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.dailiesMonth = '_JanuaryA';
        vm.dailiesContainer = 'dailiesContainerActive' + vm.dailiesMonth;
        vm.navigateToHub = navigateToHub;
        vm.dailySubs = [
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
          ];
        vm.availableSubs = [];
        vm.filterAvailables = filterAvailables;
        vm.removeSubscription = removeSubscription;
        vm.addSubscription = addSubscription;

        function navigateToHub() {
            $state.go('userhub', {
                id: $stateParams.userUuid
            });
        }

        function filterOutCurrent(uuid) {
            vm.availableSubs = vm.availableSubs.filter(entry => {
                return (entry.uuid !== uuid);
            });
        }

        function filterAvailables() {
            const filter = document.getElementById('dailiesFeedsSearchInput').value;

            if (filter === '') {
                vm.availableSubs = [...vm.unfilteredAvailableSubs];
                return;
            }
            vm.availableSubs = vm.unfilteredAvailableSubs.filter(entry => {
                return (entry.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
            });
        }

        function addSubscription(sub) {
            vm.dailySubs.push(sub);
            vm.dailySubs = vm.dailySubs.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
            vm.unfilteredAvailableSubs = vm.unfilteredAvailableSubs.filter(entry => {
                return(entry.uuid !== sub.uuid);
            });
            filterAvailables();
        }

        function removeSubscription(sub) {
            vm.dailySubs = vm.dailySubs.filter(entry => {
                return (entry.uuid !== sub.uuid);
            });
            vm.unfilteredAvailableSubs.push(sub);
            vm.unfilteredAvailableSubs = vm.unfilteredAvailableSubs.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
            filterAvailables();
        }

        function populateAvailableSubs() {
            vm.availableSubs = [];
            $http.get('/blog_feeds')
                .then(allFeedsData => {
                    vm.allFeeds = allFeedsData.data;
                    vm.availableSubs = [...vm.allFeeds];
                    for (let i = 0; i < vm.dailySubs.length; i++) {
                        filterOutCurrent(vm.dailySubs[i].uuid);
                    }
                    vm.availableSubs = vm.availableSubs.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1;
                        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    vm.unfilteredAvailableSubs = [...vm.availableSubs];
                });
        }


        function onInit() {
            console.log("Dailies is lit");

            switch (vm.dailiesMonth) {
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

            vm.dailySubs = vm.dailySubs.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });

            populateAvailableSubs();


        }

    }

}());
