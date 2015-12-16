/**
 * Created by Chen on 2015-12-10.
 */

var Camera = function (aCanvas, aContext, x, y) {
    var camera = this;
    var canvas = aCanvas;
    var context = aContext;

    camera.x = x;
    camera.y = y;

    camera.minZoom = 1.3;
    camera.maxZoom = 1.8;
    camera.zoom = this.minZoom;

    this.update = function(userplayer) {
        var targetZoom = (camera.maxZoom + (camera.minZoom - camera.maxZoom) * Math.min(userplayer.momentum, userplayer.maxMomentum) / userplayer.maxMomentum);
        camera.zoom += (targetZoom - camera.zoom) / 60;

        //位移
        var delta = {
            x: (userplayer.x - camera.x) / 30,
            y: (userplayer.y - camera.y) / 30
        };

        if(Math.abs(delta.x) + Math.abs(delta.y) > 0.1) {
            camera.x += delta.x;
            camera.y += delta.y;
        }
    };

    camera.setupContext = function () {
        var translateX = canvas.width / 2 - camera.x * camera.zoom;
        var translateY = canvas.height / 2 - camera.y * camera.zoom;

        // Reset transform matrix
        context.setTransform(1, 0, 0, 1, 0, 0);//定义变换矩阵为标准矩阵
        context.fillStyle = '#f5f5f5';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.translate(translateX, translateY);//移动画布(0,0)位置到中心位置
        context.scale(camera.zoom, camera.zoom);

        if (debug) {
            drawDebug();
        }
    };

    camera.startUILayer = function () {
        context.setTransform(1, 0, 0, 1, 0, 0);
    };

    // 获取当前位置的边界
    camera.getBounds = function () {
        return [
            {x: camera.x - canvas.width / 2 / camera.zoom, y: camera.y - canvas.height / 2 / camera.zoom},
            {x: camera.x + canvas.width / 2 / camera.zoom, y: camera.y + canvas.height / 2 / camera.zoom}
        ];
    };

    // 获取最小缩放的边界
    camera.getOuterBounds = function () {
        return [
            {x: camera.x - canvas.width / 2 / camera.minZoom, y: camera.y - canvas.height / 2 / camera.minZoom},
            {x: camera.x + canvas.width / 2 / camera.minZoom, y: camera.y + canvas.height / 2 / camera.minZoom}
        ];
    };

    // 获取最大缩放的边界
    camera.getInnerBounds = function () {
        return [
            {x: camera.x - canvas.width / 2 / camera.maxZoom, y: camera.y - canvas.height / 2 / camera.maxZoom},
            {x: camera.x + canvas.width / 2 / camera.maxZoom, y: camera.y + canvas.height / 2 / camera.maxZoom}
        ];
    };

    var debugBounds = function (bounds, text) {
        context.strokeStyle = '#666';
        context.beginPath();
        context.moveTo(bounds[0].x, bounds[0].y);
        context.lineTo(bounds[0].x, bounds[1].y);
        context.lineTo(bounds[1].x, bounds[1].y);
        context.lineTo(bounds[1].x, bounds[0].y);
        context.closePath();
        context.stroke();
        context.fillText(text, bounds[0].x + 10, bounds[0].y + 10);
    };

    var drawDebug = function () {
        debugBounds(camera.getInnerBounds(), 'Maximum zoom camera bounds');
        debugBounds(camera.getOuterBounds(), 'Minimum zoom camera bounds');
        debugBounds(camera.getBounds(), 'Current zoom camera bounds');
    };
};