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
            console.log('b');
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
        }, function (res, cb) {
            players = res;
            self.app.get('sessionService').kick(uid, cb);//?
        }, function (cb) {
            session.bind(uid, cb);
        }, function (cb) {
            if (!players || players.length === 0) {
                next(null, {code: Code.OK});
                return;
            }

            player = players[0];

            session.set('serverId', self.app.get('areaIdMap')[player.areaId]);
            session.set('playername', player.name);
            session.set('playerId', player.id);
            session.on('closed', onUserLeave.bind(null, self.app));
            session.pushAll(cb);
        }, function (cb) {
            /*self.app.rpc.chat.chatRemote.add(session, player.userId, player.name,
             channelUtil.getGlobalChannelName(), cb);*/
        }
    ], function (err) {
        if (err) {
            next(err, {code: Code.FAIL});
            return;
        }

        next(null, {code: Code.OK, player: players ? players[0] : null});
    });

    //next(null, {code: 200, msg: 'game server is ok.'});
};

var onUserLeave = function (app, session, reason) {
    if (!session || !session.uid) {
        return;
    }

    utils.myPrint('1 ~ OnUserLeave is running ...');
    app.rpc.area.playerRemote.playerLeave(session, {
        playerId: session.get('playerId'),
        instanceId: session.get('instanceId')
    }, function (err) {
        if (!!err) {
            logger.error('user leave error! %j', err);
        }
    });
    app.rpc.chat.chatRemote.kick(session, session.uid, null);
};