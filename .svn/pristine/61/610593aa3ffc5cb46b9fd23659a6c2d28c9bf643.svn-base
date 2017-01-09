angular.module('saoApp', ['ngTouch', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngDialog', 'lqx_db'])
    .controller('mainCtrl', mainCtrl)
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        //路由配置
        $routeProvider.
        when('/', { templateUrl: 'html/login.html', controller: loginCtrl }).
        when('/index', { templateUrl: 'html/index.html', controller: indexCtrl }).
        when('/config', { templateUrl: 'html/config.html', controller: configCtrl }).
        when('/pandian', { templateUrl: 'html/pandian.html', controller: panCtrl }).
        when('/list', { templateUrl: 'html/list.html', controller: listCtrl }).
        otherwise({ redirectTo: '/index' });

        //HTTP异步设置 =============================================
        // 头部配置  
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

    }])