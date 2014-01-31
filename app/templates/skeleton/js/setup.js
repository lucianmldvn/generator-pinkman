angular.module('<%= _.slugify(appname) %>', ['ui.router', 'ngResource']);

angular.module('<%= _.slugify(appname) %>').config(function ($stateProvider, $urlRouterProvider) {
  'use strict';

  /* Add New Routes Above */
  
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");

});

angular.module('<%= _.slugify(appname) %>').run(function ($rootScope) {
  'use strict';

  $rootScope.safeApply = function (fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

});