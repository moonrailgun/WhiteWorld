var Code = require('../../../../../shared/code.js');
var userDao = require('../../../dao/userDao');
var async = require('async');
var logger = require('pomelo-logger').getLogger(module.filename);

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;

    if (!this.app) {
        logger.error(app);
    }
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function (msg, session, next) {
    var token = msg.token,
        self = this;

    if (!token) {
        next(new Error('invalid entry request: empty token'), {code: Code.FAIL});
        return;
    }
    var uid, players, player;

    async.waterfall([
        function (callback) {
            self.app.rpc.auth.authRemote.auth(session, token, callback);
        },
        function (code, user, callback) {
            // query player info by user id
            if (code !== Code.OK) {
                next(null, {code: code});
                return;
            }

            if (!user) {
                next(null, {code: Code.ENTRY.FA_USER_NOT_EXIST});
                return;
            }

            uid = user.id;
            userDao.getPlayersByUid(user.id, callback);
        }//todo
    ]);


    next(null, {code: 200, msg: 'game server is ok.'});
};