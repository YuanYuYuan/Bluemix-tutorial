var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var httpAdapter = 'http';
var watson = require('watson-developer-cloud');
var fs = require('fs');
var CLASSIFIER_ID = JSON.parse(fs.readFileSync('./NLC/classifier_info.json')).classifier_id;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var classifier = CLASSIFIER_ID //pre-trained classifier that distinguishes between a weather conditions question and temperature question
if (process.env.VCAP_SERVICES) {
	var vcap = JSON.parse(process.env.VCAP_SERVICES);
} else {
	var vcap = require('./env.json').VCAP_SERVICES;

}

var nlClassifier = watson.natural_language_classifier({
    url : vcap.natural_language_classifier[0].credentials.url,
    username : vcap.natural_language_classifier[0].credentials.username,
    password : vcap.natural_language_classifier[0].credentials.password,
    version  : 'v1'
});
var weatherUrl = vcap.weatherinsights[0].credentials.url;

app.get('/getWeather', function (req,responseToRequest) {
    var extractedLocation;
    text = req.query.text;
    extractedLocation = text;
	request(weatherUrl + "/api/weather/v1/geocode/25.03/121.30/observations.json?language=en-US", function(error, response, body) {
		var json = JSON.parse(response.body);
		console.log(json)
		var params = {
			classifier: classifier, // identifying type of question using the pre-trained classifier
			text: text
		};
		nlClassifier.classify(params, function(error,results){
			var message = "Could not identify if question is about weather conditions or temperature";
			for (i = 0; i < results.classes.length; i++) {
				if (results.classes[i].confidence > 0.8 && typeof json.observation.temp != 'undefined') {
					if (results.classes[i].class_name === "temperature") {
						message = "Temperature in Taipei is " + 
							((parseFloat(json.observation.temp) - 32) / 1.8).toFixed(2) + " °C";
					} else if (results.classes[i].class_name === "conditions") {
						message = "Weather in Taipei is " + json.observation.wx_phrase; // Returned message determined according to the classifier's result
					}
				}
			}
			responseToRequest.send(message);
		});
	});
});

console.log("Server is now running at localhost:3000");
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port,host);
