angular.module('chessmateApp')
    .controller('NotationController', function ($scope) {
        $scope.buildGame = function(Notation){
            alert(Notation);
        };
    });