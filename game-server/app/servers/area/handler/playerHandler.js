/**
 * Created by Chen on 2015-12-20.
 */

var fs = require('fs');
var area = require('../../../domain/area/area');
var dataApi = require('../../../util/dataApi');
var Player = require('../../../domain/entity/player');
var userDao = require('../../../dao/userDao');
var bagDao = require('../../../dao/bagDao');

var handler = module.exports;

handler.enterScene = function(msg,session,next){
    var playerId = session.get('playerId');
    var playerName = session.get('playerName');
    var player = new Player({id:playerId, playerName:playerName});
    player.serverId = session.frontendId;//前端连接服务器ID

    userDao.getPlayerAllInfo(playerId,function(err, player){
        //todo
    });

    var data = {

    };

    next(null,data);
};