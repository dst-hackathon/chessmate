'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:NotationCtrl
 * @description
 * # NotationCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('NotationCtrl', function ($scope) {
    $scope.buildGame = function(notation) {
      var game = {
        "boards": [this.buildInitialBoard()]
      };

      return game;
    };

    buildInitialBoard = function() {
      var board = {
        "turn": 0,
        "source": undefined,
        "destination": undefined,
        "position": {
          "A1": this.buildPiece('R', "white"),
          "B1": this.buildPiece('N', "white"),
          "C1": this.buildPiece('B', "white"),
          "D1": this.buildPiece('K', "white"),
          "E1": this.buildPiece('Q', "white"),
          "F1": this.buildPiece('B', "white"),
          "G1": this.buildPiece('N', "white"),
          "H1": this.buildPiece('R', "white"),
          "A3": this.buildPiece('B', "white"),
          "B3": this.buildPiece('B', "white"),
          "C3": this.buildPiece('B', "white"),
          "D3": this.buildPiece('B', "white"),
          "E3": this.buildPiece('B', "white"),
          "F3": this.buildPiece('B', "white"),
          "G3": this.buildPiece('B', "white"),
          "H3": this.buildPiece('B', "white"),
          "A6": this.buildPiece('B', "black"),
          "B6": this.buildPiece('B', "black"),
          "C6": this.buildPiece('B', "black"),
          "D6": this.buildPiece('B', "black"),
          "E6": this.buildPiece('B', "black"),
          "F6": this.buildPiece('B', "black"),
          "G6": this.buildPiece('B', "black"),
          "H6": this.buildPiece('B', "black"),
          "A8": this.buildPiece('R', "black"),
          "B8": this.buildPiece('N', "black"),
          "C8": this.buildPiece('B', "black"),
          "D8": this.buildPiece('K', "black"),
          "E8": this.buildPiece('Q', "black"),
          "F8": this.buildPiece('B', "black"),
          "G8": this.buildPiece('N', "black"),
          "H8": this.buildPiece('R', "black")
        }
      };

      return board;
    }

    buildBoard = function(currentBoard, move) {
      var board = currentBoard;

      return board;
    };

    buildPiece = function(char, color) {
      var piece = {
        type: this.getType(char),
        color: color
      };

      return piece;
    };

    getType = function(char) {
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
