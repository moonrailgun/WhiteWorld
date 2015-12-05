var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var utils = require('../util/utils');

var userDao = module.exports;

userDao.getPlayersByUid = function(uid, callback) {
    console.log(utils);
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

userDao.getUserById = function (uid, cb){
    var sql = 'select * from	User where id = ?';
    var args = [uid];
    pomelo.app.get('dbclient').query(sql,args,function(err, res){
        if(err !== null){
            utils.invokeCallback(cb,err.message, null);
            return;
        }

        if (!!res && res.length > 0) {
            utils.invokeCallback(cb, null, new User(res[0]));
        } else {
            utils.invokeCallback(cb, ' user not exist ', null);
        }
    });
};
