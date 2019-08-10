(function() {
  'use strict';

  angular.module('app')
    .component('userhub', {
      controller: UserHubController,
      templateUrl: '/js/userhub/userhub.template.html'
    });

    UserHubController.$inject = ['$http', '$state', '$stateParams'];

    function UserHubController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;

      function navigateToLanding() {
        $state.go('landing');
      }

      function clearCookiesAndStorage() {
        let storage = window.localStorage;
        storage.removeItem('habitualOffender');
        storage.removeItem('habitualRelease');
        document.cookie = "habitualOffender=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "habitualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      function getCookie (name) {
        var cookies = document.cookie.split(';');
        for(var i=0 ; i < cookies.length ; ++i) {
          var pair = cookies[i].trim().split('=');
          if(pair[0] === name) {
            return (pair[1]);
          }
        }
        return null;
      }

      function setUserIPAddress() {
        $http.get('/ipaddress')
        .then(responseData => {
          vm.ip = responseData.data.ip;
          checkLoginStatus($stateParams.id);
        });
      }

      function resetSecuritySettings() {
        let oldKey = vm.user.security.key;
        let oldValue = vm.user.security.value;
        let oldExpiration = vm.user.security.expire;

        let storage = window.localStorage;
        let now = new Date();

        $http.post(`/users/resetsecurity`, {uuid: vm.user.uuid, ip: vm.ip})
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


      function onInit() {
        console.log("User Hub is lit");
        console.log($stateParams.id);
        setUserIPAddress();

      }

    }

}());
