/**
 * Created by Chen on 2015-12-30.
 */

//var buildFinder = require('pomelo-pathfinding').buildFinder;
var PathCache = require('../../util/pathCache');
var logger = require('pomelo-logger').getLogger(__filename);


var Map = function(opts){
    this.mapPath = process.cwd() + opts.path;
    this.map = null;
    this.weightMap = null;
    this.name = opts.name;

    this.init(opts);
};

var pro = Map.prototype;

Map.prototype.init = function(opts){
    var weightMap = opts.weightMap || false;
    var map = require(this.mapPath);
    if(!map){
        logger.error('读取地图失败');
    }else{
        this.configMap(map);
        this.id = opts.id;
        this.width = opts.width;
        this.height = opts.height;
        this.tileW = 20;
        this.tileH = 20;
        this.rectW = Math.ceil(this.width / this.tileW);
        this.rectH = Math.ceil(this.height/ this.tileH);

        this.pathCache = new PathCache({limit:1000});
        //this.pfinder = buildFinder(this);
    }
};

Map.prototype.configMap = function(map){
    this.map = {};
    var layers = map.layers;
    for(var i = 0;i<layers.length;i++){
        var layer = layers[i];
        if(layer.type === 'objectgroup'){
            this.map[layer.name] = configObjectGroup(layer.object);
        }
    }
};

function configProps(obj){
    if(!!obj && !!obj.properties){
        for(var key in obj.properties){
            obj[key] = obj.properties[key];
        }

        delete obj.properties;
    }

    return obj;
}

function configObjectGroup(objs){
    for(var i = 0; i < objs.length; i++){
        objs[i] = configProps(objs[i]);
    }

    return objs;
}

module.exports = Map;