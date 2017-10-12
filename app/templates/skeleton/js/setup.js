// ------------------------------------------------------------------------------------------------
// MODULE DEPENDENCIES
// ------------------------------------------------------------------------------------------------
angular.module('<%= _.trim(_.dasherize(appname), '-') %>', ['ui.router', 'ngAnimate']);

// ------------------------------------------------------------------------------------------------
// CONSTANTS and VARIABLES
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
// CONFIG
// ------------------------------------------------------------------------------------------------
angular.module('<%= _.trim(_.dasherize(appname), '-') %>').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    'use strict';

    // -------------------------------------------
    // HTTP CONFIG
    // -------------------------------------------
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // -------------------------------------------
    // ROUTES
    // -------------------------------------------

    /* Add New Routes Above */

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

});

// ------------------------------------------------------------------------------------------------
// RUN
// ------------------------------------------------------------------------------------------------
angular.module('<%= _.trim(_.dasherize(appname), '-') %>').run(function ($rootScope) {
    'use strict';

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
