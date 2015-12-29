/**
 * Created by Chen on 2015-12-29.
 */

var ChannelUtil = module.exports;

var GLOBAL_CHANNEL_NAME = 'global';
var AREA_CHANNEL_NAME = 'area_';

ChannelUtil.getGlobalChannelName = function(){
    return GLOBAL_CHANNEL_NAME;
};

ChannelUtil.getAreaChannelName = function(areaId){
    return AREA_CHANNEL_NAME + areaId;
};