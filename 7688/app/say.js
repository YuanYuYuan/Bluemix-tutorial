var exec = require('child_process').exec;
var fs =require('fs');
var request = require('request');
var qs = require('querystring');


module.exports = function speak(words) {

	var params = {
		ie: 'UTF-8',
		total: 1,
		idx: 0,
		textlen: 32,
		client: 'tw-ob',
		q: words,
		tl: 'zh'
	};

	var request_url = "http://translate.google.com/translate_tts?" + qs.stringify(params);
	var options = {
		url: "http://translate.google.com/translate_tts?" + qs.stringify(params),
		headers: {
			'User-Agent': 'Mozilla'
		}
	};

	var writeStream = fs.createWriteStream('./output.mp3');
	writeStream.on('finish', function() {
		console.log('Done and play.');
		exec('madplay -o wave:- output.mp3 | aplay -D plughw:1,0', function(err, stdout, stderr) {
			if (err !== null)
				exec('mpv output.mp3');
		});
	});
	request.get(options).on('error', function(err) {
		console.log(err);
	}).pipe(writeStream);

}

