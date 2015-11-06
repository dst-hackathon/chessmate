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

    $scope.$on('game-updated', function (event, game) {
      console.log(game);
      $scope.currentBoard = game.boards[0];
    });

    function mockBoard(){
      return {
        "turn" : 0,
        "position" : {
          "A8": {
            "type": "king",
            "value" : "&#9820;",
            "color": "white"
          },
          "A2": {}
        },
        "source": "A3",
        "destination": "A4"
      };
    }
  });
