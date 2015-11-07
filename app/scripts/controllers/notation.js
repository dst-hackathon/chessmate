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

    $scope.upload = function () {
      var f = document.getElementById('file').files[0];

      var r = new FileReader();
      r.onloadend = function(e){
        var text = r.result;
        $scope.buildGame(text);
        //send you binary data via $http or $resource or do anything else with it
      }
      r.readAsText(f, 'UTF-8');

    };

    $scope.buildGame = function (notation) {

      //initial game info array
      $rootScope.gameInfo = [];
      var game = {
        "boards": [$scope.buildInitialBoard()]
      };

      $scope.generateBoardFromNotation(game.boards, notation);
      $rootScope.$broadcast('game-updated', game);
    };

    $scope.addComment = function(comment) {
      $rootScope.$broadcast('add-comment', comment);
    }

    $scope.buildInitialBoard = function () {
      var board = {
        "turn": 0,
        "move": undefined,
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
        },
        next : function (game) {
          var nextBoardIndex = this.turn + 1;
          return game.boards[nextBoardIndex];
        },
        previous : function (game) {
          var nextBoardIndex = this.turn - 1;
          return game.boards[nextBoardIndex];
        }
      };

      return board;
    };

    $scope.generateBoardFromNotation = function (boardsArray, notation) {

      //extract header and moves out of notation string
      var header = notation.substring(0,notation.lastIndexOf("]"));
      //do something with header

      var moves = $scope.getMoves(notation);
      $scope.generateBoardFromMoves(moves,boardsArray);
    };

    $scope.generateBoardFromMoves = function(paramMoves,boardsArray) {

      var moves = paramMoves;

      //while still have moves
      var turn = 1;
      var dotPos;
      while ((dotPos = moves.indexOf(".")) != -1) {

        var lastIndexOfWhiteMove = moves.indexOf(' ', dotPos);

        var whiteMove = moves.substring(dotPos + 1, lastIndexOfWhiteMove);
        var whiteBoard = $scope.buildBoard(boardsArray[boardsArray.length - 1], whiteMove, 'white');
        boardsArray.push(whiteBoard);


        var indexOfFirstBlack = dotPos+1+whiteMove.length+1;
        var indexOfSecondSpace = moves.indexOf(' ', indexOfFirstBlack);

        //case of last turn
        if(indexOfSecondSpace == -1){
          indexOfSecondSpace = moves.lastIndex;
        }

        var blackMove = moves.substring(indexOfFirstBlack ,indexOfSecondSpace);
        var blackBoard = $scope.buildBoard(boardsArray[boardsArray.length - 1], blackMove, 'black');
        boardsArray.push(blackBoard);

        moves = moves.substring(moves.indexOf(blackMove)+blackMove.length+1);

        //build game info objective
        $scope.buildAndPushGameInfoObject(turn, whiteMove, blackMove, whiteBoard, blackBoard);
        turn++;
      }

    };


    $scope.buildAndPushGameInfoObject = function(turn, whiteMove, blackMove, whiteBoard, blackBoard){

      var gameInfoObject = {};
      gameInfoObject.turn = turn;
      gameInfoObject.whiteMove = whiteMove;
      gameInfoObject.blackMove = blackMove;
      gameInfoObject.whiteBoard = whiteBoard;
      gameInfoObject.blackBoard = blackBoard;
      $rootScope.gameInfo.push(gameInfoObject);
    };

    $scope.getMoves = function (notation) {
      var lastIndexOfBracket = notation.lastIndexOf("]");
      return notation.substring(lastIndexOfBracket + 1);
    };
    $scope.buildBoard = function (currentBoard, move, color) {
      var board = angular.copy(currentBoard);
      var char = (move.indexOf("=") == -1) ? move.substring(0, 1) : "A";
      var source = move.substring(1, 3);
      var destination = move.substring(4, 6);

      board.turn = currentBoard.turn + 1;
      board.move = move;
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
      } else if (char == 'A') {
        type = "queen";
      }

      return type;
    };

    var buildValue = function (piece) {
      var map = Immutable.Map({
        "rook-black": "&#9820;",
        "knight-black": "&#9822;",
        "bishop-black": "&#9821;",
        "king-black": "&#9818;",
        "queen-black": "&#9819;",
        "pawn-black": "&#9823;",

        "rook-white": "&#9814;",
        "knight-white": "&#9816;",
        "bishop-white": "&#9815;",
        "king-white": "&#9812;",
        "queen-white": "&#9813;",
        "pawn-white": "&#9817;"
      });
      var key = piece.type + "-" + piece.color;
      return map.get(key);
    };

    $scope.notationString = "[White AMA][Black 500miles] [Tournament Thai Chess League][Date -1-0] [Result 1/2-1/2]" +
      "1.BF3-F4 BC6-C5 2.NG1-F3 BD6-D5 3.BE3-E4 NB8-C6 4.ME1-F2 MD8-C7 5.MF2-E3 MC7-D6 6.CC1-C2 CF8-F7 7.NB1-D2 NG8-E7 8.BH3-H4 BH6-H5 9.CF1-F2 BA6-A5 10.KD1-E2 CC8-C7 "+
    "11.RH1-D1 KE8-D7 12.BD3-D4 BA5-A4 "+
    "13.BE4xD5 BE6xD5 14.BC3-C4 BA4xB3=ง "+
    "15.CC2xB3 RH8-E8 16.KE2-F1 CF7-E6 17.BD4xC5 BB6xC5 18.BC4xD5 CE6xD5 19.CB3-C4 RE8-B8 20.CC4xD5 NE7xD5 "+
    "21.ND2-C4 NC6-E7 22.NF3-D2 KD7-E6 23.CF2-F3 BF6-F5 24.CF3-E2 CC7-C6 25.ND2-F3 CC6-B5 26.NF3-G5 KE6-D7 "+
    "27.NC4-E5 MD6xE5 28.BF4xE5 RA8-A6 29.ME3-F4 CB5-C4 30.RA1-C1 RA6-A4 31.BE5-E6=ง KD7-D6 32.AE6xD5 CC4xD5 "+
    "33.CE2-D3 RA4xA3 34.CD3-C4 RB8-C8 35.RC1-C2 RA3-A4 36.CC4xD5 NE7xD5 37.RC2-D2 RA4-D4 38.RD2xD4 BC5xD4 "+
    "39.RD1xD4 RC8-C1 40.KF1-E2 RC1-C2 41.KE2-D3 RC2-C3 42.KD3-D2 RC3-A3 43.NG5-F7 KD6-C5 44.RD4-D3 RA3-A2 "+
    "45.KD2-E1 ND5-B4 46.RD3-D2 RA2xD2 47.KE1xD2 NB4-C6 48.KD2-D3 KC5-D5 49.NF7-H8 NC6-E7 50.NH8-F7 NE7-C6 "+
    "51.NF7-G5 NC6-D4 52.MF4-E3 ND4-E6 53.NG5xE6 KD5xE6 54.ME3-F4 KE6-D5 55.KD3-E3 KD5-C4 56.MF4-E5 KC4-D5 "+
    "57.KE3-F4 KD5-E6 58.ME5-D4 KE6-F6 59.MD4-E3 BG6-G5 60.BH4xG5 KF6-G6 61.ME3-F2 BH5-H4 62.BG3xH4 KG6-H5 "+
    "63.MF2-G3 KH5-G6 64.KF4-E3 KG6-H5 65.KE3-F3 KH5-G6 66.MG3-F4 KG6-H5 67.KF3-G3 KH5-G6 68.KG3-F3 KG6-H5 "+
    "69.MF4-G3 KH5-G6 70.KF3-F4 KG6-H5 71.KF4-F3 KH5-G6";

  });
