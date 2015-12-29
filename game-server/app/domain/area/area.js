/**
 * Created by Chen on 2015-12-20.
 */

var EventEmitter = require('events').EventEmitter;
var dataApi = require('../../util/dataApi');
var pomelo = require('pomelo');
var EntityType = require('../../consts/consts').EntityType;
var logger = require('pomelo-logger').getLogger(__filename);



var id = 0;
var width = 0;
var height = 0;
var players = {};
var entities = {};
var channel = null;
var mobCounts = 0;

var exp = function(){
    this.emptyTime = Date.now();
};

module.exports = exp;

exp.init = function(opts) {
    id = opts.id;
    width = opts.width;
    height = opts.height;

    //area run
};

var getChannel = exp.getChannel = function(){
    if(channel){
        return channel;
    }

    channel = pomelo.app.get('channelService').getChannel('area_' + id,true);
    return channel;
};

var addEvent = function(player) {
    //player.on('pickItem', function(args) {
    //    var player = exp.getEntity(args.entityId);
    //    var treasure = exp.getEntity(args.target);
    //    player.target = null;
    //    if (treasure) {
    //        player.addScore(treasure.score);
    //        exp.removeEntity(args.target);
    //        getChannel().pushMessage({route: 'onPickItem', entityId: args.entityId, target: args.target, score: treasure.score});
    //    }
    //});
};
var added = [];//一个tick内要增加的实体
var reduced = [];//一个tick内要减少的实体

exp.addEntity = function(entity){
    if(!entity || !entity.entityId){
        return false;
    }

    entities[entity.entityId] = entity;
    if(entity.type === EntityType.PLAYER){
        getChannel().add(entity.id, entity.serverId);
        addEvent(entity);

        if(!!players[entity.id]){
            logger.error('add player twice! player : %j', entity);
        }
        players[entity.id] = entity.entityId;
    }else if(entity.type === EntityType.MOB){
        mobCounts++;
    }
    added.push(entity);
    return true;
};

exp.removeEntity = function(entityId){
    var entity = entities[entityId];
    if(!entity){
        return false;
    }

    if(entity.type === EntityType.PLAYER){
        getChannel().leave(entity.id, entity.serverId);
        delete players[entity.id];
    }else if(entity.type === EntityType.MOB){
        mobCounts--;
    }

    delete entities[entityId];
    reduced.push(entityId);
    return true;
};

exp.getEntity = function(entityId) {
    return entities[entityId];
};

exp.width = function() {
    return width;
};

exp.height = function() {
    return height;
};

exp.entities = function () {
    return entities;
};

exp.actionManager = function() {
    return actionManager;
};

exp.timer = function() {
    return timer;
};

exp.isEmpty = function(){
    return this.playerNum == 0;
}