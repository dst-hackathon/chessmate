angular.module('chessmateApp')
    .directive('notationSection', function(){
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        templateUrl: 'app/views/notation-section.html',
        controller: 'NotationCtrl' //Embed a custom controller in the directive
    };
});