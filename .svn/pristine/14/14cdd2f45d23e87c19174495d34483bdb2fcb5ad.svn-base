angular.module('lqx_db', [])

//打开数据库 ===========================================================
.factory('dbOpen', ['$q', function($q) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    var openDatabase = function(name, path) {
        lqx_app.db.openDatabase({ name: name, path: path }, function(ret, err) {
            if (!ret.status) {
                openDatabase(name, path);
            } else {
                deferred.resolve('success');
            }
        });
        return promise;
    };

    return {
        openDatabase: openDatabase
    };
}])

//数据库初始化
.factory('dbInit', ['$q', function($q) {
    var d = $q.defer();
    var promise = d.promise;

    return function(db_name, db_sql) {

        var db_sql = db_sql ? db_sql : "CREATE TABLE `goods_list` (`goods_sn`  varchar(50) NOT NULL ,`sku_sn`  char(50) NOT NULL ,`goods_name`  varchar(255) NOT NULL ,PRIMARY KEY (sku_sn))"

        // var ret = lqx_app.db.executeSqlSync({
        //     name: db_name,
        //     sql: db_sql
        // });

        // if (ret.status) {
        //     alert('成功' + JSON.stringify(ret));
        //     d.resolve('执行成功!');
        // } else {
        //     alert('失败' + JSON.stringify(ret));
        //     d.reject('执行失败');
        // }

        lqx_app.db.executeSql({ name: db_name, sql: db_sql }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
                d.resolve('执行成功!');

            } else {
                alert(JSON.stringify(err));
                d.reject('error');
            }
        });

        return promise;
    }
}])

//插入数据
.factory('dbInsert', ['$q', '$http', function($q, $http) {

    var deferred = $q.defer();
    var promise = deferred.promise;
    var flag = true;


    // var deferred = $q.defer();
    // var promise = deferred.promise;

    var _insert_loop = function(databaseName, data_arr, num) {

        var data_str = '';


        for (var i = 0; i < 150; i++) {
            data_str += "('" + data_arr[i].goods_sn + "','" + data_arr[i].sku_sn + "','" + data_arr[i].goods_name + "'),"
        }

        data_str = data_str.slice(0, -1);

        // lqx_app.db.executeSql({
        //     name: databaseName,
        //     sql: 'INSERT INTO `goods_list` (`goods_sn`, `sku_sn`, `goods_name`) VALUES ' + data_str + ''
        // }, function(ret, err) {
        //     if (ret.status) {
        //         deferredInsert[num].resolve(num + 'success');
        //         alert()
        //     } else {
        //         deferredInsert[num].reject(num + '数据插入失败 !');
        //     }
        // });

        var ret = lqx_app.db.executeSqlSync({
            name: databaseName,
            sql: 'INSERT INTO `goods_list` (`goods_sn`, `sku_sn`, `goods_name`) VALUES ' + data_str + ''
        });

        if (ret.status) {
            alert(JSON.stringify(ret))
        } else {
            alert(JSON.stringify(ret))
            flag = false;
        }

    }


    var insertData = function(databaseName, response) {
        var data = response.list;
        var data_str = "";
        var loop_num = parseInt(data.length / 150);

        for (var j = 0; j < loop_num; j++) {
            //调用_insert_loop 方法完成一次数据插入
            // alert('循环次数' + j)
            _insert_loop(databaseName, data, j);
            data.length < 150 ? data = [] : data.splice(0, 150); //去除已插入的150条数据
        }
        if (flag) { deferred.resolve('success') } else { deferred.reject('insertError') }
        return promise;
    }


    return function(databaseName) {
        var bak = 'https://api.github.com/?callback=JSON_CALLBACK'
        return $http.jsonp('http://devadmin.lqxshop.com/?app_act=testmongodb/product_list&callback=JSON_CALLBACK')
            .then(function(response) {
                var data = response.data;

                if (data.code == 0) {
                    alert('数据取回成功 !')
                    return insertData(databaseName, data)
                }
            }, function(err) {
                alert('ajax请求失败')
            })
    }

}])