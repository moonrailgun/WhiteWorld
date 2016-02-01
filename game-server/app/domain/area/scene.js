/**
 * Created by Chen on 2015-12-31.
 */

var Area = require('./area');
var Map = require('../map/map');

var exp = module.exports;

var area = null;

exp.init = function (opts) {
    if (!area) {
        opts.weightMap = true;
        opts.map = new Map(opts);//新建区域地图数据实例
        area = new Area(opts);//新建区域管理对象实例
    }
};

exp.getArea = function () {
    return area;
};