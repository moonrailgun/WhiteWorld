/**
 * Created by Chen on 2015-12-23.
 */

(function () {
    var menuContent = $('#menu-content');
    $('#menu-button').click(function (event) {
        event.stopPropagation();//阻止事件冒泡
        menuContent.toggle(400);
    });
})();