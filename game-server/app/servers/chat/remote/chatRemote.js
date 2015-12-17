/**
 * Created by Chen on 2015-12-17.
 */

module.exports = function (app) {
    return new ChatRemote(app);
};

var ChatRemote = function (app) {
    this.app = app;
    this.channelService = app.get('channelService');
};

//添加用户到这个频道
var remote = ChatRemote.prototype;
remote.add = function (playerId, sessionId, channelName, callback) {
    var channel = this.channelService.getChannel(channelName, true);
    if (!!channel) {
        channel.add(playerId, sessionId);
    }

    callback(channel.getMembers());
};
//从频道中获取用户
remote.get = function () {

};
//踢出用户
remote.kick = function (playerId, sessionId, channelName, callback) {
    var channel = this.channelService.getChannel(channelName, false);
    if (!!channel) {
        channel.leave(playerId, sessionId);
        callback();
    }
};