const consumer = require("./connection").consumer;
const utility = require("./utility");
var sendPayload = require('./utility/index').sendPayload


let functionMap = {
	'radar': utility.fetchRadar,
	'nexradfiles': utility.fetchNEXRADFiles,
	'weather': utility.fetchCurrentWeather
}


consumer.on("message", message => {
	console.log("Message on Topic -> " + message.topic);
	let value = JSON.parse(message.value)
	functionMap[value['key']](value['data']).then((data) => {
		payloadMessage = {
			error: null,
			data: data,
			resId: value['resId']
		}
		sendPayload('api-gateway-service', JSON.stringify(payloadMessage))
			.catch((error) => {
				console.log(error)
			})

	}).catch((error) => {

		console.log(error)
		payloadMessage = {
			error: error,
			data: null,
			resId: value['resId']
		}
		sendPayload('api-gateway-service', JSON.stringify(payloadMessage))
			.catch((error) => {
				console.log(error)
			})
	})
});
consumer.on("error", error => {
	console.log("error", error);
});
