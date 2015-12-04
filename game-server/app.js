var pomelo = require('pomelo');
var sync = require('pomelo-sync-plugin');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'WhiteWorld');

// 全局配置
app.configure('production|development', function() {
    app.loadConfig('mysql', app.getBase() + '/../shared/config/mysql.json');
});

// 数据库配置
app.configure('production|development', 'area|auth|connector|master', function() {
    var dbclient = require('./app/dao/mysql/mysql').init(app);
    app.set('dbclient', dbclient);
    // app.load(pomelo.sync, {path:__dirname + '/app/dao/mapping', dbclient: dbclient});
    //app.use(sync, {sync: {path:__dirname + '/app/dao/mapping', dbclient: dbclient}});
});

// 应用配置
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
        {
            connector: pomelo.connectors.sioconnector,
            //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
            transports: ['websocket'],
            heartbeats: true,
            closeTimeout: 60,
            heartbeatTimeout: 60,
            heartbeatInterval: 25
        });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
    console.error(' Caught exception: ' + err.stack);
});
