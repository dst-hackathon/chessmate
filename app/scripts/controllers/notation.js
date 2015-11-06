'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:NotationCtrl
 * @description
 * # NotationCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('NotationCtrl', function ($scope,$rootScope) {
    $scope.buildGame = function(notation) {

      var game = {
        "boards": [$scope.buildInitialBoard()]
      };

      $scope.generateBoardFromNotation(game.boards, notation);

      $rootScope.game = game;
    };

    $scope.buildInitialBoard = function() {
      var board = {
        "turn": 0,
        "source": undefined,
        "destination": undefined,
        "position": {
          "A1": $scope.buildPiece('R', "white"),
          "B1": $scope.buildPiece('N', "white"),
          "C1": $scope.buildPiece('B', "white"),
          "D1": $scope.buildPiece('K', "white"),
          "E1": $scope.buildPiece('Q', "white"),
          "F1": $scope.buildPiece('B', "white"),
          "G1": $scope.buildPiece('N', "white"),
          "H1": $scope.buildPiece('R', "white"),
          "A3": $scope.buildPiece('B', "white"),
          "B3": $scope.buildPiece('B', "white"),
          "C3": $scope.buildPiece('B', "white"),
          "D3": $scope.buildPiece('B', "white"),
          "E3": $scope.buildPiece('B', "white"),
          "F3": $scope.buildPiece('B', "white"),
          "G3": $scope.buildPiece('B', "white"),
          "H3": $scope.buildPiece('B', "white"),
          "A6": $scope.buildPiece('B', "black"),
          "B6": $scope.buildPiece('B', "black"),
          "C6": $scope.buildPiece('B', "black"),
          "D6": $scope.buildPiece('B', "black"),
          "E6": $scope.buildPiece('B', "black"),
          "F6": $scope.buildPiece('B', "black"),
          "G6": $scope.buildPiece('B', "black"),
          "H6": $scope.buildPiece('B', "black"),
          "A8": $scope.buildPiece('R', "black"),
          "B8": $scope.buildPiece('N', "black"),
          "C8": $scope.buildPiece('B', "black"),
          "D8": $scope.buildPiece('K', "black"),
          "E8": $scope.buildPiece('Q', "black"),
          "F8": $scope.buildPiece('B', "black"),
          "G8": $scope.buildPiece('N', "black"),
          "H8": $scope.buildPiece('R', "black")
        }
      };

      return board;
    }

      $scope.generateBoardFromNotation = function(boardsArray,notation){

        //extract header and moves out of notation string
        var header = $scope.getHeader(notation);
        //do something with header

        var moves = $scope.getMoves(notation);

        //while still have moves
        var dotPos;

        while( (dotPos = moves.indexOf(".")) != -1){
          //find first 6 and send with white colour
          var whiteMove = moves.substring(dotPos+1,dotPos+7);
          boardsArray.push($scope.buildBoard, whiteMove, 'white');
          //find last 6 and send with black colour
          var blackMove = moves.substring(dotPos+8,dotPos+14);
          boardsArray.push($scope.buildBoard, whiteMove, 'white');

          moves = moves.substring(dotPos+14);
        }


      };

      $scope.getHeader = function(notation){

      };

      $scope.getMoves = function(notation){
        var lastIndexOfBracket = notation.lastIndexOf("]");
        return  notation.substring(lastIndexOfBracket+1);
      };


      $scope.buildBoard = function(currentBoard, move, colour) {
      var board = currentBoard;

      return board;
    };

    $scope.buildPiece = function(char, color) {
      var piece = {
        type: $scope.getType(char),
        color: color
      };

      return piece;
    };

    $scope.getType = function(char) {
      var type;

      if (char == 'B') {
        type = "pawn";
      } else if (char == 'R') {
        type = "rook";
      } else if (char == 'N') {
        type = "knight";
      } else if (char == 'B') {
        type = "bishop";
      } else if (char == 'K') {
        type = "king";
      } else if (char == 'M') {
        type = "queen";
      }

      return type;
    }
  });
