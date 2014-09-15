var mysql = require('mysql');
var config = require('config');

var model = (function() {
    // MySQLコネクション接続
	var _connection = mysql.createConnection({
		host	:	config.db.host,
		user	:	config.db.user,
		password:	config.db.pass,
		database:	config.db.name
	});

    // MySQLコネクションプール接続
	var _pool = mysql.createPool({
		host	:	config.db.host,
		user	:	config.db.user,
		password:	config.db.pass,
		database:	config.db.name
	});
	var _getPool = function(callback) {
		_pool.getConnection(function(err, connection) {
			callback(err, connection);
		});
	};

	// MySQLのdatetime型に変換し返却
	var _getMySQLDate = function(dt) {
		var timestamp = dt.getFullYear()
			+String(dt.getMonth()+101).substr(1,2)
			+String(dt.getDate()+100).substr(1,2)
			+String(dt.getHours()+100).substr(1,2)
			+String(dt.getMinutes()+100).substr(1,2)
			+String(dt.getSeconds()+100).substr(1,2);
	
		timestamp.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
		var datetime = RegExp.$1+'-'+RegExp.$2+'-'+RegExp.$3+' '+RegExp.$4+':'+RegExp.$5+':'+RegExp.$6;
		return datetime;
	}
    
	return {
        getConnection: _connection,
        getPool: _getPool,
        getMySQLDate: _getMySQLDate
	};
}());

module.exports = model;
