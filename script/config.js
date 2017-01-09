 var firstLaunch = $api.getStorage('firstLaunch');
 var _configData = $api.getStorage('configData') || {};

 //判断是否是第一次安装
 if (firstLaunch != 1) {
     //默认配置
     _configData = {
         admin: 'admin',
         adminPass: "cf79ae6addba60ad018347359bd144d2",
         version: "0.0.1", //当前软件的安装版本
         update_time: "2016-12-21 18:00",
         default_gun: true
     }

     $api.setStorage('configData', _configData);

 }