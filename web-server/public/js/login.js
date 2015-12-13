/**
 * Created by Chen on 2015-11-28.
 */

var Login = function (serverOption) {
    var host = serverOption.ip;
    var port = serverOption.port ? serverOption.port : 3001;
    var loading = false;

    var httpHost = location.href.replace(location.hash, '');

    var config = {
        GATE_HOST : window.location.hostname,
        GATE_PORT : 3014
    };

    pomelo.on('websocket-error', function(){
        loading = false;
    });

    this.login = function (username, pwd){
        if (loading) {
            return;
        }
        loading = true;

        $.post(httpHost + 'login', {username: username, password: pwd}, function(data) {
            if (data.code === 501) {
                alert('用户名或密码不正确');
                loading = false;
                return;
            }
            if (data.code !== 200) {
                alert('该用户不存在');
                loading = false;
                return;
            }

            authEntry(data.uid, data.token, function(host,port,player,token) {
                loading = false;
                localStorage.setItem('username', username);
                localStorage.setItem('token',token);
                //切换场景
                var info = {
                    host: host,
                    port: port,
                    player: player
                };
                localStorage.setItem('serverInfo', JSON.stringify(info));
            });
        });
    };

    var authEntry = function(uid, token, callback){
        queryEntry(uid, function(host, port) {
            entry(host, port, token, callback);
        });
    };

    //从gate服务器获取分配的服务器ip与port
    var queryEntry = function(uid, callback){
        pomelo.init({
            host : config.GATE_HOST,
            port : config.GATE_PORT,
            log: true
        },function(){
            pomelo.request('gate.gateHandler.queryEntry',{uid:uid},function(data){
                pomelo.disconnect();

                if(data.code === 2001) {
                    alert('Servers error!');
                    return;
                }

                callback(data.host, data.port);
            });
        })
    };

    //进入游戏
    var entry = function(host,port,token,callback){
        if(host === '127.0.0.1') {
            host = config.GATE_HOST;//转义为本地
        }

        pomelo.init({
            host:host,
            port:port,
            log:true
        },function(){
            pomelo.request('connector.entryHandler.entry',{token:token},function(data){
                var player = data.player;
                callback(host,port,player,token);
            });
        })
    }
};