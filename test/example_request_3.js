var watson = require('watson-developer-cloud');
var fs = require('fs');
var stt = watson.speech_to_text({
	username: '43dac526-4c6c-4164-a9ea-65b618fb3f38',
	password: 'wjCIK3o4rLuo',
	version: 'v1'
});
var params = {
	content_type: 'audio/wav',
	continous: true,
	interim_results: true
};

var recognizeStream = stt.createRecognizeStream(params);
fs.createReadStream('audio-file.wav').pipe(recognizeStream);
recognizeStream.pipe(fs.createWriteStream('transcripttion.txt'));
recognizeStream.setEncoding('utf-8');

recognizeStream.on('data', function(event){
	onEvent('Data:', event);
});
recognizeStream.on('results', function(event){
	onEvent('Results:', event);
});
recognizeStream.on('error', function(event){
	onEvent('Error:', event);
});
recognizeStream.on('close-connection', function(event){
	onEvent('Close:', event);
});

function onEvent(name, event){
	console.log(name, JSON.stringify(event, null, 2));
};
