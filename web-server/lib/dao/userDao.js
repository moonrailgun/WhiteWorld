/**
 * Created by Chen on 2015-12-01.
 */

var mysql = require('./mysql/mysql');
var userDao = module.exports;

/**
 * Get userInfo by username
 * @param {String} username
 * @param {function} cb
 */
userDao.getUserByName = function (username, cb) {
    var sql = 'select * from account where username = ?';
    var args = [username];
    mysql.query(sql, args, function (err, res) {
        if (err !== null) {
            cb(err.message, null);
        } else {
            if (!!res && res.length === 1) {
                var rs = res[0];
                mysql.query('UPDATE account SET lastLoginTime = now(),loginCount = loginCount + 1 WHERE id = ' + rs.id);
                var user = {id: rs.id, username: rs.username, password: rs.password, from: rs.from};
                cb(null, user);
            } else {
                cb(' user not exist ', null);
            }
        }
    });
};

userDao.createUser = function (username, password, from, callback) {
    var sql = 'insert into account (username,password,`from`,loginCount,lastLoginTime) values(?,?,?,?,?)';
    var args = [username, password, from || '', 1, 'now()'];
    mysql.insert(sql, args, function (err, res) {
        if (err !== null) {
            callback({code: err.number, msg: err.message}, null);
        } else {
            var userId = res.insertId;
            var user = {id: res.insertId, name: username, password: password, loginCount: 1, lastLoginTime: loginTime};
            callback(null, user);
        }
    });
};

userDao.createPlayer = function (userId, playerName, callback) {
    var x = Math.random() * 300 - 150;
    var y = Math.random() * 300 - 150;
    var pos = '(' + x + ',' + y + ')';

    var sql = 'insert into player (userId,playerName,lastPos) values(?,?,?)';
    var args = [userId, playerName, pos];
    mysql.insert(sql, args, function (err, res) {
        if (err !== null) {
            callback({code: err.number, msg: err.message}, null);
        } else {
            var playerId = res.insertId;
            var player = {id: playerId, userId: userId, playerName: playerName, lastPos: pos};
            callback(null, player);
        }
    })
};