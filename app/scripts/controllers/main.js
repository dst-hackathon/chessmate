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
    var isPlay;
    var isForward = true;
    var isSwitch = false;
    var interval;

    $scope.$on('game-updated', function (event, game) {
      console.log(game);
      $scope.game = game;

      renderBoard($scope.game.boards[0]);

      $('.piece').one("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionEnd",
        function(event) {
          var piece = $(event.currentTarget);
          clearPiece(piece);
        });
      //$scope.$on('animation-completed', function (event, piece) {
      //  var nextBoard = null;
      //  if(isMoveForward){
      //    nextBoard = $scope.currentBoard.next($scope.game);
      //  }else{
      //    nextBoard = $scope.currentBoard.previous($scope.game);
      //  }
      //
      //  renderBoard(nextBoard);
      //});
    });

    $scope.$on('next', function (event) {
      var nextBoard = $scope.currentBoard.next($scope.game);
      move(updateBoard());
    });
    $scope.$on('play', function (event) {
      move(updateBoard());
    });
    $scope.$on('back', function (event) {
      var nextBoard = $scope.currentBoard.previous($scope.game);
      move(updateBoard());
    });

    $scope.next = function(){
      isPlay = false;
      isSwitch = !isForward;
      isForward = true;
      $rootScope.$broadcast('next', null);
    };
    $scope.play = function(){
      isPlay = true;
      isForward = true;
      $rootScope.$broadcast('play', null);
    };
    $scope.back = function(){
      isPlay = false;
      isSwitch = isForward;
      isForward = false;
      $rootScope.$broadcast('back', null);
    };

    function updateBoard() {
      if(isSwitch) {
        return $scope.currentBoard.switch($scope.game);
      } else {
        if(isForward) {
          return $scope.currentBoard.next($scope.game);
        } else {
          return $scope.currentBoard.previous($scope.game);
        }
      }
    }
    $scope.changeBoard = function(board){
      renderBoard(board);
    };

    function move(currentBoard) {
      var source = currentBoard.source;
      var destination = currentBoard.destination;
      var desinationPosition = $("#" + destination).position();
      var sourcePosition = $("#" + source).position();

      var piece;
      var destinationClass;

      if(isForward) {
        piece = $("#" + source).children();
        destinationClass = buildCss(desinationPosition.left - sourcePosition.left, desinationPosition.top - sourcePosition.top);
      } else {
        piece = $("#" + destination).children();
        destinationClass = buildCss(sourcePosition.left - desinationPosition.left, sourcePosition.top - desinationPosition.top);
      }

      piece.css(destinationClass);

      interval = setInterval(function() {
        var currentBoard = updateBoard();
        if(isForward) {
          if($("#" + currentBoard.source).children().text() != "") {
            clearPiece(piece);
          }
        } else {
          if($("#" + currentBoard.destination).children().text() != "") {
            clearPiece(piece);
          }
        }
      },1500);

      console.log("--------------- Move ----------------");
      console.log("source:" + source);
      console.log("destination:" + destination);

      //$(piece).on("webkitTransitionEnd otransitionEnd oTransitionEnd msTransitionEnd transitionEnd",function(event) {
      //  $rootScope.$broadcast('animation-completed', true);
      //});
      //$("#chess_board td").removeClass('highlight');
      //$("#" + destination).addClass('highlight');
      //$("#" + source).addClass('highlight');
    }

    function buildCss(positionX, positionY) {
      var transition = "translate(" + positionX + "px, " + positionY + "px)";
      var cssStyle = { "-webkit-transform": transition,
        "-moz-transform": transition,
        "-ms-transform": transition,
        "-o-transform": transition,
        "transition": transition};
      return cssStyle;
    }

    function clearPiece(currentPiece) {
      var currentBoard = updateBoard();

      var piece = currentPiece;
      if(isForward) {
        $("#" + currentBoard.destination).children().text(piece.text());
        $("#" + currentBoard.source).children().text("");
      } else {
        $("#" + currentBoard.source).children().text(piece.text());
        $("#" + currentBoard.destination).children().text("");
      }

      piece.removeAttr("style");

      console.log("--------------- Transition End ----------------");
      console.log("source:" + currentBoard.source);
      console.log("source text:" +  $("#" + currentBoard.source).children().text());
      console.log("destination:" + currentBoard.destination);
      console.log("destination text:" + $("#" + currentBoard.destination).children().text());

      if(interval) {
        clearInterval(interval);
      }
      $scope.currentBoard = currentBoard;

      if(isPlay) {
        $rootScope.$broadcast('play', null);
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
