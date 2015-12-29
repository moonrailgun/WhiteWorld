/**
 * Created by Chen on 2015-12-29.
 */

var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');

module.exports = function() {
    return new Filter();
};

var Filter = function() {
};

Filter.prototype.before = function(msg, session, next){
    //var area = pomelo.app.areaManager
};