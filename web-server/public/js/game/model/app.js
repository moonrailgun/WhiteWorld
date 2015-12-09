/**
 * Created by Chen on 2015-12-10.
 */

var App = function(){
    var app = this;
    var canvas,
        mouse = {x:0,y:0,worldx:0,worldy:0,player:null},
        keyNav = {x:0,y:0};

    app.userplayer = new Player();//玩家自身

    app.update = function(){

    };
    app.mousedown = function(e) {
        mouse.clicking = true;

        if(mouse.player && mouse.player.hover && mouse.player.onclick(e)) {
            return;
        }
        if(app.userplayer && e.which == 1) {
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
        }
    };
    app.mouseup = function(e) {
        if(app.userplayer && e.which == 1) {
            app.userplayer.targetMomentum = 0;
        }
    };
    app.mousemove = function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    app.keydown = function(e){
        if(e.keyCode == keys.up) {
            keyNav.y = -1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
        else if(e.keyCode == keys.down) {
            keyNav.y = 1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
        else if(e.keyCode == keys.left) {
            keyNav.x = -1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
        else if(e.keyCode == keys.right) {
            keyNav.x = 1;
            app.userplayer.momentum = app.userplayer.targetMomentum = app.userplayer.maxMomentum;
            e.preventDefault();
        }
    };
    app.keyup = function(e) {
        if(e.keyCode == keys.up || e.keyCode == keys.down) {
            keyNav.y = 0;
            if(keyNav.x == 0 && keyNav.y == 0) {
                app.userplayer.targetMomentum = 0;
            }
            e.preventDefault();
        }
        else if(e.keyCode == keys.left || e.keyCode == keys.right) {
            keyNav.x = 0;
            if(keyNav.x == 0 && keyNav.y == 0) {
                app.userplayer.targetMomentum = 0;
            }
            e.preventDefault();
        }
    };
};