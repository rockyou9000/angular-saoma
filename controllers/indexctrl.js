var indexCtrl = [
    '$rootScope', '$scope', '$location', '$http', '$q', '$timeout', 'ngDialog',
    function($rootScope, $scope, $location, $http, $q, $timeout, ngDialog) {

        $scope.pan_set = true;
        $scope.showModal = false;

        $scope.BA_ID = 110670;
        $scope.BA_NAME = '周骏';


        $scope.PAPER_NUM = "系统自动生成";
        $rootScope.selectShop = '';
        $scope.PAN_DATE = '';

        $scope.openModal = function() {
            $scope.showModal = true;
            $timeout(function() {
                TinyDatePicker(document.querySelector('.modal-txt'), {

                    format: function(date) {
                        return date.toLocaleDateString();
                    },
                    mode: 'dp-modal',
                    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    days: ['日', '一', '二', '三', '四', '五', '六'],
                    today: '今天',
                    clear: '清空',
                    close: '关闭'
                        // min: '10/1/2016',
                        // max: '10/22/2016'
                });

            })

        }

        $scope.closeMain = function() {
            $location.path('/');
        };
        $scope.showConfig = function() {
            $location.path('/config');
        };
        //跳转至盘点列表
        $scope.showPan = function() {
            $http.get('http://192.168.253.175/devipos/api/web/index.php?app_act=stock/stm_take_stock_by_lqxshop/get_list_by_lqx&is_add_person=110739').then(function(ret) {
                // alert(JSON.stringify(ret))
                if (!ret) return;
                if (ret.status) {
                    $rootScope.stork_list = ret.data.data //把列表数组保存至rootScope stork_list变量中
                    $location.path('/pandian')
                }
            }).catch(function() {
                alert('获取列表失败')
            })

        };

        $scope.modal_save = function() {
            $location.path('/pandian');
        };
        $scope.modal_close = function() {
            $scope.showModal = false;
        }

        $scope.searchShops = function() {

            // 打开门店列表
            window_shop = ngDialog.open({
                closeByDocument: false,
                trapFocus: false,
                template: './html/dialog_sel_shop.html',
                disableAnimation: true,
                showClose: false,
                scope: $scope,
                controller: ['$scope', '$http', '$q', '$timeout', function($scope, $http, $q, $timeout) {

                    $scope.list = '';
                    $rootScope.selectShop = '';

                    $http({
                        method: 'GET',
                        url: './install/shops.json'
                    }).success(function(response) {
                        if (!response.data) {
                            alert('未搜索到相关商品')
                        }
                        $timeout(function() {
                            $scope.list = response.data;
                        })

                    }).error(function() {
                        alert('数据读取失败 !')
                    })


                    $scope.getItem = function(index) {
                        $rootScope.selectShop = $scope.list[index];
                        // alert($rootScope.selectShop)
                        $timeout(function() {
                            $scope.closeThisDialog()
                        }, 300)

                    }
                }]
            });

        }
    }
]

indexCtrl.$injector = ['$rootScope', '$scope', '$location', '$http', '$q', '$timeout', 'ngDialog'];