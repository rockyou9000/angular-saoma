var panCtrl = [
    '$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location) {

        Array.prototype.slice.apply(document.querySelectorAll('.modal-txt'))
            .forEach(function(el) {
                TinyDatePicker(el, {
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

        $scope.search_date_start = "";
        $scope.search_date_end = "";
        $scope.search_id = "";

        $scope.closeWin = function() {
            $location.path('/index')
        };
        $scope.goDetail = function() {
            $location.path('/list')
        };

        //筛选器
        $scope.byFilterList = function(obj) {

            var str1 = String(obj.PAPER_NUM)

            if (str1.indexOf($scope.search_id) !== -1) {
                return true
            } else {
                return false
            }

        }


        $scope.data = [{
            PAPER_NUM: 5153313513,
            PAN_PERSON: '周骏',
            PAN_ID: 6052037,
            PAN_SHOP: '中山公园龙之梦',
            PAN_STATUS: '已上传',
            PAN_DATE: '2016/11/30',
            PAN_DIFF: '未拉取'
        }, {
            PAPER_NUM: 5153123513,
            PAN_PERSON: '周二骏',
            PAN_ID: 6052037,
            PAN_SHOP: '虹口龙之梦',
            PAN_STATUS: '未确认',
            PAN_DATE: '2013/11/30',
            PAN_DIFF: '已拉取'
        }, {
            PAPER_NUM: 12332313513,
            PAN_PERSON: '周三骏',
            PAN_ID: 6052037,
            PAN_SHOP: '中山公园龙之梦',
            PAN_STATUS: '未上传',
            PAN_DATE: '2016/11/30',
            PAN_DIFF: '未拉取'
        }];


    }
]

panCtrl.$injector = ['$rootScope', '$scope', '$location'];