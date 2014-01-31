angular.module('<%= appname %>').directive('<%= _.classify(name) %>', function () {
  'use strict';
  
  return {
    restrict: 'A',
    link: function (scope, element, attrs, fn) {


    }
  };
});