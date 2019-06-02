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

      }

    }

}());
