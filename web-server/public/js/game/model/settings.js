/**
 * Created by Chen on 2015-12-10.
 */

// 此文件下载者不用更改，兼容其他域名使用
var Settings = function() {
    // 如果是workerman.net phpgame.cn域名 则采用多个接入端随机负载均衡
    var domain_arr = ['kedou.workerman.net'];
    //this.socketServer = 'ws://'+domain_arr[Math.floor(Math.random() * domain_arr.length + 1)-1]+':8280';
    this.socketServer = 'ws://127.0.0.1:3000';
};