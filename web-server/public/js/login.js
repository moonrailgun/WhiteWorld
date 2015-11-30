/**
 * Created by Chen on 2015-11-28.
 */

var Login = function (serverOption) {
    var host = serverOption.ip;
    var port = serverOption.port ? serverOption.port : 3001;

    //todo
    this.entry = function (name, callback) {
        pomelo.init({
            host: host,
            port: port,
            log: true
        }, function () {
            pomelo.request("gate.gateHandler.queryEntry", {uid: 1}, function (data) {
                alert(JSON.stringify(data));
                pomelo.disconnect();
                //todo
            });
        })
    }
};