/**
 * Created by Chen on 2015-11-28.
 */
var Code = require('../../../../../shared/code');
var dispatcher = require('../../../util/dispatcher');

module.exports = function(app){
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

//连接请求
Handler.prototype.queryEntry = function(msg, session, next) {
    var uid = msg.uid;//用户唯一标识
    if (!uid) {
        next(null, {code: Code.FAIL});
        return;
    }

    var connectors = this.app.getServersByType('connector');//获取服务器列表
    if (!connectors || connectors.length === 0) {
        next(null, {code: Code.GATE.FA_NO_SERVER_AVAILABLE});//没有可用的服务器
        return;
    }

    var res = dispatcher.dispatch(uid, connectors);
    next(null, {code: Code.OK, host: res.host, port: res.clientPort});
};