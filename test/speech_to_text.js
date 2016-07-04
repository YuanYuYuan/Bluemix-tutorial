var watson = require('watson-developer-cloud');
var fs = require('fs');
var speech_to_text = watson.speech_to_text({
	username: '43dac526-4c6c-4164-a9ea-65b618fb3f38',
	password: 'wjCIK3o4rLuo',
	version: 'v1'
});
var params = {
	audio: fs.createReadStream('./resources/speech.wav'),
	content_type: 'audio/l16; rate=44100'
};
speech_to_text.recognize(params, function(err, res){
	if(err)
		console.log(err);
	else
		console.log(JSON.stringify(res, null, 2));
});

fs.createReadStream('./resources/speech.wav')
	.pipe(speech_to_text.createRecognizeStream({content_type: 'audio/l16; rate=44100'}))
	.pipe(fs.createWriteStream('./transcription.txt'));

