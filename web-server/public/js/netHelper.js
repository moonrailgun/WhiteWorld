/**
 * Created by Chen on 2015-11-28.
 */

/*
 * �÷���
 * $.ping({
 * url : 'http://www.baidu.com',
 * beforePing : function(){$('#msg').html('')},
 * afterPing : function(ping){$('#msg').html(ping)},
 * interval : 1
 *  });
 */
$.ping = function (option) {
    var ping, requestTime, responseTime;
    var getUrl = function (url) {
        var strReg = "^((https|http)?://){1}";
        var re = new RegExp(strReg);
        return re.test(url) ? url : "http://" + url;
    };
    $.ajax({
        url: getUrl(option.url) + '/' + (new Date()).getTime() + '.html',
        type: 'GET',
        dataType: 'html',
        timeout: 10000,
        beforeSend: function () {
            if (option.beforePing) option.beforePing();
            requestTime = new Date().getTime();
        },
        success: function(){
            responseTime = new Date().getTime();
            ping = Math.abs(requestTime - responseTime);
            if (option.afterPing) option.afterPing(null,ping);
        },
        error: function(obj, msg){
            if (option.afterPing) option.afterPing(obj,null);
        }
    });

    if (option.interval && option.interval > 0) {
        var interval = option.interval * 1000;
        setTimeout(function () {
            $.ping(option)
        }, interval);
    }
};