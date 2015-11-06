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

    var game = null;
    $scope.$on('game-updated', function (event, game) {
      console.log(game);
      this.game = game;
      $scope.currentBoard = game.boards[0];
    });

    $scope.$on('next', function (event) {
      var nextBoard = $scope.currentBoard.turn + 1;
      $scope.currentBoard = game.boards[nextBoard];
    });

    $scope.move = function(source, destination) {
      var piece = $("#" + source).children();
      var desinationPosition = $("#" + destination).position();
      var sourcePosition = $("#" + source).position();
      var destinationClass = buildCss(desinationPosition.left - sourcePosition.left, desinationPosition.top - sourcePosition.top);
      piece.css(destinationClass);

      // TODO fire this event when move complete
      //$rootScope.$broadcast('next', null);
    };

    function buildCss(positionX, positionY) {
      var transform = "translate(" + positionX + "px, " + positionY + "px)";
      var cssStyle = { "-webkit-transform": transform,
        "-moz-transform": transform,
        "-o-transform": transform,
        "-ms-transform": transform,
        "transform": transform};
      return cssStyle;
    }
  });
