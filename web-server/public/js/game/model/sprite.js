/**
 * Created by Chen on 2016-01-15.
 */

var Sprite = function(opts){
    this.entity = opts;
    this.mapNode = this.entity.map.node;
    this.curNode = null;

    this.moveAnimation = null;
    this.attackAnimation = null;
    this.diedAnimation = null;
    this.standAnimation = null;
    this.standFrameLoop = null;
    this.walkAnimation = null;
    this.walkFrameLoop = null;
    this._init();
};

Sprite.prototype._init = function() {
    var startAin = 'Stand';
    var type = this.entity.type;
    if (type === EntityType.PLAYER || type === EntityType.MOB) {
        //this._initDynamictNode(aniOrientation.LEFT_DOWN + startAin);
    } else if (type === EntityType.NPC || type === EntityType.ITEM || type === EntityType.EQUIPMENT) {
        //this._initStaticNode();
    }
};