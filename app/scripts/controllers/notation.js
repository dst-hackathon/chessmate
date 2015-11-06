'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:NotationCtrl
 * @description
 * # NotationCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('NotationCtrl', function ($scope, $rootScope) {
    $scope.buildGame = function (notation) {

      var game = {
        "boards": [$scope.buildInitialBoard()]
      };

      $scope.generateBoardFromNotation(game.boards, notation);

      $rootScope.$broadcast('game-updated', game);
    };

    $scope.buildInitialBoard = function () {
      var board = {
        "turn": 0,
        "source": undefined,
        "destination": undefined,
        "position": {
          "A1": $scope.buildPiece('R', "white"),
          "B1": $scope.buildPiece('N', "white"),
          "C1": $scope.buildPiece('C', "white"),
          "D1": $scope.buildPiece('K', "white"),
          "E1": $scope.buildPiece('M', "white"),
          "F1": $scope.buildPiece('C', "white"),
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
          "C8": $scope.buildPiece('C', "black"),
          "D8": $scope.buildPiece('M', "black"),
          "E8": $scope.buildPiece('K', "black"),
          "F8": $scope.buildPiece('C', "black"),
          "G8": $scope.buildPiece('N', "black"),
          "H8": $scope.buildPiece('R', "black")
        }
      };

      return board;
    };

    $scope.generateBoardFromNotation = function (boardsArray, notation) {

            //extract header and moves out of notation string
            var header = notation.substring(0,notation.lastIndexOf("]"));
            //do something with header

      var moves = $scope.getMoves(notation);

      //while still have moves
      var dotPos;
      while ((dotPos = moves.indexOf(".")) != -1) {
        //find first 6 and send with white colour
        var whiteMove = moves.substring(dotPos + 1, dotPos + 7);
        boardsArray.push($scope.buildBoard(boardsArray[boardsArray.length - 1], whiteMove, 'white'));
        //find last 6 and send with black colour
        var blackMove = moves.substring(dotPos + 8, dotPos + 14);
        boardsArray.push($scope.buildBoard(boardsArray[boardsArray.length - 1], blackMove, 'black'));

        moves = moves.substring(dotPos + 14);
      }
    };

    $scope.getMoves = function (notation) {
      var lastIndexOfBracket = notation.lastIndexOf("]");
      return notation.substring(lastIndexOfBracket + 1);
    };
    $scope.buildBoard = function (currentBoard, move, color) {
      var board = angular.copy(currentBoard);
      var char = move.substring(0, 1);
      var source = move.substring(1, 3);
      var destination = move.substring(4, 6);

      board.turn = currentBoard.turn + 1;
      board.source = source;
      board.destination = destination;
      board.position[destination] = $scope.buildPiece(char, color);
      delete board.position[source];

      return board;
    };

    $scope.buildPiece = function (char, color) {
      var piece = {
        type: $scope.getType(char),
        color: color
      };

      piece.value = buildValue(piece);

      return piece;
    };

    $scope.getType = function (char) {
      var type;

      if (char == 'B') {
        type = "pawn";
      } else if (char == 'R') {
        type = "rook";
      } else if (char == 'N') {
        type = "knight";
      } else if (char == 'C') {
        type = "bishop";
      } else if (char == 'K') {
        type = "king";
      } else if (char == 'M') {
        type = "queen";
      }

      return type;
    };

    var buildValue = function (piece) {
      var map = Immutable.Map({
        "rook-black": "&#9820;",
        "knight-black": "&#9822;",
        "bishop-black": "&#9821;",
        "king-black": "&#9819;",
        "queen-black": "&#9818;",
        "pawn-black": "&#9823;",

        "rook-white": "&#9814;",
        "knight-white": "&#9816;",
        "bishop-white": "&#9815;",
        "king-white": "&#9813;",
        "queen-white": "&#9812;",
        "pawn-white": "&#9817;"
      });
      var key = piece.type + "-" + piece.color;
      return map.get(key);
    };

    $scope.notationString = "[White AMA][Black 500miles] [Tournament Thai Chess League][Date -1-0] [Result 1/2-1/2]" +
      "1.BF3-F4 BC6-C5 2.NG1-F3 BD6-D5 3.BE3-E4 NB8-C6 4.ME1-F2 MD8-C7 5.MF2-E3 MC7-D6 6.CC1-C2 CF8-F7 7.NB1-D2 NG8-E7 8.BH3-H4 BH6-H5 9.CF1-F2 BA6-A5 10.KD1-E2 CC8-C7";

  });
