angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function () {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'directive/<%= _.trim(_.dasherize(name), '-') %>/<%= _.trim(_.dasherize(name), '-') %>.html',
        link: function (scope, element, attrs, fn) {

        }
    };
});
