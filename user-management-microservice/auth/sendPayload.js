const producer = require('../config/connection').producer

let sendPayload = async (kafka_topic, message) => {
	let payloads = [
		{
			topic: kafka_topic,
			messages: message
		}
	]
	producer.send(payloads, (error, data) => {
		if (error) {
			throw new Error(error)
		} else {
			console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success')
			return
		}
	})
}

module.exports = { sendPayload }