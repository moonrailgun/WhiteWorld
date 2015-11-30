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

Handler.prototype.queryEntry = function(msg, session, next) {
    var uid = msg.uid;
    console.log(uid);
    if (!uid) {
        next(null, {code: Code.FAIL});
        return;
    }

    var connectors = this.app.getServersByType('connector');
    if (!connectors || connectors.length === 0) {
        next(null, {code: Code.GATE.FA_NO_SERVER_AVAILABLE});
        return;
    }

    var res = dispatcher.dispatch(uid, connectors);
    next(null, {code: Code.OK, host: res.host, port: res.clientPort});
};