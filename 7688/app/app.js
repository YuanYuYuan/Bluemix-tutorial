var watson = require('watson-developer-cloud');
var speak = require('./say');
var fs = require('fs');
var cp = require('child_process');
var cred = JSON.parse(fs.readFileSync('./my-stt-crendential.json'));
var stt = watson.speech_to_text({
	username: cred.username,
	password: cred.password,
	version: 'v1'
});

function listen() {

	var params = {
		model: 'zh-CN_BroadbandModel',
		content_type: 'audio/wav',
		continuous: true
	};

	var recognizeStream =  stt.createRecognizeStream(params);
	var record = cp.spawn('arecord', ['--device=plughw:1,0', '--rate=22000']);
	record.stderr.pipe(process.stderr);
	record.stdout.pipe(recognizeStream);
	recognizeStream.setEncoding('utf-8');
	recognizeStream.on('results', function(data) {
		if(data.results[0] && data.results[0].final && data.results[0].alternatives) {
			console.log(JSON.stringify(data, null, 2));
			dialog(data.results[0].alternatives[0].transcript);
		}
			
	});

}

function dialog(text) {
	if (String(text).indexOf('不好') > -1)
		speak('我好難過嗚嗚嗚嗚嗚');
	else if (String(text).indexOf('好') > -1)
		speak('你好啊, 我是7688');
	else if (String(text).indexOf('介') > -1)
		speak('大家好，我叫7688，我來自CAVE，我會陪你聊天，還會講笑話跟唱歌，請多指教');
	else if (String(text).indexOf('安') > -1)
		speak('安安啊');
	else if (String(text).indexOf('名') > -1)
		speak('我叫7688');
	else if (String(text).indexOf('笑') > -1)
		speak('有一個人名字較小蔡然後它就被端走了');
	else if (String(text).indexOf('唱') > -1)
		speak('啊啊啊啊啊啊啊啊啊啊');
	else if (String(text).indexOf('听') > -1)
		speak('我好難過嗚嗚嗚嗚嗚');
	else 
		speak('可以再說一次嘛');
	console.log(text);
}

listen();






