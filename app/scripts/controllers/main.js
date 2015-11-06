'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('MainCtrl', function ($scope,$rootScope) {

    $scope.game = null;
    $scope.$on('game-updated', function (event, game) {
      console.log(game);
      $scope.game = game;
      $scope.currentBoard = game.boards[0];
    });

    $scope.$on('next', function (event) {
      var nextBoard = $scope.currentBoard.turn + 1;
      var currentBoard = $scope.game.boards[nextBoard];
      move(currentBoard);
    });
    $scope.$on('back', function (event) {
      var nextBoard = $scope.currentBoard.turn - 1;
      $scope.currentBoard = $scope.game.boards[nextBoard];
    });

    $scope.next = function(){
      $rootScope.$broadcast('next', null);
    };
    $scope.back = function(){
      $rootScope.$broadcast('back', null);
    };

    function move(currentBoard) {
      var source = currentBoard.source;
      var destination = currentBoard.destination;

      var piece = $("#" + source).children();
      var desinationPosition = $("#" + destination).position();
      var sourcePosition = $("#" + source).position();
      var destinationClass = buildCss(desinationPosition.left - sourcePosition.left, desinationPosition.top - sourcePosition.top);
      piece.css(destinationClass);

      // TODO fire this event when move complete
      $(piece).on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          $scope.currentBoard = currentBoard;
        });
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

    $("body").bind('transitionend', function(e){
      // TODO fire this event when move complete
      $rootScope.$broadcast('next', null);
    });

  });
