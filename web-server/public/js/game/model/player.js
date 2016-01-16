/**
 * Created by Chen on 2015-12-10.
 */

var Player = function (opts) {
    var player = this;
    Entity.call(this,opts);

    player.userId = opts.userId || -1;//用户唯一标识
    player.playerId = opts.playerId || -1;//玩家唯一标识
    player.playerName = opts.playerName || '';//名字
    //player.level = opts.level || '';//等级

    player.isHover = false;

    //位置
    player.x = opts.x || Math.random() * 300 - 150;
    player.y = opts.y || Math.random() * 300 - 150;

    //移动
    player.momentum = 0;
    player.maxMomentum = 3;
    player.angle = Math.PI * 2;

    player.targetX = 0;
    player.targetY = 0;
    player.targetMomentum = 0;

    player.messages = [];//信息框

    //本机玩家更新
    player.userUpdate = function (allPlayerList, angleTargetX, angleTargetY) {
        var prevState = {
            angle: player.angle,
            momentum: player.momentum
        };//上一个状态

        var anglediff = ((Math.atan2(angleTargetY - player.y, angleTargetX - player.x)) - player.angle);
        while (anglediff < -Math.PI) {
            anglediff += Math.PI * 2;
        }
        while (anglediff > Math.PI) {
            anglediff -= Math.PI * 2;
        }

        player.angle += anglediff / 5;

        // Momentum to targetmomentum
        if (player.targetMomentum != player.momentum) {
            player.momentum += (player.targetMomentum - player.momentum) / 20;
        }
        if (player.momentum < 0) {
            player.momentum = 0;
        }
        if (player.momentum > player.maxMomentum) {
            player.momentum = player.maxMomentum;
        }
    };

    player.update = function (mouse) {
        player.x += Math.cos(player.angle) * player.momentum;
        player.y += Math.sin(player.angle) * player.momentum;

        if (player.targetX != 0 || player.targetY != 0) {
            player.x += (player.targetX - player.x) / 20;
            player.y += (player.targetY - player.y) / 20;
        }
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

        drawName(context);
    };

    player.moveTo = function (targetX, targetY) {
        player.targetX = targetX;
        player.targetY = targetY;
    };

    //绘制名字
    var drawName = function (context) {
        var opacity = 0.5;
        if(player.isHover){
            opacity = 1;
        }

        context.fillStyle = 'rgba(66,66,66,' + 0.8 + ')';
        context.font = 1 + "px 'proxima-nova-1','proxima-nova-2', arial, sans-serif";
        context.textBaseline = 'hanging';
        var width = context.measureText(player.playerName).width;
        context.fillText(player.playerName, player.x - width / 2, player.y + 10);
    };

    //绘制信息
    var drawMessages = function (context) {
        player.messages.reverse();
        for (var i = 0, len = player.messages.length; i < len; i++) {
            player.messages[i].draw(context, player.x + 10, player.y + 5, i);
        }
        player.messages.reverse();
    };
};