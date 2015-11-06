'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.board = new Board();

    function Board (){
      return {
        'a1':'',
        'a2':'',
        'a3':'',
        'a4':'',
        'a5':'',
        'a6':'',
        'a7':'',
        'a8':''
      }
    }

  });
