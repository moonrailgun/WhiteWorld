/**
 * Created by Chen on 2015-12-05.
 */

var tokenService = require('../../../../../shared/token');
var userDao = require('../../../dao/userDao');
var Code = require('../../../../../shared/code');

var DEFAULT_SECRET = 'pomelo_session_secret';
var DEFAULT_EXPIRE = 6 * 60 * 60 * 1000;	// default session expire time: 6 hours

module.exports = function(app) {
    return new Remote(app);
};

var Remote = function(app) {
    this.app = app;
    var session = app.get('session') || {};
    this.secret = session.secret || DEFAULT_SECRET;
    this.expire = session.expire || DEFAULT_EXPIRE;
};

Remote.prototype.auth = function(token, cb){
    var res = tokenService.parse(token, this.secret);
    if(!res) {
        cb(null, Code.ENTRY.FA_TOKEN_INVALID);
        return;
    }
    if(!checkExpire(res, this.expire)) {
        cb(null, Code.ENTRY.FA_TOKEN_EXPIRE);
        return;
    }

    userDao.getUserById(res.uid, function(err, user) {
        if(err) {
            cb(err);
            return;
        }

        cb(null, Code.OK, user);
    });
};

//检测token有效期
var checkExpire = function(token, expire) {
    if(expire < 0) {
        // negative expire means never expire
        return true;
    }

    return (Date.now() - token.timestamp) < expire;
};