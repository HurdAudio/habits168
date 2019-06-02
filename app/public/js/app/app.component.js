(function () {
'use strict';



  angular.module('app')
    .component('app', {
      templateUrl: '/js/app/app.template.html',
      controller: controller
    });


  controller.$inject = ['$http', '$state'];
    function controller($http, $state) {
      const vm = this;

      vm.$onInit = onInit;

      function onInit() {
        console.log('TESTING');

      }
    }

})();
