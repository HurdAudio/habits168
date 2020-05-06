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
        vm.dailiesMonth = '_FebruaryB';
        vm.dailiesContainer = 'dailiesContainerActive' + vm.dailiesMonth;
        vm.navigateToHub = navigateToHub;
        vm.availableSubs = [];
        vm.filterAvailables = filterAvailables;
        vm.removeSubscription = removeSubscription;
        vm.addSubscription = addSubscription;

        function navigateToHub() {
            let now = new Date();
            $http.get(`/dailies/byuser/${vm.user.uuid}`)
                .then(userDailySubsData => {
                    let userDailySubs = userDailySubsData.data;
                    userDailySubs.dailies.dailies.subscriptions = vm.dailySubs;
                    userDailySubs.updated_at = now;
                    $http.patch(`/dailies/${userDailySubs.uuid}`, userDailySubs)
                        .then(() => {
                            $state.go('userhub', {
                                id: $stateParams.userUuid
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
                    populateDailySubs();
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
                return (entry.uuid !== sub.uuid);
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

        function populateDailySubs() {
            $http.get(`/dailies/assembled/${vm.user.uuid}`)
                .then(assembledDailiesData => {
                    vm.dailySubs = assembledDailiesData.data.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1;
                        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    populateAvailableSubs();
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
        }

    }

}());
