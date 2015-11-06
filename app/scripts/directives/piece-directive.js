angular.module('chessmateApp')
  .directive('piece', function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      templateUrl: 'app/views/piece-directive.html',
      scope: {piece: '=value'}
    };
  })
  .directive('pieceRow', function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      templateUrl: 'app/views/piece-row-directive.html',
      scope: {
        currentBoard: '=board',
        index: '='
      }
    };
  });
