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
      move(currentBoard, true);
    });
    $scope.$on('back', function (event) {
      var nextBoard = $scope.currentBoard.turn - 1;
      var currentBoard = $scope.game.boards[nextBoard];
      move(currentBoard, false);
    });

    $scope.next = function(){
      $rootScope.$broadcast('next', null);
    };
    $scope.back = function(){
      $rootScope.$broadcast('back', null);
    };

    function move(currentBoard, isMoveForward) {
      var source = isMoveForward ? currentBoard.source : currentBoard.destination;
      var destination = isMoveForward ? currentBoard.destination : currentBoard.source;

      var piece = $("#" + source).children();
      var desinationPosition = $("#" + destination).position();
      var sourcePosition = $("#" + source).position();
      var destinationClass = buildCss(desinationPosition.left - sourcePosition.left, desinationPosition.top - sourcePosition.top);
      piece.css(destinationClass);

      // TODO fire this event when move complete
      $(piece).on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          piece.removeAttr("style");
          $("#" + destination).html(piece);
          $scope.currentBoard = currentBoard;
          //$(piece).off();
          $rootScope.$broadcast('next', null);
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
  });
