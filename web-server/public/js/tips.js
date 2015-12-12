/**
 * Created by Chen on 2015-12-12.
 */

var Tips = function () {
    var tips = this;
    var tipList = [];
    tips.add = function (tip) {
        tipList.push(tip);
        tip.show();
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
    tip.show = function (animType) {
        var type = animType ? animType : 'default';
        var dom = tip.getDom();
        dom.css('display', 'block');

        if (type == 'default') {
            defaultAnim(dom);
        }

        setTimeout(function () {
            tip.removeAnim(dom);
        }, tip.life);
    };

    tip.upAnim = function(value){
        var dom = tip.getDom();
        $(dom).animate({
            bottom : '+=' + value
        },200);
    };

    tip.removeAnim = function(){
        var dom = tip.getDom();
        $(dom).animate({
            opacity : '0'
        },500, function(){
            $(dom).remove();
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
setTimeout(function(){
    tips.add(new Tip('123'));
},1000);