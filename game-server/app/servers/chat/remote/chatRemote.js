/**
 * Created by Chen on 2015-12-17.
 */

module.exports = function(app) {
    return new ChatRemote(app);
};

var ChatRemote = function(app) {
    this.app = app;
    this.channelService = app.get('channelService');
};

//添加用户到这个频道
var remote = ChatRemote.prototype;
remote.add = function(){

};
//从频道中获取用户
remote.get = function(){

};
//踢出用户
remote.kick = function(){

};