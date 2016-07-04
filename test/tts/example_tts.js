var watson = require('watson-developer-cloud');
var fs = require('fs');
var tts = watson.text_to_speech({
	username: 'b83c7e97-fda0-49c4-9769-c44cc348b269',
	password: 'zyvKDidEPepQ',
	version: 'v1'
});

var params = {
	text: '你好',
	voice: 'en-US_AllisonVoice',
	accept: 'audio/wav'
};

tts.synthesize(params).pipe(fs.createWriteStream('hello_world.wav'));
/*
tts.voices(null, function(err, voices){
	if (err)
		console.log('error:', err);
	else
		console.log(JSON.stringify(voices, null, 2));
});
*/
