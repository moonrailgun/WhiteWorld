/**
 * Created by Chen on 2015-12-16.
 */

var Code = require('../../../../../shared/code');
var logger = require('pomelo-logger').getLogger(__filename);
var utils = require('../../../util/utils');
var consts = require('../../../consts/consts');
var pomelo = require('pomelo');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.send = function(msg, session, next){
    var playerId = session.get('playerId');
    var playerName = session.get('playerName');
    console.log(msg);
    console.log(playerId);
    console.log(playerName);

    next(null, {code:Code.OK});
};