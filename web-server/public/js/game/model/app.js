/**
 * Created by Chen on 2015-12-10.
 */

var App = function (aSettings, aCanvas) {
    var app = this;
    var canvas,
        context,
        mouse = {x: 0, y: 0, worldx: 0, worldy: 0, player: null},
        keyNav = {x: 0, y: 0};

    app.camera = null;
    app.userplayer = null;//玩家自身对象
    app.settings = new Settings();//配置文件

    app.update = function () {
        app.camera.update(app.userplayer);
    };
    app.draw = function () {
        app.camera.setupContext();
        app.userplayer.draw(context);
        app.camera.startUILayer();
    };

    app.mousedown = function (e) {
        mouse.clicking = true;

        if (mouse.player && mouse.player.hover && mouse.player.onclick(e)) {
            return;
        }
        if (app.userplayer && e.which == 1) {
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
        }
    };
    app.mouseup = function (e) {
        if (app.userplayer && e.which == 1) {
            app.userplayer.targetMomentum = 0;
        }
    };
    app.mousemove = function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    app.keydown = function (e) {
        if (e.keyCode == keys.up) {
            keyNav.y = -1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
        else if (e.keyCode == keys.down) {
            keyNav.y = 1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
        else if (e.keyCode == keys.left) {
            keyNav.x = -1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
        else if (e.keyCode == keys.right) {
            keyNav.x = 1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
    };
    app.keyup = function (e) {
        if (e.keyCode == keys.up || e.keyCode == keys.down) {
            keyNav.y = 0;
            if (keyNav.x == 0 && keyNav.y == 0) {
                app.userplayer.targetMomentum = 0;
            }
            e.preventDefault();
        }
        else if (e.keyCode == keys.left || e.keyCode == keys.right) {
            keyNav.x = 0;
            if (keyNav.x == 0 && keyNav.y == 0) {
                app.userplayer.targetMomentum = 0;
            }
            e.preventDefault();
        }
    };

    app.resize = function (e) {
        resizeCanvas();
    };

    var resizeCanvas = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    (function () {
        //初始化画布
        canvas = aCanvas;
        context = canvas.getContext('2d');
        resizeCanvas();

        app.userplayer = new Player();
        app.camera = new Camera(canvas, context, app.userplayer.x, app.userplayer.y);
    })();
};