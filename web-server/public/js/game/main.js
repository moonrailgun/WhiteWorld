/**
 * Created by Chen on 2015-12-10.
 */

var initApp = function() {
    if (app!=null) { return; }
    app = new App(settings, document.getElementById('game-scene'));

    window.addEventListener('resize', app.resize, false);

    document.addEventListener('mousemove', 		app.mousemove, false);
    document.addEventListener('mousedown', 		app.mousedown, false);
    document.addEventListener('mouseup',			app.mouseup, false);

    /*document.addEventListener('touchstart',   app.touchstart, false);
    document.addEventListener('touchend',     app.touchend, false);
    document.addEventListener('touchcancel',  app.touchend, false);
    document.addEventListener('touchmove',    app.touchmove, false);*/

    document.addEventListener('keydown',    app.keydown, false);
    document.addEventListener('keyup',    app.keyup, false);

    //setInterval(runLoop,30);
};