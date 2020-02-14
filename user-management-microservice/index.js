const mongoose = require('mongoose')
var url = "mongodb://localhost:27017/pika-pika";
const consumer = require('./config/connection').consumer
var signin = require('./auth/auth').signIn
var register = require('./auth/auth').register
var sendPayload = require('./auth/auth').sendPayload
var updateRecord = require('./auth/auth').updateRecord
var getJobList=require('./auth/auth').getJobList

let functionMap = {
	'signin': signin,
	'register': register,
	'updateRecord': updateRecord,
	'getJobList':getJobList
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//attach lister to connected event
mongoose.connection.once('connected', function () {
	console.log("Connected to database")
});

consumer.on('message', (message) => {
	console.log('Message on Topic -> ' + message.topic)
	console.log(message.value)
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
})

consumer.on('error', (error) => {
	console.log('error', error)
})