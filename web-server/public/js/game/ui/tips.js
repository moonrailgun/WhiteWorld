/**
 * Created by Chen on 2015-12-12.
 */

var Tips = function () {
    var tips = this;
    var tipList = [];
    tips.add = function (tip) {
        if(tipList.length > 0){
            var height = $(tip.getDom()).outerHeight() + 10;
            tips.up(height);
        }
        tipList.push(tip);
        tip.show(null,function(_tip){
            var index = tipList.indexOf(_tip);
            tipList.splice(index, 1);
        });
    };

    tips.up = function(height){
        var value = height ? height : 46;
        if(tipList.length > 0){
            for(var i = 0;i<tipList.length;i++){
                tipList[i].upAnim(value);
            }
        }
    };

    (function () {
        if (!$('#tips')) {
            $('body').append('<div id="tips"></div>')
        }
    })();
};
var Tip = function (text) {
    var tip = this;
    tip.text = text;
    tip.life = 2000;
    tip.show = function (animType,callback) {
        var type = animType ? animType : 'default';
        var dom = tip.getDom();
        dom.css('display', 'block');

        if (type == 'default') {
            defaultAnim(dom);
        }

        setTimeout(function () {
            tip.removeAnim(function(){
                callback(tip);
            });
        }, tip.life);
    };

    tip.upAnim = function(value){
        var dom = tip.getDom();
        $(dom).animate({
            bottom : '+=' + value
        },200);
    };

    tip.removeAnim = function(callback){
        var dom = tip.getDom();
        $(dom).animate({
            opacity : '0'
        },500, function(){
            $(dom).remove();
            callback();
        });
    };

    var dom;
    tip.getDom = function () {
        if (!dom) {
            dom = $('<div class="tip">' + tip.text + '</div>')
                .appendTo('#tips');
        }
        return dom;
    };

    var defaultAnim = function (dom) {
        $(dom).animate({
            left: '6px',
            opacity : '1'
        },500);
    };
};

var tips = new Tips();