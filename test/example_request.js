var watson = require('watson-developer-cloud');
var stt = watson.speech_to_text({
	username: '43dac526-4c6c-4164-a9ea-65b618fb3f38',
	password: 'wjCIK3o4rLuo',
	version: 'v1'
});
stt.getModels(null, function(err, models){
	if (err)
		console.log('err: ', err);
	else
		console.log(JSON.stringify(models, null, 2));
});
