(function () {
    'use strict';

    angular.module('app')
        .component('externals', {
            controller: ExternalsController,
            templateUrl: '/js/externals/externals.template.html'
        });

    ExternalsController.$inject = ['$http', '$state', '$stateParams'];

    function ExternalsController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        
        vm.navigateToHub = navigateToHub;
        vm.toggleReadStatus = toggleReadStatus;
        vm.deleteGuardrail = deleteGuardrail;
        vm.cancelGuardrail = cancelGuardrail;
        vm.confirmGuardrail = confirmGuardrail;
        vm.externalAddErrorMessage = '';
        vm.addCandidateImage = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
        vm.addCandidateTitle = '';
        vm.addCandidateDescription = '';
        vm.updateTitle = updateTitle;
        vm.updateDescription = updateDescription;
        vm.updateImage = updateImage;
        vm.externalsAddCancel = externalsAddCancel;
        vm.activateAddDialog = activateAddDialog;
        vm.externalsAddSubmit = externalsAddSubmit;

        function externalsAddSubmit() {
            const title = document.getElementById('inputTitle').value.trim();
            const description = document.getElementById('inputDescription').value.trim();
            let link = document.getElementById('inputImage').value.trim();

            if ((title.trim() === '') && (description.trim() === '') && (link.trim() === '')) {
                vm.externalAddErrorMessage = "Please enter external reading data.";
                return;
            }
            if (title.trim() === '') {
                vm.externalAddErrorMessage = "Please enter a title";
                return;
            }
            if (link.trim() === '') {
                link = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
            }
            $http.post('/externals', {
                user_uuid: vm.user.uuid,
                author: null,
                description: description,
                link: null,
                image_link: link,
                items: null,
                rss: null,
                title: title,
                userRead: false
            }).then(response => {
                vm.userExternals.subscriptions.push({
                    uuid: response.data[0].uuid,
                    author: null,
                    description: description,
                    link: null,
                    image_link: link,
                    items: null,
                    rss: null,
                    title: title,
                    userRead: false
                });
            });

            externalsAddCancel();

        }

        function activateAddDialog() {
            vm.externalsAddDialogState = 'externalsAddNewExternalsDialogActive' + vm.externalsMonth;
            vm.externalsContainerState = "externalsContainerInactive" + vm.externalsMonth;
        }

        function externalsAddCancel() {
            vm.addCandidateImage = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
            vm.addCandidateTitle = '';
            vm.addCandidateDescription = '';
            document.getElementById('inputImage').value = '';
            document.getElementById('inputTitle').value = '';
            document.getElementById('inputDescription').value = '';
            vm.externalAddErrorMessage = '';
            vm.externalsAddDialogState = 'externalsAddNewExternalsDialogInactive' + vm.externalsMonth;
            vm.externalsContainerState = "externalsContainerActive" + vm.externalsMonth;
        }

        function updateImage() {
            let link = document.getElementById('inputImage').value;

            if (link === '') {
                vm.addCandidateImage = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
            } else {
                vm.addCandidateImage = link;
            }
        }

        function updateTitle() {
            vm.addCandidateTitle = document.getElementById('inputTitle').value;
        }

        function updateDescription() {
            vm.addCandidateDescription = document.getElementById('inputDescription').value;
        }

        function confirmGuardrail() {
            cancelGuardrail();
            $http.delete(`/externals/${vm.externalsDeleteCandidate.uuid}`)
                .then(() => {
                    for (let i = 0; i < vm.userExternals.subscriptions.length; i++) {
                        if (vm.userExternals.subscriptions[i].uuid === vm.externalsDeleteCandidate.uuid) {
                            vm.userExternals.subscriptions.splice(i, 1);
                            return;
                        }
                    }
                });

        }

        function cancelGuardrail() {
            vm.externalsGuardrailState = 'externalsDeleteGuardrailInactive' + vm.externalsMonth;
            vm.externalsContainerState = "externalsContainerActive" + vm.externalsMonth;
        }

        function deleteGuardrail(issue) {
            vm.externalsDeleteCandidate = issue;
            vm.externalsGuardrailState = 'externalsDeleteGuardrailActive' + vm.externalsMonth;
            vm.externalsContainerState = "externalsContainerInactive" + vm.externalsMonth;
        }

        function patchReadStatus(uuid, status) {
            $http.patch(`/externals/${uuid}`, {
                userRead: status,
                updated_at: new Date()
            });
        }

        function toggleReadStatus(uuid) {

            for (let i = 0; i < vm.userExternals.subscriptions.length; i++) {
                if (vm.userExternals.subscriptions[i].uuid === uuid) {
                    vm.userExternals.subscriptions[i].userRead = !vm.userExternals.subscriptions[i].userRead;
                    patchReadStatus(uuid, vm.userExternals.subscriptions[i].userRead);
                    return;
                }
            }
        }

        function navigateToHub() {
            $state.go('userhub', {
                id: $stateParams.userUuid
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

        function populateExternalsFeed(uuid) {
            $http.get(`/externals/feed/${uuid}`)
                .then(feedData => {
                    vm.userExternals = {
                        active: false,
                        allRead: false,
                        podcast: false,
                        sort: 'up',
                        subscriptions: feedData.data
                    };
                });
        }
        
        function setExternalSkins() {
            $http.get(`/skins/externals`)
            .then(externalSkinData => {
                const externalSkin = externalSkinData.data;
                vm.externalsMonth = externalSkin.externals;
//                vm.externalsMonth = '_AprilC';
                vm.externalsContainerState = "externalsContainerActive" + vm.externalsMonth;
                vm.externalsGuardrailState = 'externalsDeleteGuardrailInactive' + vm.externalsMonth;
                vm.externalsAddDialogState = 'externalsAddNewExternalsDialogInactive' + vm.externalsMonth;
                switch (vm.externalsMonth) {
                    case ('_JanuaryA'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                        break;
                    case ('_JanuaryB'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png';
                        break;
                    case ('_JanuaryC'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                        break;
                    case ('_FebruaryA'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_png_by_piccolapersempre_dbuithu-fullview.png';
                        break;
                    case ('_FebruaryB'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/digital_painting__liquid_sleep_by_ukulelemoon_d888syz-pre.jpg';
                        break;
                    case ('_FebruaryC'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_cup_by_lashonda1980_dazsks6-pre.png';
                        break;
                    case ('_MarchA'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/dd749ir-a2fcf5b4-5422-46d6-8d79-8166d3a47633.jpg';
                        break;
                    case('_MarchB'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee-32284_1280.png';
                        break;
                    case('_MarchC'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-4929161_1920.jpg';
                        break;
                    case('_AprilA'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/ddd784j-25abee3c-e332-4d13-8e9c-df956fe4af96.png';
                        break;
                    case('_AprilB'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_for_mister_mondrian_by_floriandra_d15xzay-fullview.jpg';
                        break;
                    case('_AprilC'):
                        vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/d7z2x8u-2a1dd6ee-67da-4329-9441-747411452f31.png';
                        break;
                    default:
                        alert('UNSUPPORTED MONTH SELECT for LOGO');
                }
            });
        }

        function onInit() {
            console.log("Externals is lit");

            setExternalSkins();

            setUserIPAddress();
            populateExternalsFeed($stateParams.userUuid);
        }

    }

}());
