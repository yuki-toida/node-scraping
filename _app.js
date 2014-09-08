var client = require('cheerio-httpcli');
var async = require('async');

var titles = [];
var urls = [];

async.series([
    function(callback) {
        client.fetch('https://www.youtube.com/results', { search_query: 'premier+league' }, function(err, $, res) {
            $("ol[class='item-section']").children("li").each(function(idx) {
                var target = $(this).find("h3[class='yt-lockup-title']").children("a");
                titles[idx] = target.attr("title");
                urls[idx] = target.attr("href");
            });
            console.log(titles.length);
        })
    },
    function(callback) {
        console.log(titles.length);
    }
], function (err, results) {
    if (err) {
        throw err;
    }
    console.log('last');
});
