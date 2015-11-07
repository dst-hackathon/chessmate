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

    $scope.$on('animation-completed', function (event,isMoveForward,isPlay) {
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

      if(isPlay) {
        setTimeout(function(){
          $rootScope.$broadcast('play', null);
        }, 1000);
      }
    });

    $scope.$on('next', function (event) {
      move($scope.currentBoard, true, null);
    });
    $scope.$on('play', function (event) {
      move($scope.currentBoard, true, true);
    });
    $scope.$on('back', function (event) {
      move($scope.currentBoard, false, null);
    });
    $scope.$on('add-comment', function (event, comment) {
      $scope.currentBoard.comment = comment;
    });

    $scope.next = function(){
      $rootScope.$broadcast('next', null);
    };
    $scope.play = function(){
      $rootScope.$broadcast('play', null);
    };
    $scope.back = function(){
      $rootScope.$broadcast('back', null);
    };

    $scope.changeBoard = function(board){
      displayComment(board);
      renderBoard(board);
    };

    function move(currentBoard, isMoveForward, isPlay) {
      var source = null;
      var destination = null;

      if(isMoveForward){
        currentBoard = currentBoard.next($scope.game);
        source = currentBoard.source;
        destination = currentBoard.destination;
        displayComment(currentBoard);
      }else{
        source = currentBoard.destination;
        destination = currentBoard.source;
        displayComment(currentBoard.previous($scope.game));
      }

      var desinationPosition = $("#" + destination).position();
      var sourcePosition = $("#" + source).position();

      var piece = $("#" + source).children();

      var destinationClass = buildCss(desinationPosition.left - sourcePosition.left, desinationPosition.top - sourcePosition.top);

      //remove highlight
      $('.piece').removeClass('highlight');
      $('.piece').removeClass('destination');

      setTimeout(function(){
        // move
        $(".board div").addClass("divTransition");
        piece.css(destinationClass);
      }, 100);

      var currentTurn = currentBoard.turn;
      $scope.interval = setInterval(function(){
        if($scope.currentBoard.turn == currentTurn){
          $rootScope.$broadcast('animation-completed', isMoveForward, isPlay);
        }
      },1500);

      $(piece).on("webkitTransitionEnd otransitionEnd oTransitionEnd msTransitionEnd transitionEnd",function(event) {
        $rootScope.$broadcast('animation-completed', isMoveForward, isPlay);
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

    function displayComment(board) {
      if (board.comment != undefined) {
        $("#commentBox").val(board.comment);
      } else {
        $("#commentBox").val("");
      }
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
