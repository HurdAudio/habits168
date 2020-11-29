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
        vm.navigateToHub = navigateToHub;
        vm.toggleTabs = toggleTabs;
        vm.toggleReadStatus = toggleReadStatus;
        vm.toggleAllReadStatus = toggleAllReadStatus;
        vm.sortSubscriptions = sortSubscriptions;
        vm.exitMondayManagerModal = exitMondayManagerModal;
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
        
        function setMonthSelect() {
            $http.get('/skins/monday')
            .then(hubSkinResponseData => {
                const hubSkinResponse = hubSkinResponseData.data;
                vm.mondayMonth = hubSkinResponse.monday;
//                vm.mondayMonth = '_MayA';
                vm.mondayContainerState = 'mondayContainerActive' + vm.mondayMonth;
                vm.managerModalState = 'mondayManageTabsSubsModalInactive' + vm.mondayMonth;
                
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
                case('_MayA'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-5414471_1920.jpg';
                    break;
                case('_MayB'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_city_by_pushok_12_dyr0lf-fullview.jpg';
                    break;
                case('_MayC'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/d3dc9l7-867ffd43-ebb6-4ed4-87b0-163c5f0bfae4.jpg';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }
            });
        }

        function onInit() {
            console.log("Monday is lit");
            
            setMonthSelect();

            setUserIPAddress();
            setFooterMessage();
            populateMondayTabs($stateParams.userUuid);
            // checkLoginStatus();

        }

    }

}());
