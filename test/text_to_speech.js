var watson = require('watson-developer-cloud');
var fs = require('fs');

var text_to_speech = watson.text_to_speech({
	username: 'b83c7e97-fda0-49c4-9769-c44cc348b269',
	password: 'zyvKDidEPepQ',
	version: 'v1'
});

var params = {

	text: 'hello from IBM watson',
	voice: 'en-US_AllisonVoice',
	accept: 'audio/wav'
};

text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
