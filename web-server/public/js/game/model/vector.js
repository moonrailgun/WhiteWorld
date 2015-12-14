/**
 * Created by Chen on 2015-12-14.
 */

var Vector2 = function (x, y) {
    var vector = this;

    vector.x = x ? 0 : x;
    vector.y = y ? 0 : y;
    vector.getLength = function (fixed) {
        var len = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        if (fixed) {
            return len;
        } else {
            return len.toFixed(fixed);
        }
    };

    vector.parse = function (str) {
        if (typeof(str) == 'string' && str.indexOf('(') == 0 && str.indexOf(')') == str.length - 1) {
            var dat = str.substring(1, str.length - 1).split(',');
            var x = Number(dat[0]);
            var y = Number(dat[1]);
            if (x && y) {
                vector.x = x;
                vector.y = y;
            } else {
                console.warn('cant parse this string to vector:' + str);
            }
        } else {
            console.warn('cant parse this string to vector:' + str);
        }
    };

    vector.stringify = function () {
        return '(' + vector.x + ',' + vector.y + ')';
    }
};