'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('GameController', function ($scope,$rootScope,GameService) {

    $scope.games = GameService.notation;
    $scope.save = GameService.save;

    $scope.select = function (notation) {
      $rootScope.$broadcast('build-game', notation);
    };
  });
