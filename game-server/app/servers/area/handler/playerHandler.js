/**
 * Created by Chen on 2015-12-20.
 */

var fs = require('fs');
var area = require('../../../domain/area/area');
var dataApi = require('../../../util/dataApi');
var Player = require('../../../domain/entity/player');

var handler = module.exports;

handler.enterScene = function(msg,session,next){
    var player = new Player({id:msg.playerId, playerName:msg.playerName});
    player.serverId = session.frontendId;//前端连接服务器ID

    var data = {

    };

    next(null,data);
};