/**
 * Created by Chen on 2016-01-15.
 */

var Entity = function(opts){
    this.entityId = opts.entityId || -1;
    this.kindId = opts.kindId || -1;
    this.type = opts.type || EntityType.PLAYER;

    this.x = opts.x || 0;
    this.y = opts.y || 0;

    this.scene = opts.scene || null;
    this.map = opts.map || null;
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

