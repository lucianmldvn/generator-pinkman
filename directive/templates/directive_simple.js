angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function () {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, element, attrs, fn) {


        }
    };
});
