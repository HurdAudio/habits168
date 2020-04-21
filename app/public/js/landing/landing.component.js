(function () {
    'use strict';

    angular.module('app')
        .component('landing', {
            controller: LandingController,
            templateUrl: '/js/landing/landing.template.html'
        });

    LandingController.$inject = ['$http', '$state', '$stateParams'];

    function LandingController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.userLoggedIn = false;
        vm.userLoginActive = false;
        vm.activateUserLogin = activateUserLogin;
        vm.deactivateUserLogin = deactivateUserLogin;
        vm.userGreetingMessage = 'Hello, User';
        vm.userLogin = userLogin;
        vm.loginError = false;
        vm.loginErrorMessage = '';
        vm.userLogout = userLogout;
        vm.linkShareCollapse = false;
        vm.toggleLinkShareState = toggleLinkShareState;
        vm.toggleToRecentPosts = toggleToRecentPosts;
        vm.toggleToRecentShares = toggleToRecentShares;
        vm.navigateToUserHub = navigateToUserHub;

        function navigateToUserHub() {
            $state.go('userhub', {
                id: vm.user.uuid
            });
        }

        function toggleToRecentPosts() {
            vm.linkshareCollapse = false;
            vm.linkSharesClass = 'landingRecentlySharedLinksCollapsed' + vm.monthSelect;
            vm.postSharesClass = 'landingRecentlySharedPostsUncollapsed' + vm.monthSelect;
            vm.recentShareTabClass = 'tabInactive' + vm.monthSelect;
            vm.recentPostsTabClass = 'tabActive' + vm.monthSelect;
        }

        function toggleToRecentShares() {
            vm.linkshareCollapse = true;
            vm.linkSharesClass = 'landingRecentlySharedPostsUncollapsed' + vm.monthSelect;
            vm.postSharesClass = 'landingRecentlySharedLinksCollapsed' + vm.monthSelect;
            vm.recentShareTabClass = 'tabActive' + vm.monthSelect;
            vm.recentPostsTabClass = 'tabInactive' + vm.monthSelect;
        }

        function toggleLinkShareState() {
            if (vm.linkShareCollapse) {
                vm.linkShareCollapse = false;
                vm.linkSharesClass = 'landingRecentlySharedLinksCollapsed' + vm.monthSelect;
                vm.postSharesClass = 'landingRecentlySharedPostsUncollapsed' + vm.monthSelect;
            } else {
                vm.linkShareCollapse = true;
                vm.linkSharesClass = 'landingRecentlySharedLinksUncollapsed' + vm.monthSelect;
                vm.postSharesClass = 'landingRecentlySharedPostsCollapsed' + vm.monthSelect;
            }
        }

        function userLogout() {
            $http.post('/users/logout', {})
                .then(resultData => {
                    let result = resultData.data;
                    if (result.session === 'cleared') {
                        let storage = window.localStorage;
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                    }
                });
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

        function userLogin() {
            let passwordArray = [];
            let userEmail = document.getElementById('landingLoginEmailField').value;
            let userPassword = document.getElementById('landingLoginPasswordField').value;

            if (userEmail === '') {
                vm.loginError = true;
                vm.loginErrorMessage = 'Please enter email';
                return;
            }
            if (userEmail.indexOf('@') === -1) {
                vm.loginError = true;
                vm.loginErrorMessage = 'Please enter valid email';
                return;
            }
            if (userPassword === '') {
                vm.loginError = true;
                vm.loginErrorMessage = 'Please enter password';
            }
            vm.loginErrorMessage = '';
            $http.get(`/users/prelogin/${userEmail}/${vm.ip}`)
                .then(encryptionData => {
                    let encryption = encryptionData.data;
                    if ((encryption.key === null) || (encryption.value === null) || (encryption.inversion === null) || (encryption.onetime_key === null) || (encryption.salt === null)) {
                        vm.loginError = true;
                        vm.loginErrorMessage = 'Login error';
                        return;
                    }
                    let passwordArray = ecryptionArray(userPassword, encryption);
                    let loginObj = {
                        email: userEmail,
                        password: passwordArray
                    }

                    $http.post('/users/login', loginObj)
                        .then(responseData => {
                            let response = responseData.data;
                            console.log(response);
                            if ((response.uuid === null) && (response.login === 'forbidden')) {
                                vm.loginError = true;
                                vm.loginErrorMessage = 'Login error';
                            } else {
                                vm.user = response;
                                setLoginState();
                                deactivateUserLogin();
                                vm.userLoggedIn = true;
                                setGreetingMessage();
                                navigateToUserHub();
                            }
                        });
                });
        }

        function setGreetingMessage() {
            let greetingsArray = ['Hello', 'Hallo', 'Hola', 'Szia', 'こんにちは', 'Merhaba', '你好', '여보세요', 'dzień', 'Привет', 'Hej', 'Sawubona', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'Hello', 'העלא', 'नमस्ते', 'שלום', 'σας', 'Kamusta', 'Hei', 'Hallo', 'Halo', 'Kaixo', 'გამარჯობა', 'xin chào', 'aloha', 'Hiha', 'Bonjou', 'Bonjour', 'Hej', 'добры дзень', 'Ahoj', 'Ola', 'Dia dhuit', 'Ciao', 'slav', 'ສະບາຍດີ', 'Salve', 'Bongu', 'Сайн уу', 'नमस्ते', 'سلام', 'Olá', 'Salut', 'talofa', 'Hello', 'Здраво', 'สวัสดี', 'Здрастуйте', 'Sawubona'];

            vm.userGreetingMessage = greetingsArray[Math.floor(Math.random() * (greetingsArray.length))] + ', ' + vm.user.first_name;
        }

        function deactivateUserLogin() {
            vm.userLoginActive = false;
            vm.landingLoginBoxClass = 'landingLoginInactive' + vm.monthSelect;
            vm.loginError = false;
            document.getElementById('landingLoginEmailField').value = '';
            document.getElementById('landingLoginPasswordField').value = '';
        }

        function activateUserLogin() {
            vm.userLoginActive = true;
            vm.landingLoginBoxClass = 'landingLoginActive' + vm.monthSelect;
            document.getElementById('landingLoginEmailField').focus();
            document.getElementById('landingLoginEmailField').value = '';
            document.getElementById('landingLoginPasswordField').value = '';
        }

        function setFooterMessage() {
            let today = new Date();
            if (today.getFullYear() > 2019) {
                vm.footerMessage = '©2019 - ' + today.getFullYear() + ' HurdAudio';
            } else {
                vm.footerMessage = '©2019 HurdAudio'
            }
        }

        function setUserIPAddress() {
            $http.get('/ipaddress')
                .then(responseData => {
                    vm.ip = responseData.data.ip;
                });
        }

        function clearCookiesAndStorage() {
            let storage = window.localStorage;
            storage.removeItem('habitualOffender');
            storage.removeItem('habitualRelease');
            document.cookie = "habitualOffender=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "habitualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }

        function checkLoginStatus() {
            let storage = window.localStorage;
            let now = new Date();

            if ((!storage.getItem('habitualOffender')) || (getCookie('habitualOffender') === null)) {
                vm.user = null;
                vm.userLoggedIn = false;
                return;
            }

            if (storage.getItem('habitualOffender') !== getCookie('habitualOffender')) {
                vm.user = null;
                vm.userLoggedIn = false;
                clearCookiesAndStorage();
                return;
            }

            $http.get(`/users/${storage.getItem('habitualOffender')}`)
                .then(userData => {
                    vm.user = userData.data;

                    if ((!storage.getItem('habitualRelease')) || (getCookie('habitualRelease') === null)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        return;
                    }

                    if ((storage.getItem('habitualRelease')) !== getCookie('habitualRelease')) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        return;
                    }

                    let expiration = new Date(storage.getItem('habitualRelease'));
                    if (now.getTime() > expiration.getTime()) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        return;
                    }

                    if ((!storage.getItem(vm.user.security.key)) || (getCookie(vm.user.security.key) === null)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        return;
                    }

                    if ((storage.getItem(vm.user.security.key) !== getCookie(vm.user.security.key)) || (storage.getItem(vm.user.security.key) !== vm.user.security.value) || (getCookie(vm.user.security.key) !== vm.user.security.value)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        return;
                    }
                    vm.userLoggedIn = true;
                    setGreetingMessage();
                    navigateToUserHub();
                });

        }

        function setSkin() {
            $http.get('/skins/landing')
                .then(skinData => {
                    let skin = skinData.data;
                    vm.monthSelect = skin.landing;
                    vm.landingLoginBoxClass = 'landingLoginInactive' + vm.monthSelect;
                    vm.linkSharesClass = 'landingRecentlySharedLinksUncollapsed' + vm.monthSelect;
                    vm.postSharesClass = 'landingRecentlySharedPostsCollapsed' + vm.monthSelect;
                    vm.recentShareTabClass = 'tabActive' + vm.monthSelect;
                    vm.recentPostsTabClass = 'tabInactive' + vm.monthSelect;
                    switch (vm.monthSelect) {
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
                        default:
                            alert('UNSUPPORTED MONTH SELECT for LOGO');
                    }
                    setTimeout(() => {
                        document.getElementById('fullLandingContainer').setAttribute("style", "opacity: 1; transition: all 0.3s linear;");
                    }, 300);

                });
        }

        function onInit() {
            console.log("Landing is lit");

            setSkin();
            setUserIPAddress();
            setFooterMessage();
            checkLoginStatus();

        }

    }

}());
