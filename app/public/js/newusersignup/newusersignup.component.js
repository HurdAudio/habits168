(function () {
    'use strict';

    angular.module('app')
        .component('newusersignup', {
            controller: NewUserSignupController,
            templateUrl: '/js/newusersignup/newusersignup.template.html'
        });

    NewUserSignupController.$inject = ['$http', '$state', '$stateParams'];

    function NewUserSignupController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.signupMonth = '_FebruaryC';
        vm.newUserContainerState = 'newUserContainerActive' + vm.signupMonth;
        vm.navigateToLanding = navigateToLanding;
        vm.newUserErrorMessage = '';
        vm.newUserMessage = '';
        vm.setFirstName = setFirstName;
        vm.newUserFirstName = '';
        vm.setLastName = setLastName;
        vm.newUserLastName = '';
        vm.setEmail = setEmail;
        vm.newUserEmail = '';
        vm.setPassword = setPassword;
        vm.newUserPassword = '';
        vm.setConfirmPassword = setConfirmPassword;
        vm.newUserConfirmPassword = '';
        vm.submitUserDatas = submitUserDatas;
        
        function submitUserDatas() {
            if (vm.newUserLastName.length === 0) {
                vm.newUserErrorMessage = "'last name' field is required.";
                return;
            }
            if (vm.newUserEmail.length === 0) {
                vm.newUserErrorMessage = "'email' field is required.";
                return;
            } else {
                if ((vm.newUserEmail.indexOf('@') === -1) || (vm.newUserEmail.indexOf('.') === -1)) {
                    vm.newUserErrorMessage = vm.newUserEmail + ' is not a valid email address.';
                    return;
                }
            }
            if (vm.newUserPassword.length === 0) {
                vm.newUserErrorMessage = "'password' field is required.";
                return;
            }
            if (vm.newUserConfirmPassword.length === 0) {
                vm.newUserErrorMessage = "'confirm password' field is required.";
                return; 
            }
            if (vm.newUserPassword !== vm.newUserConfirmPassword) {
                vm.newUserErrorMessage = "Password entries do not match.";
                return;
            }
            $http.get('/users')
            .then(allUsersData => {
                const allUsers = allUsersData.data;
                const duplicateUsers = allUsers.filter(entry => {
                    return(entry.email.toLowerCase() === vm.newUserEmail.toLowerCase());
                });
                if (duplicateUsers.length > 0) {
                    vm.newUserErrorMessage = "Account for " + vm.newUserEmail + " already exists.";
                    return;
                }
                $http.post('/users', {
                    email: vm.newUserEmail,
                    first_name: vm.newUserFirstName,
                    last_name: vm.newUserLastName,
                    password: vm.newUserPassword,
                    is_admin: false
                })
                .then(postedUserData => {
                    const postedUser = postedUserData.data[0];
                    $http.post(`/users/newuserconfirm/${postedUser.uuid}`, {});
                    vm.newUserErrorMessage = '';
                    vm.newUserMessage = 'Please confirm email. Mail sent to ' + vm.newUserEmail;
                });
                
            });
            
        }
        
        function setConfirmPassword() {
            vm.newUserConfirmPassword = document.getElementById('newUserTextBoxConfirmPassword').value;
        }
        
        function setPassword() {
            vm.newUserPassword = document.getElementById('newUserTextBoxPassword').value;
        }
        
        function setEmail() {
            vm.newUserEmail = document.getElementById('newUserTextBoxEmail').value;
        }
        
        function setLastName() {
            vm.newUserLastName = document.getElementById('newUserTextBoxLastName').value;
        }
        
        function setFirstName() {
            vm.newUserTextBoxFirstName = document.getElementById('newUserTextBoxFirstName').value;
        }
        
        function navigateToLanding() {
            $state.go('landing');
        }

        function setFooterMessage() {
            let today = new Date();
            if (today.getFullYear() > 2019) {
                vm.footerMessage = '©2019 - ' + today.getFullYear() + ' HurdAudio';
            } else {
                vm.footerMessage = '©2019 HurdAudio'
            }
        }

        function onInit() {
            console.log("New User Signup is lit");
            switch (vm.signupMonth) {
                case ('_JanuaryA'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                    break;
                case ('_JanuaryB'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
                    break;
                case ('_JanuaryC'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                    break;
                case ('_FebruaryA'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_png_by_piccolapersempre_dbuithu-fullview.png';
                    break;
                case ('_FebruaryB'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/digital_painting__liquid_sleep_by_ukulelemoon_d888syz-pre.jpg';
                    break;
                case ('_FebruaryC'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_cup_by_lashonda1980_dazsks6-pre.png';
                    break;
                case ('_MarchA'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/dd749ir-a2fcf5b4-5422-46d6-8d79-8166d3a47633.jpg';
                    break;
                case('_MarchB'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee-32284_1280.png';
                    break;
                case('_MarchC'):
                    vm.newUserLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-4929161_1920.jpg';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }
            

            setFooterMessage();
        }

    }

}());
