/**
 * Created by Chen on 2015-12-26.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

//持久化数据
var Persistent = function(opts) {
    this.id = opts.id;//对应数据库的ID
    this.type = opts.type;
    EventEmitter.call(this);
};

util.inherits(Persistent, EventEmitter);

module.exports = Persistent;
// Emit the event 'save'
Persistent.prototype.save = function() {
    this.emit('save');
};