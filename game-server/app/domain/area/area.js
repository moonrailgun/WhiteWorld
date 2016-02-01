/**
 * Created by Chen on 2015-12-20.
 */

var EventEmitter = require('events').EventEmitter;
var dataApi = require('../../util/dataApi');
var pomelo = require('pomelo');
var EntityType = require('../../consts/consts').EntityType;
var logger = require('pomelo-logger').getLogger(__filename);
var Timer = require('./timer');
var channelUtil = require('../../util/channelUtil');

var id = 0;
var width = 0;
var height = 0;
var players = {};
var entities = {};
var channel = null;
var mobCounts = 0;

var Instance = function (opts) {
    this.serverId = pomelo.app.getServerId();

    this.areaId = opts.id;
    this.type = opts.type;
    this.map = opts.map;

    this.players = {};
    this.users = {};
    this.entities = {};
    this.zones = {};
    this.items = {};
    this.channel = null;

    this.playerNum = 0;
    this.emptyTime = Date.now();

    this.timer = new Timer({
        area : this,
        interval : 100
    });

    this.start();//启动地图
};

module.exports = Instance;

Instance.prototype.start = function(){
    this.timer.run();
};

Instance.prototype.close = function(){
    this.timer.close();
};

//获取区域频道
Instance.prototype.getChannel = function(){
    if(!this.channel){
        var channelName = channelUtil.getAreaChannelName(this.areaId);
        this.channel = pomelo.app.get('channelService').getChannel(channelName, true);
    }
    return this.channel;
};

Instance.prototype.addEntity = function(entity){
    var entities = this.entities;
    var players = this.players;
    var users = this.users;

    if(!entity || !entity.entityId){
        return false;
    }
    if(!!players[entity.id]){
        logger.error('已经添加过该玩家： %j', entity);
        return false;
    }

    entity.area = this;
    entities[entity.entityId] = entity;
    if(entity.type === EntityType.PLAYER) {
        this.getChannel().add(entity.playerId, entity.serverId);
        //todo
    }else if(entity.type === EntityType.MOB){
        //todo
    }
    return true;
};

Instance.prototype.getEntity = function(entityId) {
    var entity = this.entities[entityId];
    if (!entity) {
        return null;
    }
    return entity;
};

Instance.prototype.getAllPlayers = function() {
    var _players = [];
    for(var id in this.players) {
        _players.push(this.entities[this.players[id]]);
    }

    return _players;
};

Instance.prototype.getAllEntities = function() {
    return this.entities;
};

Instance.prototype.isEmpty = function(){
    return this.playerNum === 0;
};