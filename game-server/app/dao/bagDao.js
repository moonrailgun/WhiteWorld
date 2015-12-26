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