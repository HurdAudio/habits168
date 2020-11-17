(function () {
    'use strict';

    angular.module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state({
                name: 'app',
                abstract: true,
                component: 'app',
            })
            .state({
                name: 'landing',
                url: '/',
                parent: 'app',
                component: 'landing'
            })
            .state({
                name: 'viewtester',
                url: '/viewtester',
                parent: 'app',
                component: 'viewtester'
            })
            .state({
                name: 'playertester',
                url: '/playertester',
                parent: 'app',
                component: 'playertester'
            })
            .state({
                name: 'userhub',
                url: '/userhub/:id',
                parent: 'app',
                component: 'userhub'
            })
            .state({
                name: 'monday',
                url: '/monday/:userUuid',
                parent: 'app',
                component: 'monday'
            })
            .state({
                name: 'externals',
                url: '/externals/:userUuid',
                parent: 'app',
                component: 'externals'
            })
            .state({
                name: 'dailies',
                url: '/dailies/:userUuid',
                parent: 'app',
                component: 'dailies'
            })
            .state({
                name: 'userprofileeditor',
                url: '/userprofileeditor/:userUuid',
                parent: 'app',
                component: 'userprofileeditor'
            })
            .state({
                name: 'tuesday',
                url: '/tuesday/:userUuid',
                parent: 'app',
                component: 'tuesday'
            })
            .state({
                name: 'browse',
                url: '/browse/:userUuid',
                parent: 'app',
                component: 'browse'
            })
            .state({
                name: 'newusersignup',
                url: '/newusersignup',
                parent: 'app',
                component: 'newusersignup'
            })
            .state({
                name: 'wednesday',
                url: '/wednesday/:userUuid',
                parent: 'app',
                component: 'wednesday'
            })
            .state({
                name: 'emailconfirm',
                url: '/emailconfirm/:code',
                parent: 'app',
                component: 'emailconfirm'
            })
            .state({
                name: 'thursday',
                url: '/thursday/:userUuid',
                parent: 'app',
                component: 'thursday'
            })
            .state({
                name: 'forgotpassword',
                url: '/forgotpassword',
                parent: 'app',
                component: 'forgotpassword'
            })
            .state({
                name: 'friday',
                url: '/friday/:userUuid',
                parent: 'app',
                component: 'friday'
        });
    }

}());
