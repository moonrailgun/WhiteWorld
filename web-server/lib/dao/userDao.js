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
                mysql.query('UPDATE account SET lastLoginTime = now() WHERE id = ' + rs.id);
                var user = {id: rs.id, username: rs.username, password: rs.password, from: rs.from};
                cb(null, user);
            } else {
                cb(' user not exist ', null);
            }
        }
    });
};

/**
 * Create a new user
 * @param {String} username
 * @param {String} password
 * @param {String} from Register source
 * @param {function} cb Call back function.
 */
userDao.createUser = function (username, password, from, cb) {
    var sql = 'insert into account (username,password,`from`,loginCount,lastLoginTime) values(?,?,?,?,?)';
    var args = [username, password, from || '', 1, 'now()'];
    mysql.insert(sql, args, function (err, res) {
        if (err !== null) {
            cb({code: err.number, msg: err.message}, null);
        } else {
            var userId = res.insertId;
            var user = {id: res.insertId, name: username, password: password, loginCount: 1, lastLoginTime: loginTime};
            cb(null, user);
        }
    });
};