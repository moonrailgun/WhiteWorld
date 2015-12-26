var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var utils = require('../util/utils');
var User = require('../domain/user');
var async = require('async');
var bagDao = require('./bagDao');

var userDao = module.exports;

//获取该用户uid下所有人物
userDao.getPlayersByUid = function(uid, callback) {
    var sql = 'select * from player where userId = ?';
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
//根据ID获取该用户信息
userDao.getUserById = function (uid, cb){
    var sql = 'select * from	account where id = ?';
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
//根据角色ID获取该角色信息
userDao.getPlayerByPlayerId = function(playerId, callback) {
    var sql = 'select * from player where playerId = ?';
    var args = [playerId];

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
//根据角色ID获取该玩家所有数据
userDao.getPlayerAllInfo = function(playerId, callback){
    async.parallel([
        function(callback){
            userDao.getPlayerByPlayerId(playerId, function(err, player){
                if(!!err || !player){
                    logger.error('获取角色失败:' + err.stack);
                }
                callback(err,player);
            });
        },
        function(callback){
            //todo 获取玩家背包数据
        }
    ])
};