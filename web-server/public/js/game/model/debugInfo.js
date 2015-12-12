/**
 * Created by Chen on 2015-12-12.
 */
var DebugInfo = function (aMouse) {
    var mouse = aMouse;
    var $debugInfo = $('#debugInfo');
    this.update = function () {
        if ($debugInfo) {
            var str = '';
            str += '鼠标坐标(' + mouse.x.toFixed(2) + ',' + mouse.y.toFixed(2) + ')<br/>'
                + '鼠标世界坐标(' + mouse.worldx.toFixed(2) + ',' + mouse.worldy.toFixed(2) + ')';

            $debugInfo.html(str);
        }
    };
};