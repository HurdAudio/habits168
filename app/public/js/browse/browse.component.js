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
        vm.browseMonth = '_JanuaryB';
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

        function checkMondaySubscriptions() {
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
                default:
                    alert('non-supported blog category');
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
