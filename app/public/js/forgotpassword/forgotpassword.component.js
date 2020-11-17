(function () {
    'use strict';

    angular.module('app')
        .component('forgotpassword', {
            controller: ForgotPasswordController,
            templateUrl: '/js/forgotpassword/forgotpassword.template.html'
        });

    ForgotPasswordController.$inject = ['$http', '$state', '$stateParams'];

    function ForgotPasswordController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.navigateToLanding = navigateToLanding;
        vm.userInputCompleted = false;
        vm.updateEmailValue = updateEmailValue;
        vm.userEmail = '';
        vm.submitEmail = submitEmail;
        
        function navigateToLanding() {
            $state.go('landing');
        }
        
        function submitEmail() {
            if (vm.userEmail.length === 0) {
                return;
            }
            if ((vm.userEmail.indexOf('@') === -1) || (vm.userEmail.indexOf('.') === -1)) {
                return;
            }
            vm.userInputCompleted = true;
        }
        
        function updateEmailValue() {
            vm.userEmail = document.getElementById('forgotPasswordEmailInput').value;
            console.log(vm.userEmail);
        }
        
        
        function setSkin() {
            
            vm.forgotPasswordMonth = '_JanuaryB';
            vm.forgotPasswordContainer = 'forgotPassword_Active' + vm.forgotPasswordMonth;
            
            switch (vm.forgotPasswordMonth) {
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

        }

        function onInit() {
            console.log("Forgot Password is lit");

            setSkin();
        }

    }

}());
