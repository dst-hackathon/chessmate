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

      renderBoard($scope.game.boards[0]);
    });

    $scope.$on('animation-completed', function (event,isMoveForward) {
      if($scope.interval){
        clearInterval($scope.interval);
      }

      var nextBoard = null;
      if(isMoveForward){
        nextBoard = $scope.currentBoard.next($scope.game);
      }else{
        nextBoard = $scope.currentBoard.previous($scope.game);
      }

      renderBoard(nextBoard);
    });

    $scope.$on('next', function (event) {
      move($scope.currentBoard, true);
    });
    $scope.$on('back', function (event) {
      move($scope.currentBoard, false);
    });

    $scope.next = function(){
      $rootScope.$broadcast('next', null);
    };
    $scope.back = function(){
      $rootScope.$broadcast('back', null);
    };

    $scope.changeBoard = function(board){
      renderBoard(board);
    };

    function move(currentBoard, isMoveForward) {
      var source = null;
      var destination = null;

      if(isMoveForward){
        currentBoard = currentBoard.next($scope.game);
        source = currentBoard.source;
        destination = currentBoard.destination;
      }else{
        source = currentBoard.destination;
        destination = currentBoard.source;
      }

      var desinationPosition = $("#" + destination).position();
      var sourcePosition = $("#" + source).position();
      var piece = $("#" + source).children();

      var destinationClass = buildCss(desinationPosition.left - sourcePosition.left, desinationPosition.top - sourcePosition.top);
      piece.css(destinationClass);

      var currentTurn = currentBoard.turn;
      $scope.interval = setInterval(function(){
        if($scope.currentBoard.turn == currentTurn){
          $rootScope.$broadcast('animation-completed', isMoveForward);
        }
      },1500);

      $(piece).on("webkitTransitionEnd otransitionEnd oTransitionEnd msTransitionEnd transitionEnd",function(event) {
        $rootScope.$broadcast('animation-completed', isMoveForward);
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

    function renderBoard(board) {
      // unbind all rows
      $scope.game.rows = [];
      forceScreenRender();

      // rebind all rows
      $scope.currentBoard = board;
      $scope.game.rows = [8, 7, 6, 5, 4, 3, 2, 1];
      forceScreenRender();
    }

    function forceScreenRender(){
      if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
      }
    }
  });
