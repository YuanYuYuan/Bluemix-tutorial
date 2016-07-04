var watson = require('watson-developer-cloud');
var fs = require('fs');
var stt = watson.speech_to_text({
	username: '43dac526-4c6c-4164-a9ea-65b618fb3f38',
	password: 'wjCIK3o4rLuo',
	version: 'v1'
});

var params = {
	model: 'zh-CN_BroadbandModel',
	content_type: 'audio/wav',
};

var recognizeStream = stt.createRecognizeStream(params);
fs.createReadStream('你好.wav').pipe(recognizeStream);
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
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


