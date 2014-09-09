var client = require('cheerio-httpcli');

var titles = [];
var urls = [];

client.fetch('https://www.youtube.com/results', { search_query: 'premier+league' }, function (err, $, res) {
    $("ol[class='item-section']").children("li").each(function (idx) {
        var target = $(this).find("h3[class='yt-lockup-title']").children("a");
        titles[idx] = target.attr("title");
        urls[idx] = target.attr("href");
        console.log(titles[idx]);
    });
});
