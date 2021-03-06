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

            function filter_id(obj) {
                var str1 = String(obj.PAPER_NUM)

                if (str1.indexOf($scope.search_id) !== -1) {
                    return true;
                } else {
                    return false;
                }
            }

            var dateStart = $scope.search_date_start ? +new Date($scope.search_date_start) : ''; // 获取时间戳
            var dateEnd = $scope.search_date_end ? +new Date($scope.search_date_end) : '';
            var obj_date = +new Date(obj.PAN_DATE);

            if (dateStart && dateEnd) {
                if (dateEnd - dateStart > 0) {
                    console.log('两个时间正确 !')
                    if (obj_date <= dateEnd && obj_date >= dateStart) {
                        filter_id(obj)
                    } else {
                        return false;
                    }
                } else if (dateEnd - dateStart < 0) {
                    console.log('筛选的结束时间早于开始时间 !')
                    return false;
                } else {
                    console.log('未知错误!')
                    return false;
                }
            } else if (dateStart || dateEnd) {
                console.log('存在一个时间正确 !')
                if (dateStart) {
                    if (obj_date >= dateStart) {
                        filter_id(obj)
                    } else {
                        return false;
                    }
                }
                if (dateEnd) {
                    if (obj_date <= dateEnd) {
                        filter_id(obj)
                    } else {
                        return false;
                    }
                }
            }
            return filter_id(obj);
        }

        $scope.data = $rootScope.stork_list

        // alert(JSON.stringify($scope.data))

        // $scope.data = [{
        //     PAPER_NUM: 515330001,
        //     PAN_PERSON: '周骏',
        //     PAN_ID: 6052037,
        //     PAN_SHOP: '中山公园龙之梦',
        //     PAN_STATUS: '已上传',
        //     PAN_DATE: '2016/2/30',
        //     PAN_DIFF: '未拉取'
        // }, {
        //     PAPER_NUM: 5153123110,
        //     PAN_PERSON: '周二骏',
        //     PAN_ID: 6052037,
        //     PAN_SHOP: '虹口龙之梦',
        //     PAN_STATUS: '未确认',
        //     PAN_DATE: '2013/3/30',
        //     PAN_DIFF: '已拉取'
        // }, {
        //     PAPER_NUM: 12332313539,
        //     PAN_PERSON: '大黄',
        //     PAN_ID: 6052037,
        //     PAN_SHOP: '中山公园龙之梦',
        //     PAN_STATUS: '未上传',
        //     PAN_DATE: '2016/5/30',
        //     PAN_DIFF: '未拉取'
        // }, {
        //     PAPER_NUM: 12332313642,
        //     PAN_PERSON: '包子',
        //     PAN_ID: 6052037,
        //     PAN_SHOP: '中山公园龙之梦',
        //     PAN_STATUS: '未上传',
        //     PAN_DATE: '2016/6/30',
        //     PAN_DIFF: '未拉取'
        // }, {
        //     PAPER_NUM: 12332313888,
        //     PAN_PERSON: '狗不理包子',
        //     PAN_ID: 6052037,
        //     PAN_SHOP: '中山公园龙之梦',
        //     PAN_STATUS: '未上传',
        //     PAN_DATE: '2016/7/30',
        //     PAN_DIFF: '未拉取'
        // }];


    }
]

panCtrl.$injector = ['$rootScope', '$scope', '$location'];