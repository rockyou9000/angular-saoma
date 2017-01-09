var configCtrl = [
    '$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location) {

        $scope.BA_ID = '000000';
        $scope.BA_NAME = '管理员';
        $scope.default_gun = _configData.default_gun;

        $scope.$watch('default_gun', function(newValue) {
            _configData.default_gun = newValue;
            $api.setStorage('configData', _configData);
        })

        $scope.page_back = function() {
            window.history.go(-1);
        };
        $scope.clear = function() {
            window.localStorage.clear()
            alert('缓存已清除!')
        }
    }
]

configCtrl.$injector = ['$rootScope', '$scope', '$location'];