var watson = require('watson-developer-cloud');
var fs = require('fs');
var cp = require('child_process');
var cred = JSON.parse(fs.readFileSync('./my-stt-crendential.json'));
var stt = watson.speech_to_text({
	username: cred.credentials.username,
	password: cred.credentials.password,
	version: 'v1'
});

module.exports = function listen() {

	var params = {
		model: 'zh-CN_BroadbandModel',
		content_type: 'audio/wav',
		continuous: true
	};

	var recognizeStream =  stt.createRecognizeStream(params);
	var record = cp.spawn('arecord', ['--device=plughw:1,0', '--rate=22000']);
	record.stderr.pipe(process.stderr);
	record.stdout.pipe(recognizeStream);
	//setTimeout(function() {
	//	record.kill();
	//}, 1000);
	recognizeStream.setEncoding('utf-8');
	recognizeStream.on('results', function(data) {
		if(data.results[0] && data.results[0].final && data.results[0].alternatives) {
			//console.log(JSON.stringify(data, null, 2));
			return data.results[0].alternatives.transcript
		}
			
	});

}





