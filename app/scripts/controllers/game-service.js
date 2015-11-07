'use strict';

/**
 * @ngdoc function
 * @name chessmateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chessmateApp
 */
angular.module('chessmateApp')
  .factory('GameService', function (localStorageService) {
    var gamesInStore = localStorageService.get('notation') || [];

    return {
      notation : gamesInStore,
      add : function(game){
        this.notation.push(game);
      },
      save : function(){
        localStorageService.set('notation', this.notation);
      }
    };
  });
