/**
 * Created by Chen on 2015-12-10.
 */

var Player = function () {
    var player = this;

    player.uid = -1;//用户唯一标识
    player.name = '';//名字
    player.level = '';//等级

    //位置
    player.x = Math.random() * 300 - 150;
    player.y = Math.random() * 300 - 150;

    //移动
    player.momentum = 0;
    player.maxMomentum = 3;
    player.angle = Math.PI * 2;

    player.targetX = 0;
    player.targetY = 0;
    player.targetMomentum = 0;

    player.messages = [];//信息框

    player.update = function () {

    };

    player.draw = function (context) {
        context.fillStyle = 'rgba(0,0,0,1)';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 6;
        context.shadowColor = 'rgba(0, 0, 0, 0.7)';

        // 画圆
        context.beginPath();
        context.arc(player.x, player.y, 4, 0, 2 * Math.PI);
        context.fill();

        // 清除画笔修改
        context.shadowBlur = 0;
        context.shadowColor = '';
    };

    //绘制名字
    var drawName = function (context) {
        context.fillStyle = 'rgba(226,219,226,' + opacity + ')';
        context.font = 7 + "px 'proxima-nova-1','proxima-nova-2', arial, sans-serif";
        context.textBaseline = 'hanging';
        var width = context.measureText(player.name).width;
        context.fillText(player.name, player.x - width / 2, player.y + 8);
    };

    //绘制信息
    var drawMessages = function (context) {
        player.messages.reverse();
        for (var i = 0, len = tadpole.messages.length; i < len; i++) {
            player.messages[i].draw(context, tadpole.x + 10, tadpole.y + 5, i);
        }
        player.messages.reverse();
    };
};