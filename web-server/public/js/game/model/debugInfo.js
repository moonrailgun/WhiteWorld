/**
 * Created by Chen on 2015-12-12.
 */
var DebugInfo = function (_gameManager) {
    var gameManager = _gameManager;
    var $debugInfo = $('#debugInfo');
    this.update = function () {
        if ($debugInfo) {
            var str = '';
            str += '鼠标坐标(' + gameManager.getMouse().x.toFixed(2) + ',' + gameManager.getMouse().y.toFixed(2) + ')<br/>'
                + '鼠标世界坐标(' + gameManager.getMouse().worldx.toFixed(2) + ',' + gameManager.getMouse().worldy.toFixed(2) + ')<br/>'
            + '刷新间隔时间:' + gameManager.getDeltaTime();

            $debugInfo.html(str);
        }
    };
};