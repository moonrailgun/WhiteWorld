/**
 * Created by Chen on 2015-12-05.
 */

var util = require('util');

module.exports = function(opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.from = opts.from || '';
    this.password = opts.password;
    this.loginCount = opts.loginCount;
    this.lastLoginTime = opts.lastLoginTime;
};