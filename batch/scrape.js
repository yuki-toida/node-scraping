var client = require('cheerio-httpcli');
var db = require('../models/mysql');
var info = require('../models/scrape_info');
var urlUtil = require('../models/url_util');

var now = db.getMySQLDate(new Date());

for(i=0; i<info.length; i++) {
    var queryStr = {search_query: info[i].searchQuery, cat: info[i].category};
    client.fetch('https://www.youtube.com/results', queryStr, function (err, $, res) {
        if (err) throw err;

        // urlからクエリストリングGET
        var cat = urlUtil.getQueryString(res.request.uri.href, 'cat');

	    $("ol[class='item-section']").children("li").each(function (idx) {
	        var target = $(this).find("h3[class='yt-lockup-title']").children("a");
            var title = target.attr("title");

            // title: undefined, null, '' は除外
            if (!title) return;

			var post = {
                Category: cat,
                Title: title,
	            Url: 'http://youtube.com' + target.attr("href"),
				AddTime: now
			};

            // 通常コネクション接続
			db.getConnection.query('INSERT INTO ScrapeInfo SET ?', post, function(err, result) {
				if (err) throw err;
			});

            // コネクションプール接続
			//db.getConnection(function(err, connection) {
			//connection.query('INSERT INTO ScrapeInfo SET ?', post, function(err, result) {
			//		if (err) throw err;
			//	});
			//});
	    });
	});

    // 間隔実行
    //var hoge = new Date().getTime();
    //var fuga = new Date().getTime();
    //while(fuga < hoge + 1000) {
    //    fuga = new Date().getTime();
    //}
}

