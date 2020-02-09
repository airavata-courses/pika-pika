const consumer = require('./connection').consumer
const uploadImage = require('./utility').uploadImage

consumer.on('message', (message) => {
	console.log('Message on Topic -> ' + message.topic)
	console.log(message.value)
	let value = JSON.parse(message.value)
	console.log(value['url'])

})
consumer.on('error', (error) => {
	console.log('error', error)
})
