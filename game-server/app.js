var pomelo = require('pomelo');
var sync = require('pomelo-sync-plugin');
var instancePool = require('./app/domain/area/instancePool');
var playerFilter = require('./app/servers/area/filter/playerFilter');
var dataApi = require('./app/util/dataApi');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'WhiteWorld');

// 全局配置
app.configure('production|development', function () {
    app.loadConfig('mysql', app.getBase() + '/../shared/config/mysql.json');
});

// 认证服务器配置
app.configure('production|development', 'auth', function () {
    // 读取配置文件
    app.set('session', require('./config/session.json'));
});

app.configure('production|development', 'area', function () {
    //app.filter(pomelo.filters.serial());
    app.before(playerFilter());

    var server = app.curServer;
    if(!!server.instance){
        instancePool.init(require('./config/instance.json'));
        app.areaManager = instancePool;
    }else{
        //todo
        //scene.init(dataApi.area.findById(server.area));
        //app.areaManager = scene;
    }

    //areaService.init();
});

// 数据库配置
app.configure('production|development', 'area|auth|connector|master', function () {
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
