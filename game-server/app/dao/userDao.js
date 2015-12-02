var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var utils = require('../util/utils');

var userDao = module.exports;

userDao.getPlayersByUid = function(uid, callback) {
    var sql = 'select * from Player where userId = ?';
    var args = [uid];

    pomelo.app.get('dbclient').query(sql,args,function(err, res) {
        if(err) {
            utils.invokeCallback(callback, err.message, null);
            return;
        }

        if(!res || res.length <= 0) {
            utils.invokeCallback(callback, null, []);
        } else {
            utils.invokeCallback(callback, null, res);
        }
    });
};
