/**
 * Created by Chen on 2015-12-26.
 */

var util = require('util');
var Entity = require('./entity');
var dataApi = require('../../util/dataApi');
var EntityType = require('../../consts/consts').EntityType;
var logger = require('pomelo-logger').getLogger(__filename);
var area = require('../area/area');

var Player = function(opts){
    Entity.call(this,opts);
    this.id = opts.id;
    this.type = EntityType.PLAYER;
    this.name = opts.name;
    this.speed = 240;
    this.target = null;
};

util.inherits(Player, Entity);

module.exports = Player;

Player.prototype.toJSON = function(){
    return {
        id:this.id,
        entityId:this.entityId,
        name:this.name,
        kindId:this.kindId,
        type:this.type,
        x:this.x,
        y:this.y,
        speed:this.speed,
        areaId:this.areaId
    }
};