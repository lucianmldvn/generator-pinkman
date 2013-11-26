angular.module('<%= appname %>').directive('<%= _.classify(name) %>', function() {

  'use strict';

	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/<%= name %>/<%= name %>.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
