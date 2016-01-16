/**
 * Created by Chen on 2016-01-12.
 */

var GameManager = function(_canvas){
    var sceneManager,
        canvas,
        context,
        mouse = {x: 0, y: 0, worldx: 0, worldy: 0, player: null},
        keyNav = {x: 0, y: 0},
        camera,
        client,
        userplayer = null,
        allPlayerList = [],
        deltaTime = 0,
        prevTime = Date.now(),
        debugInfo = new DebugInfo(this);

    var init = function(){
        window.addEventListener('resize', resizeCanvas, false);
        var $gameScene = $('#game-scene');
        $gameScene.mousemove(mousemove);
        $gameScene.mousedown(mousedown);
        $gameScene.mouseup(mouseup);

        //document.addEventListener('touchstart', touchstart, false);
        //document.addEventListener('touchend', touchend, false);
        //document.addEventListener('touchcancel', touchend, false);
        //document.addEventListener('touchmove', touchmove, false);

        document.addEventListener('keydown', keydown, false);
        document.addEventListener('keyup', keyup, false);
    };
    var loop = function(){
        update();
        draw();
    };

    var update = function(){
        updateDeltaTime();

        if (keyNav.x != 0 || keyNav.y != 0) {//键盘控制
            userplayer.userUpdate(allPlayerList, userplayer.x + keyNav.x, userplayer.y + keyNav.y);
        } else {//鼠标|触摸控制
            var mvp = getMouseWorldPosition();
            mouse.worldx = mvp.x;
            mouse.worldy = mvp.y;
            userplayer.userUpdate(allPlayerList, mouse.worldx, mouse.worldy);
        }

        camera.update(userplayer);
        userplayer.update();

        updateUserPosition();//更新坐标显示

        if(debug){
            debugInfo.update();
        }
    };
    var draw = function(){
        camera.setupContext();
        userplayer.draw(context);
        camera.startUILayer();
    };

    var mousemove = function(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    var mousedown = function(e){
        mouse.clicking = true;

        if (mouse.player && mouse.player.hover && mouse.player.onclick(e)) {
            return;
        }
        if (userplayer && e.which == 1) {
            userplayer.momentum = userplayer.targetMomentum = userplayer.maxMomentum;//更新动量
        }
    };
    var mouseup = function(e){
        if (userplayer && e.which == 1) {
            userplayer.targetMomentum = 0;
        }
    };

    /* 暂时注释移动支持
    var touchstart = function (e) {
        e.preventDefault();
        mouse.clicking = true;

        if (!!userplayer) {
            userplayer.momentum = userplayer.targetMomentum = userplayer.maxMomentum;
        }

        var touch = e.changedTouches.item(0);
        if (touch) {
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    };
    var touchend = function (e) {
        if (!!userplayer) {
            userplayer.targetMomentum = 0;
        }
    };
    var touchmove = function (e) {
        e.preventDefault();

        var touch = e.changedTouches.item(0);
        if (touch) {
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    };*/

    var keydown = function (e) {
        if (e.keyCode == keys.up) {
            keyNav.y = -1;
            userplayer.momentum = userplayer.targetMomentum = userplayer.maxMomentum;
            e.preventDefault();
        }
        else if (e.keyCode == keys.down) {
            keyNav.y = 1;
            userplayer.momentum = userplayer.targetMomentum = userplayer.maxMomentum;
            e.preventDefault();
        }
        else if (e.keyCode == keys.left) {
            keyNav.x = -1;
            userplayer.momentum = userplayer.targetMomentum = userplayer.maxMomentum;
            e.preventDefault();
        }
        else if (e.keyCode == keys.right) {
            keyNav.x = 1;
            userplayer.momentum = userplayer.targetMomentum = userplayer.maxMomentum;
            e.preventDefault();
        }
    };
    var keyup = function (e) {
        if (e.keyCode == keys.up || e.keyCode == keys.down) {
            keyNav.y = 0;
            if (keyNav.x == 0 && keyNav.y == 0) {
                userplayer.targetMomentum = 0;
            }
            e.preventDefault();
        }
        else if (e.keyCode == keys.left || e.keyCode == keys.right) {
            keyNav.x = 0;
            if (keyNav.x == 0 && keyNav.y == 0) {
                userplayer.targetMomentum = 0;
            }
            e.preventDefault();
        }
    };

    //重设画布大小
    var resizeCanvas = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    var getMouseWorldPosition = function () {
        return {
            x: (mouse.x + (camera.x * camera.zoom - canvas.width / 2)) / camera.zoom,
            y: (mouse.y + (camera.y * camera.zoom - canvas.height / 2)) / camera.zoom
        }
    };
    var updateDeltaTime = function(){
        deltaTime = Date.now() - prevTime;
        prevTime = Date.now();
    };
    this.getMouse = function(){
        return mouse;
    };
    this.getDeltaTime = function(){
        return deltaTime;
    };

    var $userPosition = $('#position');
    var updateUserPosition = function () {
        var x = userplayer.x.toFixed(2);
        var y = userplayer.y.toFixed(2);

        $userPosition.text('(' + x + ',' + y + ')');
    };

    (function(){
        //初始化
        if(!!sceneManager){
            console.log('scene have been init');
            return;
        }
        sceneManager = new SceneManager(canvas);

        canvas = _canvas;
        context = canvas.getContext('2d');
        resizeCanvas();

        client = new Client();
        client.connect(function(player){
            console.log(player);
            userplayer = new Player(player);
            camera = new Camera(canvas, context, userplayer.x, userplayer.y);

            init();//初始化事件绑定

            setInterval(loop, 30);//运行程序
        });
    })()
};