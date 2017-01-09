angular.module('lqxDirectives', [])
    /**移动设备触摸事件,解决平板上点击延迟的问题,兼容pc端click事件
     * 使用方法: 用bs-touchstart替换原来的ng-click
     * @example:<a class="keys"  lqx-touchstart="btn_number(7);">
     * */
    .directive("lqxTouchstart", function() {
        return {
            controller: ["$scope", "$element", function($scope, $element) {
                $element.bind("touchstart", onTouchStart);
                $element.bind("click", onClick);

                function onTouchStart(event) {
                    $element.unbind("click");
                    var method = $element.attr("lqx-touchstart");
                    $scope.$apply(method);
                }

                function onClick(event) {
                    $element.unbind("touchstart");
                    var method = $element.attr("lqx-touchstart");
                    $scope.$apply(method);
                }
            }]
        }
    })