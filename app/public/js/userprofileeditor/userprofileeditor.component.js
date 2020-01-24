(function() {
  'use strict';

  angular.module('app')
    .component('userprofileeditor', {
      controller: UserProfileEditorController,
      templateUrl: '/js/userprofileeditor/userprofileeditor.template.html'
    });

    UserProfileEditorController.$inject = ['$http', '$state', '$stateParams'];

    function UserProfileEditorController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      


      function onInit() {
        console.log("User Profile Editor is lit");
        

      }

    }

}());
