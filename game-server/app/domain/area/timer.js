/**
 * Created by Chen on 2015-12-26.
 * 场景计时器
 */

var EntityType = require('../../consts/consts').EntityType;
var logger = require('pomelo-logger').getLogger(__filename);

var Timer = function (opts) {
    this.area = opts.area;
    this.interval = opts.interval || 100;//默认tick周期为100ms
};

module.exports = Timer;

Timer.prototype.run = function () {
    this.interval = setInterval(this.tick.bind(this), this.interval);//使用bind将timer对象传递
};

Timer.prototype.close = function () {
    clearInterval(this.interval);
    logger.info('[' + this.area.serverId + '] scene ' + this.area.areaId + ' timer has been closed!');
};
var i = 0;
Timer.prototype.tick = function () {
    var area = this.area;
    //todo Update all the items
};