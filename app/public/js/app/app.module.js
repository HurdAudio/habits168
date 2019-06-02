(function() {
  'use strict';

  angular.module("app", ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self','https://bandcamp.com/**', 'http://bandcamp.com/**']);
    });

}());
