var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.enable('trust proxy')
app.use(function(req, res, next) {
	if(req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// This code is called only when subscribing the webhook //
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'fb_weather_bot_verify_token') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
})


// Incoming messages reach this end point //
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
            text = event.message.text;
			console.log("Succeed!!!!!!!");
// Calling the Weather App. Change the address below to the url of your Weather app. Response is sent back to the user via the sendMessage function //
            request("https://circle-weather-bot.mybluemix.net/getWeather?text=" + text, function (error, response, body) {
                sendMessage(sender, body);
            });
        }
    }
    res.sendStatus(200);
});


// This function receives the response text and sends it back to the user //
function sendMessage(sender,text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

var token = "pasteYourAccessTokenHere";
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);
