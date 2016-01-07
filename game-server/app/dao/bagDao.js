/**
 * Created by Chen on 2015-12-26.
 */

var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var Bag = require('../domain/bag');
var utils = require('../util/utils');


var bagDao = module.exports;

bagDao.createBag = function(playerId, callback){
    var sql = 'INSERT INTO bag (playerId, items, itemCount) VALUES (?, ?, ?)';
    var args = [playerId, '{}', 20];

    pomelo.app.get('dbclient').insert(sql, args, function(err, res){
        if(err){
            logger.error('创建背包失败:' + err.stack);
            util.invokeCallback(callback, err, null);
        } else{
            var bag = new Bag({id:res.insertId});
            utils.invokeCallback(callback, null, bag);
        }
    });
};

bagDao.getBagByPlayerId = function(playerId, cb) {
    var sql = 'select * from Bag where playerId = ?';
    var args = [playerId];

    pomelo.app.get('dbclient').query(sql, args, function(err, res) {
        if (err) {
            logger.error('无法通过ID获取玩家背包数据! ' + err.stack);
            utils.invokeCallback(cb, err, null);
        } else {
            if (res && res.length === 1) {
                var result = res[0];
                var bag = new Bag({ id: result.id, itemCount: result.itemCount, items: JSON.parse(result.items) });
                cb(null, bag);
            } else {
                logger.error('背包不存在');
                //utils.invokeCallback(cb, new Error('背包不存在'), null);

                logger.info('开始创建玩家背包数据');
                bagDao.createBag(playerId, function(err, bag){
                    if(!!err){
                        cb(err, null);
                        return;
                    }

                    cb(null, bag);
                });
            }
        }
    });
};

bagDao.update = function(bag, cb) {
    var sql = 'update Bag set items = ? where id = ?';
    var items = bag.items;
    if (typeof items !== 'string') {
        items = JSON.stringify(items);
    }

    var args = [items, bag.id];

    pomelo.app.get('dbclient').query(sql, args, function(err, res) {
        if (err) {
            logger.error('写入数据库失败!　' + sql + ' ' + JSON.stringify(bag));
        }

        utils.invokeCallback(cb, !!err);
    });
};

bagDao.destroy = function(playerId, cb) {
    var sql = 'delete from Bag where playerId = ?';
    var args = [playerId];

    pomelo.app.dbclinet.query(sql, args, function(err, res) {
        utils.invokeCallback(cb, err, res);
    });
};