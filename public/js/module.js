'use strict';

var app = angular.module('myApp', ['ui.router','ui.bootstrap']);

// localStorage.ngProductsList = [{'name': 'andy'}, {'yo': 'dd'}];
// console.log('ddd: ', JSON.parse(localStorage.ngProductsList));

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html',
            controller: 'homeCtrl'
        })
        .state('community', {
            url: '/community',
            templateUrl: '../views/community.html',
            controller: 'communityCtrl'
        })
        .state('profileSetting', {
            url: '/profileSetting',
            templateUrl: '../views/profileSetting.html',
            controller: 'profileSettingCtrl'
        })
        .state('profile', {
            url: '/profile/:userId',
            templateUrl: '../views/profile.html',
            controller: 'profileCtrl'
        })
        .state('wall', {
            url: '/wall',
            templateUrl: '../views/wall.html',
            controller: 'wallCtrl'
        })
        .state('item', {
            url: '/item:id',
            templateUrl: '../views/item.html',
            controller: 'itemCtrl'
        })

    $urlRouterProvider.otherwise('home');

});
