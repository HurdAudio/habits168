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
        
        vm.navigateToHub = navigateToHub;
        vm.toggleTabs = toggleTabs;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.toggleReadStatus = toggleReadStatus;
        vm.tuesdayManagerEngaged = tuesdayManagerEngaged;
        
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
                    tab: 'tuesdayTabInactive' + vm.tuesdayMonth,
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
            vm.managerModalState = 'tuesdayManageTabsSubsModalBlur' + vm.tuesdayMonth;
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
        
        
        function setMonthSelect() {
            $http.get('/skins/tuesday')
            .then(hubSkinResponseData => {
                const hubSkinResponse = hubSkinResponseData.data;
                vm.tuesdayMonth = hubSkinResponse.tuesday;
//                vm.tuesdayMonth = '_AprilA';
                vm.tuesdayContainerState = 'tuesdayContainerActive' + vm.tuesdayMonth;
                vm.managerModalState = 'tuesdayManageTabsSubsModalInactive' + vm.tuesdayMonth;
                
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
                case('_AprilA'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/ddd784j-25abee3c-e332-4d13-8e9c-df956fe4af96.png';
                    break;
                case('_AprilB'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_for_mister_mondrian_by_floriandra_d15xzay-fullview.jpg';
                    break;
                case('_AprilC'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/d7z2x8u-2a1dd6ee-67da-4329-9441-747411452f31.png';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
                }
            });
        }

        function onInit() {
            console.log("Tuesday is lit");

            setMonthSelect();
            
            setUserIPAddress();
            setFooterMessage();
             populateTuesdayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
