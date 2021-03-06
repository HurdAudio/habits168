(function () {
    'use strict';

    angular.module('app')
        .component('viewtester', {
            controller: ViewTesterController,
            templateUrl: '/js/viewtester/viewtester.template.html'
        });

    ViewTesterController.$inject = ['$http', '$state', '$stateParams'];

    function ViewTesterController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.href = 'https://news.ycombinator.com/';
        vm.feedsList = [
            {
                description: 'A community for the awesome MVC JS framework.',
                link: 'https://www.reddit.com/r/angularjs/',
                image: 'https://c.thumbs.redditmedia.com/Z4ki_RNzhlka_Gnb.png',
                items: [],
                rss: 'https://reddit.com/r/angularjs/.rss',
                title: 'angular.js'
        },
            {
                description: 'A blog about Major League Baseball',
                link: 'https://www.baseballmusings.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/788443.png',
                items: [],
                rss: 'http://feeds2.feedburner.com/Baseballmusingscom',
                title: 'Baseball Musings'
        },
            {
                description: 'The main page.',
                link: 'http://www.dailykos.com/blogs/main',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/daily-kos-squarelogo-1517554340259.png',
                items: [],
                rss: 'https://feeds.dailykos.com',
                title: 'Daily Kos'
        },
            {
                description: 'Links for the intellectually curious, ranked by readers.',
                link: 'https://news.ycombinator.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
                items: [],
                rss: 'https://news.ycombinator.com/rss',
                title: 'Hacker News'
        },
            {
                description: 'Synthesizer and electronic music news, synth and music software reviews and more!',
                link: 'http://www.synthtopia.com/',
                image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/press-synthtopia-logo.jpg',
                items: [],
                rss: 'http://www.synthtopia.com/feed',
                title: 'Synthtopia'
        }
      ];
        vm.feedsListIndex = 0;
        vm.navigationAdvance = navigationAdvance;
        vm.navigationBack = navigationBack;
        vm.refreshFeedList = refreshFeedList;
        vm.viewShareLink = viewShareLink;
        vm.viewCancelShareSaveLink = viewCancelShareSaveLink;
        vm.viewSaveLink = viewSaveLink;
        vm.spinner = false;
        
        function getSkins() {
            $http.get('/skins/viewer')
                .then(viewerResultData => {
                    vm.viewMonth = viewerResultData.data.viewer;
//                    vm.viewMonth = '_MayC';
                    switch (vm.viewMonth) {
                        case ('_JanuaryA'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/jana_spinner.gif';
                            break;
                        case ('_JanuaryB'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/dna-preloader.gif';
                            break;
                        case ('_JanuaryC'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/janCloading.gif';
                            break;
                        case ('_FebruaryA'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/feba_loader.gif';
                            break;
                        case ('_FebruaryB'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/green_style.gif';
                            break;
                        case ('_FebruaryC'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/nested_spinners.gif';
                            break;
                        case ('_MarchA'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/dc86e54ceca03be4-loading-spinner-animated-gif-83320-mediabin.gif';
                            break;
                        case ('_MarchB'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/Disk-Preloader00.gif';
                            break;
                        case ('_MarchC'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/marcviewspinner.gif';
                            break;
                        case ('_AprilA'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/b4a94b786bffe582cf5824950a8596f4.gif';
                            break;
                        case ('_AprilB'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/blueSpinnerSpinner.gif';
                            break;
                        case('_AprilC'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/liquid-preloader_dribbble_v2.gif';
                            break;
                        case('_MayA'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/7266036c9f3383d21730484150602f01.gif';
                            break;
                        case('_MayB'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/Spinner_fjosdhie.gif';
                            break;
                        case('_MayC'):
                            vm.viewerSpinnerPath = 'https://habits168-hurdaudio.s3.amazonaws.com/viewer/spinners/f941ae9d16fd7d2957eea6e5b1100d1e.gif';
                            break;
                        default:
                            alert('Error: unsupported viewMonth spinner set');
                            console.log('Error: unsupported viewMonth spinner set');
                    }
                    vm.shareSaveLinkDisplay = 'viewShareSaveDialogueHidden' + vm.viewMonth;
                    vm.viewMask = 'viewContainer' + vm.viewMonth;
                });
        }
        
        function navigationAdvance() {
            vm.feedsListIndex += 1;
            if (vm.feedsListIndex === 0) {
                vm.feedStart = true;
            } else {
                vm.feedStart = false;
            }
            if (vm.feedsListIndex === (vm.feedsList.length - 1)) {
                vm.feedEnd = true;
            } else {
                vm.feedEnd = false;
            }
            vm.feedIcon = vm.feedsList[vm.feedsListIndex].image;
            vm.feedTitle = vm.feedsList[vm.feedsListIndex].title;
            vm.feedDescription = vm.feedsList[vm.feedsListIndex].description;
            vm.feedLink = vm.feedsList[vm.feedsListIndex].link;
            populateFeedContent();
            document.getElementById('viewContentDiv').scrollTop = 0;
        }
        
        function navigationBack() {
            vm.feedsListIndex -= 1;
            if (vm.feedsListIndex === 0) {
                vm.feedStart = true;
            } else {
                vm.feedStart = false;
            }
            if (vm.feedsListIndex === (vm.feedsList.length - 1)) {
                vm.feedEnd = true;
            } else {
                vm.feedEnd = false;
            }
            vm.feedIcon = vm.feedsList[vm.feedsListIndex].image;
            vm.feedTitle = vm.feedsList[vm.feedsListIndex].title;
            vm.feedDescription = vm.feedsList[vm.feedsListIndex].description;
            vm.feedLink = vm.feedsList[vm.feedsListIndex].link;
            populateFeedContent();
            document.getElementById('viewContentDiv').scrollTop = 0;
        }
        
        function populateFeedContent() {
            let postTime;
            let localDate;
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            if (vm.feedsList[vm.feedsListIndex].items.length === 0) {
                let rssLink = vm.feedsList[vm.feedsListIndex].rss;
                rssLink = rssLink.replace(':', '%3A');
                while (rssLink.indexOf('/') !== -1) {
                    rssLink = rssLink.replace('/', '%2F');
                }
                console.log(rssLink);
                vm.spinner = true;
                $http.get(`/rss_reader/${rssLink}`)
                    .then(rssContentData => {
                        vm.spinner = false;
                        let rssContent = rssContentData.data;
                        console.log(rssContent);
                        vm.feedsList[vm.feedsListIndex].items = rssContent.items;

                        vm.feedItems = vm.feedsList[vm.feedsListIndex].items;
                        for (let i = 0; i < vm.feedsList[vm.feedsListIndex].items.length; i++) {
                            postTime = new Date(vm.feedsList[vm.feedsListIndex].items[i].pubDate);
                            localDate = postTime.toString();
                            postTime = new Date(localDate);
                            vm.feedsList[vm.feedsListIndex].items[i].cleanDate = days[postTime.getDay()] + ' ' + postTime.getFullYear() + ' ' + months[postTime.getMonth()] + ' ' + postTime.getDate() + ' - ' + postTime.toLocaleTimeString('en-US');
                        }
                        console.log(vm.feedsList);
                    });
            } else {
                vm.feedItems = vm.feedsList[vm.feedsListIndex].items;
            }
        }
        
        function refreshFeedList() {
            vm.feedsList[vm.feedsListIndex].items = [];
            populateFeedContent();
        }
        
        function viewCancelShareSaveLink() {
            vm.shareSaveLinkDisplay = 'viewShareSaveDialogueHidden' + vm.viewMonth;
            vm.viewMask = 'viewContainer' + vm.viewMonth;
            document.getElementById('viewShareSaveLinkUserNotes').value = '';
        }

        function viewSaveLink(post) {
            vm.shareSaveLinkDisplay = 'viewShareSaveDialogueDisplayed' + vm.viewMonth;
            vm.viewLinkShareOrSave = 'Save Link';
            vm.viewLinkShareSaveTitle = post.title;
            vm.viewLinkShareSaveLink = post.link;
            vm.viewMask = 'viewContainerCloaked' + vm.viewMonth;
        }

        function viewShareLink(post) {
            vm.shareSaveLinkDisplay = 'viewShareSaveDialogueDisplayed' + vm.viewMonth;
            vm.viewLinkShareOrSave = 'Share Link';
            vm.viewLinkShareSaveTitle = post.title;
            vm.viewLinkShareSaveLink = post.link;
            vm.viewMask = 'viewContainerCloaked' + vm.viewMonth;
        }

        function onInit() {
            console.log("View Test is lit");

            getSkins();
            vm.feedIcon = vm.feedsList[vm.feedsListIndex].image;
            vm.feedTitle = vm.feedsList[vm.feedsListIndex].title;
            vm.feedDescription = vm.feedsList[vm.feedsListIndex].description;
            vm.feedLink = vm.feedsList[vm.feedsListIndex].link;
            if (vm.feedsListIndex === 0) {
                vm.feedStart = true;
            } else {
                vm.feedStart = false;
            }
            if (vm.feedsListIndex === (vm.feedsList.length - 1)) {
                vm.feedEnd = true;
            } else {
                vm.feedEnd = false;
            }
            populateFeedContent();

        }

    }

}());
