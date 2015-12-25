/**
 * Created by Chen on 2015-12-20.
 */

var EventEmitter = require('events').EventEmitter;
var dataApi = require('../../util/dataApi');
var pomelo = require('pomelo');

var exp = module.exports;

var id = 0;
var width = 0;
var height = 0;
var players = {};
var entities = {};
var channel = null;

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