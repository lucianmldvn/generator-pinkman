angular.module('<%= appname %>').directive('<%= _.camelCase(name) %>', function () {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, element, attrs, fn) {


        }
    };
});
