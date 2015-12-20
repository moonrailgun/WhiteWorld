/**
 * Created by Chen on 2015-12-20.
 */

var Action = function(opts){
    this.data = opts.data;
    this.type = opts.type || 'defaultAction';

    this.finished = false;
    this.aborted = false;
    this.singleton = opts.singleton || false;
};


Action.prototype.update = function(){

};

module.exports = Action;