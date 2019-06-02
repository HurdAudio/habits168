(function() {
  'use strict';

  angular.module('app')
    .component('landing', {
      controller: LandingController,
      templateUrl: '/js/landing/landing.template.html'
    });

    LandingController.$inject = ['$http', '$state', '$stateParams'];

    function LandingController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.monthSelect = '_JanuaryA';
      vm.userLoggedIn = false;
      vm.userLoginActive = false;
      vm.activateUserLogin = activateUserLogin;
      vm.landingLoginBoxClass = 'landingLoginInactive' + vm.monthSelect;
      vm.deactivateUserLogin = deactivateUserLogin;
      vm.userGreetingMessage = 'Hello, User';

      function setGreetingMessage() {
        let greetingsArray = [ 'Hello', 'Hallo', 'Hola', 'Szia', 'こんにちは', 'Merhaba', '你好', '여보세요', 'dzień', 'Привет', 'Hej', 'Sawubona', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'Hello', 'העלא', 'नमस्ते', 'שלום', 'σας', 'Kamusta', 'Hei', 'Hallo', 'Halo', 'Kaixo', 'გამარჯობა', 'xin chào', 'aloha', 'Hiha', 'Bonjou', 'Bonjour', 'Hej', 'добры дзень', 'Ahoj', 'Ola', 'Dia dhuit', 'Ciao', 'slav', 'ສະບາຍດີ', 'Salve', 'Bongu', 'Сайн уу', 'नमस्ते', 'سلام', 'Olá', 'Salut', 'talofa', 'Hello', 'Здраво', 'สวัสดี', 'Здрастуйте', 'Sawubona' ];

        vm.userGreetingMessage = greetingsArray[Math.floor(Math.random() * (greetingsArray.length))] + ', User';
      }

      function deactivateUserLogin() {
        vm.userLoginActive = false;
        vm.landingLoginBoxClass = 'landingLoginInactive' + vm.monthSelect;
      }

      function activateUserLogin() {
        vm.userLoginActive = true;
        vm.landingLoginBoxClass = 'landingLoginActive' + vm.monthSelect;
        document.getElementById('landingLoginEmailField').focus();
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
        console.log("Landing is lit");
        setFooterMessage();
        setGreetingMessage();

      }

    }

}());
