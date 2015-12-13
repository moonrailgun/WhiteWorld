/**
 * Created by Chen on 2015-11-28.
 */

var Login = function (serverOption) {
    var host = serverOption.ip;
    var port = serverOption.port ? serverOption.port : 3001;
    var loading = false;

    var httpHost = location.href.replace(location.hash, '');

    pomelo.on('websocket-error', function () {
        loading = false;
    });

    this.login = function (username, pwd) {
        if (loading) {
            return;
        }
        loading = true;

        $.post(httpHost + 'login', {username: username, password: pwd}, function (data) {
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

            loading = false;
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('token', data.token);
            window.location.href = 'main.html';//跳转页面
        });
    };


};