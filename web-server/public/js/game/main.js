/**
 * Created by Chen on 2015-12-10.
 */
var app;
var settings = new Settings();
//循环运行
var runLoop = function () {
    app.update();
    app.draw();
};
//初始化
var initApp = function () {
    if (app != null) {
        return;
    }
    app = new App(settings, document.getElementById('game-scene'));
    window.addEventListener('resize', app.resize, false);
    document.addEventListener('mousemove', app.mousemove, false);
    document.addEventListener('mousedown', app.mousedown, false);
    document.addEventListener('mouseup', app.mouseup, false);

    /*document.addEventListener('touchstart',   app.touchstart, false);
     document.addEventListener('touchend',     app.touchend, false);
     document.addEventListener('touchcancel',  app.touchend, false);
     document.addEventListener('touchmove',    app.touchmove, false);*/

    document.addEventListener('keydown', app.keydown, false);
    document.addEventListener('keyup', app.keyup, false);

    setInterval(runLoop,30);//开始执行
};

//强制初始化
var forceInit = function () {
    initApp();
    document.getElementById('unsupported-browser').style.display = "none";
    return false;
};

//添加调试状态显示
var isStatsOn = false;
var addStats = function () {
    if (isStatsOn) {
        return;
    }
    // Draw fps
    var stats = new Stats();
    $('#fps').append(stats.domElement);

    setInterval(function () {
        stats.update();
    }, 1000 / 60);

    // Array Remove - By John Resig (MIT Licensed)
    Array.remove = function (array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };
    isStatsOn = true;
};

//入口程序
var debug = true;
$(function () {
    if (Modernizr.canvas && Modernizr.websockets) {
        initApp();
    } else {
        $('#unsupported-browser').css('display', 'block');
        $('#force-init-button').click(forceInit());
    }

    if (debug) {
        addStats();
    }

    //定义连接到外部文档的a标签的事件
    $('a[rel=external]').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });
});