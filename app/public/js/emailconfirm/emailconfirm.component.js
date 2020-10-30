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
        vm.emailConfirmMonth = '_FebruaryA';
        vm.emailConfirmContainerState = 'confirmEmail_Active' + vm.emailConfirmMonth;
        vm.accountValid = 'unchecked';
        vm.resubEmail = resubEmail;
        vm.returnToInvalidState = returnToInvalidState;
        vm.returnToLanding = returnToLanding;
        vm.confirmPassword = confirmPassword;
        vm.returnToValidState = returnToValidState;
        
        function setLoginState() {
            if (!vm.user) {
                alert('ERROR: User not logged in');
                return;
            }
            if (!vm.user.security) {
                alert('ERROR: User not properly logged in');
                return;
            }
            let storage = window.localStorage;
            storage.setItem(vm.user.security.key, vm.user.security.value);
            storage.setItem('habitualOffender', vm.user.uuid);
            storage.setItem('habitualRelease', vm.user.security.expire);
            document.cookie = vm.user.security.key + "=" + vm.user.security.value;
            document.cookie = "habitualOffender=" + vm.user.uuid;
            document.cookie = "habitualRelease=" + vm.user.security.expire;
        }
        
        function shuffleArray(arr) {

            for (let multi = 0; multi < 128; multi++) {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            return (arr);
        }
        
        function encryptByInversion(word, invert) {
            let asciiLimit = 65535;
            let result = '';
            let indexChar = 0;
            let insertChar = 0;

            for (let i = 0; i < word.length; i++) {
                indexChar = word.charCodeAt(i);
                insertChar = invert + (invert - indexChar);
                if (insertChar < 0) {
                    insertChar += asciiLimit;
                }
                insertChar = insertChar % asciiLimit;
                result += String.fromCharCode(insertChar);
            }

            return (result);
        }
        
        function encryptByKey(word, key) {
            let asciiLimit = 65535;
            let index = 0;
            let result = '';
            let insertChar = 0;
            let keyChar = 0;
            let wordChar = 0;

            for (let i = 0; i < word.length; i++) {
                keyChar = key.charCodeAt(index);
                wordChar = word.charCodeAt(i);
                insertChar = wordChar + keyChar;
                if (insertChar > asciiLimit) {
                    insertChar = insertChar - asciiLimit;
                }
                result += String.fromCharCode(insertChar);
                ++index;
                if (index === key.length) {
                    index = 0;
                }
            }
            return (result);
        }
        
        function encryptBySalt(word, salt) {
            let insertionPoint = Math.floor(Math.random() * word.length);
            let result = '';
            if (insertionPoint === 0) {
                result = salt + word;
            } else {
                result = word.slice(0, insertionPoint) + salt + word.slice(insertionPoint);
            }
            return (result);
        }
        
        function ecryptionArray(password, encrypt) {

            let passwords = [];
            passwords[0] = encryptByInversion(password, encrypt.inversion.charCodeAt(0));
            passwords[1] = encryptByKey(password, encrypt.onetime_key);
            passwords[2] = encryptBySalt(password, encrypt.salt);
            passwords[3] = password.split('').reverse().join('');
            passwords[4] = passwords[0];
            passwords[5] = passwords[1];
            passwords[6] = passwords[2];
            passwords[7] = passwords[3];
            passwords[8] = passwords[0];
            passwords[9] = passwords[1];
            passwords[10] = passwords[2];
            passwords[11] = passwords[3];
            passwords[0] = encryptBySalt(passwords[0], encrypt.salt);
            passwords[1] = passwords[1].split('').reverse().join('');
            passwords[2] = encryptByInversion(passwords[2], encrypt.inversion.charCodeAt(0));
            passwords[3] = encryptByKey(passwords[3], encrypt.onetime_key);
            passwords[4] = passwords[4].split('').reverse().join('');
            passwords[5] = encryptByInversion(passwords[5],
                encrypt.inversion.charCodeAt(0));
            passwords[6] = encryptByKey(passwords[6], encrypt.onetime_key);
            passwords[7] = encryptBySalt(passwords[7], encrypt.salt);
            passwords[8] = passwords[8].split('').reverse().join('');
            passwords[9] = encryptBySalt(passwords[9], encrypt.salt);
            passwords[10] = passwords[10].split('').reverse().join('');
            passwords[11] = encryptByInversion(passwords[11], encrypt.inversion.charCodeAt(0));
            passwords[0] = passwords[0].split('').reverse().join('');
            passwords[1] = encryptByInversion(passwords[1], encrypt.inversion.charCodeAt(0));
            passwords[2] = encryptByKey(passwords[2], encrypt.onetime_key);
            passwords[3] = encryptBySalt(passwords[3], encrypt.salt);
            passwords[4] = encryptBySalt(passwords[4], encrypt.salt);
            passwords[5] = encryptBySalt(passwords[5], encrypt.salt);
            passwords[6] = encryptByInversion(passwords[6], encrypt.inversion.charCodeAt(0));
            passwords[7] = encryptByKey(passwords[7], encrypt.onetime_key);
            passwords[8] = encryptBySalt(passwords[8], encrypt.salt);
            passwords[9] = encryptByInversion(passwords[9], encrypt.inversion.charCodeAt(0));
            passwords[10] = encryptByKey(passwords[10], encrypt.onetime_key);
            passwords[11] = encryptBySalt(passwords[11], encrypt.salt);
            passwords[0] = encryptByKey(passwords[0], encrypt.onetime_key);
            passwords[1] = encryptBySalt(passwords[1], encrypt.salt);
            passwords[2] = passwords[2].split('').reverse().join('');
            passwords[3] = passwords[3].split('').reverse().join('');
            passwords[4] = encryptByKey(passwords[4], encrypt.onetime_key);
            passwords[5] = passwords[5].split('').reverse().join('');
            passwords[6] = passwords[6].split('').reverse().join('');
            passwords[7] = encryptByInversion(passwords[7], encrypt.inversion.charCodeAt(0));
            passwords[8] = encryptByKey(passwords[8], encrypt.onetime_key);
            passwords[9] = passwords[9].split('').reverse().join('');
            passwords[10] = encryptByInversion(passwords[10], encrypt.inversion.charCodeAt(0));
            passwords[11] = encryptByKey(passwords[11], encrypt.onetime_key);
            passwords = shuffleArray(passwords);
            return (passwords);
        }
        
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
                let passwordArray = [];
                let userEmail = vm.user.email;
                
                if (!userEmail) {
                    return;
                }
                $http.get(`/users/prelogin/${userEmail}/${vm.ip}`)
                .then(encryptionData => {
                    let encryption = encryptionData.data;
                    if ((encryption.key === null) || (encryption.value === null) || (encryption.inversion === null) || (encryption.onetime_key === null) || (encryption.salt === null)) {
                        vm.loginError = true;
                        vm.loginErrorMessage = 'Login error';
                        return;
                    }
                    passwordArray = ecryptionArray(submission, encryption);
                    let loginObj  = {
                        email: userEmail,
                        password: passwordArray
                    };
                    console.log(loginObj);
                    $http.post('/users/login', loginObj)
                    .then(responseData => {
                        let response = responseData.data;
                        console.log(response);
                        if ((response.uuid === null) && (response.login === 'forbidden')) {
                            console.log('login error');
                            vm.accountValid = 'wrongpassword';
                        } else {
                            vm.user = response;
                            $http.post('/userhub_state', {
                                user_uuid: vm.user.uuid,
                                tabs: 'shared',
                                sub_week: false,
                                sub_management: false,
                                profile_state: 'public'
                            })
                            .then(postedData => {
                                $http.post('/user_expanded_profiles', {
                                    user_uuid: vm.user.uuid,
                                    bio: {
                                        bio: '',
                                        public: false
                                    },
                                    birthdate: {
                                        birthdate: '1900-01-01',
                                        public: false
                                    },
                                    blog_posts: 0,
                                    description: {
                                        description: '',
                                        public: false
                                    },
                                    email: {
                                        email: vm.user.email,
                                        public: false
                                    },
                                    education: {
                                        public: false,
                                        schools: []
                                    },
                                    employer: {
                                        employer: '',
                                        public: false
                                    },
                                    friends: 0,
                                    location: {
                                        adminCode: 'NM',
                                        country: 'US',
                                        featureCode: 'PPLA2',
                                        name: 'Albuquerque',
                                        population: 545852,
                                        public: false,
                                        lat: 35.08449,
                                        lon: -106.65114
                                    },
                                    occupation: {
                                        occupation: '',
                                        public: false
                                    },
                                    phone: {
                                        phone: '',
                                        public: false
                                    },
                                    shared_items: 0
                                })
                                .then(() => {
                                    $http.post('/monday_subscriptions', {
                                        user_uuid: vm.user.uuid,
                                        tabs: {
                                            tabs: []
                                        }
                                    })
                                    .then(() => {
                                        $http.post('/tuesday_subscriptions', {
                                            user_uuid: vm.user.uuid,
                                            tabs: {
                                                tabs: []
                                            }
                                        })
                                        .then(() => {
                                            $http.post('/wednesday_subscriptions', {
                                                user_uuid: vm.user.uuid,
                                                tabs: {
                                                    tabs: []
                                                }
                                            })
                                            .then(() => {
                                                $http.post('/dailies', {
                                                    user_uuid: vm.user.uuid,
                                                    dailies: {
                                                        dailies: {
                                                            allRead: false,
                                                            podcast: false,
                                                            sort: false,
                                                            subscriptions: []
                                                        }
                                                    }
                                                })
                                                .then(() => {
                                                    $state.go('userhub', {
                                                        id: vm.user.uuid
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                            setLoginState();
                            vm.userLoggedIn = true;
                        }
                    });
                });
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
                    vm.user = currentUser[0];
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
