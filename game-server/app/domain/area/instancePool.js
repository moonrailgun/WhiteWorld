/**
 * Created by Chen on 2015-12-29.
 */

var Instance = require('./instance');
var dataApi = require('../../util/dataApi');
var Map = require('../map/map');
var pomelo = require('pomelo');
var logger = require('pomelo-logger').getLogger(__filename);

var exp = module.exports;

var instances;//地图实例
var interval;
var maps = {};

exp.init = function(opts){
    instances = {};
    interval = opts.interval || 60000;
    setInterval(check,interval);
};

exp.create = function(params){
    var id = params.instanceId;
    var areaId = params.areaId;
    if(!!instances[id]) return false;

    var opts = dataApi.area.findById(areaId);
    if(!maps[areaId]){
        maps[areaId] = new Map(opts);
    }
    opts.map = maps[areaId];

    var instance = new Instance(opts);
    instances[id] = instance;
    instance.start();
    return true;
};

function check(){
    var app = pomelo.app;
    for(var id in instances){
        var instance = instances[id];
        if(!instance.isAlive()){
            //todo 移除
        }
    }
}