angular.module('<%= appname %>').factory('<%= name %>', function () {
    'use strict';

    return {
        request: function (config) {
            config.headers = config.headers || {};

            // do something to requests

            return config;
        },

        responseError: function (response) {
            // do something on response
        }
    };
});
