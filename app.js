var client = require('cheerio-httpcli');

client.fetch('http://www.google.com/search', { q: 'node.js' }, function(err, $, res) {
	//console.log(res.headers);
	//console.log($('title').text());

	$('a').each(function(idx) {
		console.log($(this).attr('href'));
	});

	if (err) {
		console.log(err);
	}
});
