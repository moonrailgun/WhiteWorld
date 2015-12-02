var express = require('express');
var mysql = require('./lib/dao/mysql/mysql');
var userDao = require('./lib/dao/userDao');
var Token = require('../shared/token');
var app = express();

//所有环境
app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/public');
    app.set('view options', {layout: false});
    app.set('basepath', __dirname + '/public');
});

//开发环境
app.configure('development', function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

//生产环境
app.configure('production', function () {
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', {maxAge: oneYear}));
    app.use(express.errorHandler());
});

//数据库初始化
mysql.init();

//请求列表
//登陆
app.post('/login', function(req, res) {
    var msg = req.body;

    var username = msg.username;
    var pwd = msg.password;
    if (!username || !pwd) {
        res.send({code: 500});
        return;
    }

    userDao.getUserByName(username, function(err, user) {
        if (err || !user) {
            console.log('username not exist!');
            res.send({code: 500});
            return;
        }
        if (pwd !== user.password) {
            // TODO code
            // password is wrong
            console.log('password incorrect!');
            res.send({code: 501});
            return;
        }

        console.log(username + ' login!');
        res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
    });
});
//注册
app.post('/register', function(req, res) {
    //console.log('req.params');
    var msg = req.body;
    if (!msg.name || !msg.password) {
        res.send({code: 500});
        return;
    }

    userDao.createUser(msg.name, msg.password, '', function(err, user) {
        if (err || !user) {
            console.error(err);
            if (err && err.code === 1062) {
                res.send({code: 501});
            } else {
                res.send({code: 500});
            }
        } else {
            console.log('A new user was created! --' + msg.name);
            res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
        }
    });
});



app.listen(3001);

// Uncaught exception handler
process.on('uncaughtException', function(err) {
    console.error(' Caught exception: ' + err.stack);
});

console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");
