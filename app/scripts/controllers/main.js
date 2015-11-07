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

      if($scope.isPlay) {
        setTimeout(function(){
          $rootScope.$broadcast('play', null);
        }, 1000);
      }
    });

    $scope.$on('next', function (event) {
      move($scope.currentBoard, true);
    });
    $scope.$on('play', function (event) {
      move($scope.currentBoard, true);
    });
    $scope.$on('back', function (event) {
      move($scope.currentBoard, false);
    });
    $scope.$on('add-comment', function (event, comment) {
      $scope.currentBoard.comment = comment;
      displayComment($scope.currentBoard);
    });

    $scope.next = function(){
      $scope.isPlay = false;
      $rootScope.$broadcast('next', null);
    };
    $scope.play = function(){
      $scope.isPlay = !$scope.isPlay;
      if($scope.isPlay) {
        $rootScope.$broadcast('play', null);
      } else {
        renderBoard($scope.currentBoard);
      }
    };
    $scope.back = function(){
      $scope.isPlay = false;
      $rootScope.$broadcast('back', null);
    };

    $scope.changeBoard = function(board){
      $scope.isPlay = false;
      displayComment(board);
      renderBoard(board);
    };

    function move(currentBoard, isMoveForward) {
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

    function displayComment(board) {
      $('.notifications').empty();

      if (board.comment) {
        $("#commentBox").val(board.comment);

        $('.notifications').notify({
          message: { text: board.comment }
        }).show();

        var destPosition = $("#" + board.destination).position();
        if (destPosition) {
          $('.notifications').css('top', destPosition.top + 'px');
          $('.notifications').css('left', (destPosition.left + 80) + 'px');
        }
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
      autoFocusOnGameInfo(board.turn);
    }

    function autoFocusOnGameInfo (turnNumber){
      var dynamicId = 'rowFocus'+turnNumber;
      if(dynamicId=== 'rowFocus0'){
        return;
      }else{
         var intendedRow = document.getElementById(dynamicId);
         intendedRow.scrollIntoView(false);
      }
    }

    function forceScreenRender(){
      if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
      }
    }
  });
