
const mongoose = require('mongoose')
var url = "mongodb://localhost:27017/pika-pika";
const consumer = require('./config/connection').consumer
var signin = require('./auth/auth').signIn
var register = require('./auth/auth').register

let funcstionMap = {
	'signin': signin,
	'register': register
}

mongoose.connect(url);
//attach lister to connected event
mongoose.connection.once('connected', function () {
	console.log("Connected to database")
});

consumer.on('message', (message) => {
	console.log('Message on Topic -> ' + message.topic)
	console.log(message.value)
	let value = JSON.parse(message.value)
	funcstionMap[value['key']](value['data']).then((data) => {
		console.log(data)
	}).catch((error) => {
		console.log(error)
	})
})
consumer.on('error', (error) => {
	console.log('error', error)
})