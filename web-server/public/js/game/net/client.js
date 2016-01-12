/**
 * Created by Chen on 2015-12-13.
 */

var Client = function(){
    var client = this;
    var config = {
        GATE_HOST: window.location.hostname,
        GATE_PORT: 3014
    };
    client.connect = function(){
        var uid = localStorage.getItem('uid');
        var token = localStorage.getItem('token');
        authEntry(uid, token, function (host, port, player, token) {
            localStorage.setItem('username', player.username);
            localStorage.setItem('token', token);

            var info = {
                host: host,
                port: port,
                player: player
            };
            localStorage.setItem('serverInfo', JSON.stringify(info));
            console.log('正在进入场景');
            pomelo.request('area.playerHandler.enterScene',{playerName: player.playerName,playerId: player.playerId},function(data){
                localStorage.setItem('player',JSON.stringify(data));
                //应用数据

            });

            client.applyGameData(player);
        });
    };

    client.applyGameData = function(player){
        var username = player.username;
        var userid = player.userId;
        var lastPos = player.lastPos=="" ? "(0,0)" : player.lastPos;

        //todo
    };

    var authEntry = function (uid, token, callback) {
        queryEntry(uid, function (host, port) {
            entry(host, port, token, callback);
        });
    };

    //从gate服务器获取分配的服务器ip与port
    var queryEntry = function (uid, callback) {
        pomelo.init({
            host: config.GATE_HOST,
            port: config.GATE_PORT,
            log: true
        }, function () {
            pomelo.request('gate.gateHandler.queryEntry', {uid: uid}, function (data) {
                pomelo.disconnect();

                if (data.code === 2001) {
                    alert('Servers error!');
                    return;
                }

                callback(data.host, data.port);
            });
        })
    };

    //进入游戏
    var entry = function (host, port, token, callback) {
        if (host === '127.0.0.1') {
            host = config.GATE_HOST;//转义为本地
        }

        pomelo.init({
            host: host,
            port: port,
            log: true
        }, function () {
            pomelo.request('connector.entryHandler.entry', {token: token}, function (data) {
                callback(host, port, data.player, token);
            });
        })
    }
};