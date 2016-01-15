/**
 * Created by Chen on 2016-01-15.
 */

var Entity = function(opts){
    this.entityId = opts.entityId;
    this.kindId = opts.kindId;
    this.type = opts.type;

    this.x = opts.x;
    this.y = opts.y;

    this.scene = opts.scene;
    this.map = opts.map;
};

Entity.prototype.setPosition = function(x,y){
    this.x = x;
    this.y = y;
};

Entity.prototype.getPosition = function(){
    return {
        x: this.x,
        y: this.y
    }
};

