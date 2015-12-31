/**
 * Created by Chen on 2015-12-26.
 */

var EntityType = require('../../consts/consts').EntityType;
var logger = require('pomelo-logger').getLogger(__filename);

var Timer = function(opts){
    this.area = opts.area;
    this.interval = opts.interval || 100;
};

module.exports = Timer;

Timer.prototype.run = function(){
    this.interval = setInterval(this.tick.bind(this), this.interval);
};

Timer.prototype.close = function(){
    clearInterval(this.interval);
};

Timer.prototype.tick = function(){
    var area = this.area;
    logger.error('未完成');
};