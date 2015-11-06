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

      game.boards.push($scope.buildBoard(game.boards[0], "RA1-A2", "white"));

      $rootScope.$broadcast('game-updated', game);
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
    };

    $scope.buildBoard = function(currentBoard, move, color) {
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

    $scope.buildPiece = function(char, color) {
      var piece = {
        type: $scope.getType(char),
        color: color
      };

      piece.value = buildValue(piece);

      return piece;
    };

    var buildValue = function (piece) {
      var map = Immutable.Map({
        "rookwhite": "&#9823;",
        "rookblack": "&#9820;"
      });
      var key = piece.type + piece.color;
      return map.get(key);
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
