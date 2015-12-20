/**
 * Created by Chen on 2015-12-20.
 */

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