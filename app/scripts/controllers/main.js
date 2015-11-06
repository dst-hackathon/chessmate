'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .controller('MainCtrl', function ($scope) {

    $scope.$on('game-updated', function (event, game) {
      console.log(game);
      $scope.currentBoard = game.boards[0];
    });

    function mockBoard(){
      return {
        "turn" : 0,
        "position" : {
          "A8": {
            "type": "king",
            "value" : "&#9820;",
            "color": "white"
          },
          "A2": {}
        },
        "source": "A3",
        "destination": "A4"
      };
    }

    $scope.move = function(source, destination) {
      var piece = $("#" + source).children();
      var desinationPosition = $("#" + destination).position();
      var destinationClass = buildCss(desinationPosition.left, desinationPosition.top);
      piece.css(destinationClass);
    }

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
