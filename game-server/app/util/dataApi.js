/**
 * Created by Chen on 2015-12-20.
 */
var area = require('../../config/data/area.json');

var Data = function (data) {
    var fields = {};
    data[1].forEach(function (i, k) {
        fields[i] = k;
    });
    data.splice(0, 2);

    var result = {}, item;
    data.forEach(function (k) {
        item = mapData(fields, k);
        result[item.id] = item;
    });
    this.data = result;
};

var mapData = function (fields, item) {
    var obj = {};
    for (var k in fields) {
        obj[k] = item[fields[k]];
    }
    return obj;
};

Data.prototype.findBy = function(attr, value){
    var result = [];
    var i,item;
    for(i in this.data){
        item = this.data[i];
        if(item[attr] == value){
            result.push(item);
        }
    }
    return result;
};

Data.prototype.findBigger = function(attr,value){
    var result = [];
    value = Number(value);
    var i, item;
    for (i in this.data) {
        item = this.data[i];
        if (Number(item[attr]) >= value) {
            result.push(item);
        }
    }
    return result;
};

Data.prototype.findSmaller = function(attr, value) {
    var result = [];
    value = Number(value);
    var i, item;
    for (i in this.data) {
        item = this.data[i];
        if (Number(item[attr]) <= value) {
            result.push(item);
        }
    }
    return result;
};

Data.prototype.findById = function(id) {
    return this.data[id];
};

Data.prototype.all = function() {
    return this.data;
};

module.exports = {
    area: new Data(area),
};