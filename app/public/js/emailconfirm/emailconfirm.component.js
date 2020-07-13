(function () {
    'use strict';

    angular.module('app')
        .component('emailconfirm', {
            controller: EmailConfirmController,
            templateUrl: '/js/emailconfirm/emailconfirm.template.html'
        });

    EmailConfirmController.$inject = ['$http', '$state', '$stateParams'];

    function EmailConfirmController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.emailConfirmMonth = '_JanuaryB';
        vm.emailConfirmContainerState = 'confirmEmail_Active' + vm.emailConfirmMonth;
        vm.accountValid = 'unchecked';
        vm.resubEmail = resubEmail;
        vm.returnToInvalidState = returnToInvalidState;
        vm.returnToLanding = returnToLanding;
        vm.confirmPassword = confirmPassword;
        vm.returnToValidState = returnToValidState;
        
        function returnToValidState() {
            vm.accountValid = 'valid';
            setTimeout(() => {
                document.getElementById('emailConfirmPasswordInput').value = '';
                document.getElementById('emailConfirmPasswordInput').focus();
            }, 250);
        }
        
        function confirmPassword() {
            let submission = document.getElementById('emailConfirmPasswordInput').value;
            
            if (submission !== '') {
                // TODO real login logic
                if (submission === 'password') {
                    // TODO login and route to profile editor
                } else {
                    vm.accountValid = 'wrongpassword';
                }
            }
        }
        
        function returnToLanding() {
            $state.go('landing');
        }
        
        function returnToInvalidState() {
            vm.accountValid = 'invalid';
            setTimeout(() => {
                document.getElementById('resubEmail').focus();
            }, 250);
        }
        
        function resubEmail() {
            const submission = document.getElementById('resubEmail').value;
            
            if (submission !== '') {
                $http.get(`/users`)
                .then(allUsersData => {
                    const allUsers = allUsersData.data;
                    let currentUser = allUsers.filter(entry => {
                        return(entry.email.toLowerCase() === submission.trim().toLowerCase());
                    });
                    if (currentUser.length === 0) {
                        vm.accountValid = 'noemailhere';
                        document.getElementById('resubEmail').value = '';
                    } else {
                        if (currentUser[0].email_confirmed) {
                            vm.accountValid = 'alreadyconfirmed';
                        } else {
                            vm.accountValid = 'newlinksent';
                        }
                    }
                });
            }
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
//                    checkLoginStatus($stateParams.userUuid);
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
        
        function checkAccountFromCode() {
            $http.get(`/users`)
            .then(allUsersData => {
                const allUsers = allUsersData.data;
                console.log(allUsers);
                let currentUser = allUsers.filter(entry => {
                    if (!entry.email_confirmed) {
                        if (entry.email_reset !== null) {
                            if (entry.email_reset.key !== undefined) {
                                return(vm.code === (entry.email_reset.key + entry.email_reset.value));
                            }
                        }
                    }
                });
                if (currentUser.length === 0) {
                    vm.accountValid = 'invalid';
                    setTimeout(() => {
                        document.getElementById('resubEmail').focus();
                    }, 250);
                } else if (currentUser.length === 1) {
                    vm.accountValid = 'valid';
                    setTimeout(() => {
                        document.getElementById('emailConfirmPasswordInput').focus();
                    }, 250);
                } else {
                    vm.accountValid = 'invalid';
                    setTimeout(() => {
                        document.getElementById('resubEmail').focus();
                    }, 250);
                }
            });
        }
        

        function onInit() {
            console.log("Email Confirm is lit");
            vm.code = ($stateParams.code);
            setUserIPAddress();
            checkAccountFromCode();
            
            switch (vm.emailConfirmMonth) {
                case ('_JanuaryA'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                    break;
                case ('_JanuaryB'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
                    break;
                case ('_JanuaryC'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                    break;
                case ('_FebruaryA'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_png_by_piccolapersempre_dbuithu-fullview.png';
                    break;
                case ('_FebruaryB'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/digital_painting__liquid_sleep_by_ukulelemoon_d888syz-pre.jpg';
                    break;
                case ('_FebruaryC'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_cup_by_lashonda1980_dazsks6-pre.png';
                    break;
                case ('_MarchA'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/dd749ir-a2fcf5b4-5422-46d6-8d79-8166d3a47633.jpg';
                    break;
                case('_MarchB'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee-32284_1280.png';
                    break;
                case('_MarchC'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-4929161_1920.jpg';
                    break;
                case('_AprilA'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/ddd784j-25abee3c-e332-4d13-8e9c-df956fe4af96.png';
                    break;
                case('_AprilB'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_for_mister_mondrian_by_floriandra_d15xzay-fullview.jpg';
                    break;
                case('_AprilC'):
                    vm.emailConfirmLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/d7z2x8u-2a1dd6ee-67da-4329-9441-747411452f31.png';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }
        }

    }

}());
