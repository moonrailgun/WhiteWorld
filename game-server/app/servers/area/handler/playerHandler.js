/**
 * Created by Chen on 2015-12-20.
 */

var fs = require('fs');
var area = require('../../../domain/area/area');
var dataApi = require('../../../util/dataApi');
var userDao = require('../../../dao/userDao');
var bagDao = require('../../../dao/bagDao');
var logger = require('pomelo-logger').getLogger(__filename);
var consts = require('../../../consts/consts');
var channelUtil = require('../../../util/channelUtil');

var handler = module.exports;

handler.enterScene = function (msg, session, next) {
    var playerId = session.get('playerId');
    var playerName = session.get('playerName');

    userDao.getPlayerAllInfo(playerId, function (err, player) {
        if (!!err || !player) {
            logger.error('获取用户信息失败' + err.stack);
            next(new Error('无法获取用户信息'), {code: consts.MESSAGE.ERR});
            return;
        }
        logger.warn(JSON.stringify(player));
        player.serverId = session.frontendId;//前端连接服务器ID
        //console.log(player);
        //pomelo.app.rpc.chat.chatRemote.add(session, player.)
        //todo 地图数据的获取

        var data = {
            player: player,
            map: null
        };

        next(null, data);
    });
};

handler.move = function(msg, session, next){
    var currentPos = msg.currentPos;
    var entityId = msg.entityId;
    var playerId = session.get('playerId');
    var player = area.getEntity(entityId);

    //todo

    next(null, {});
};