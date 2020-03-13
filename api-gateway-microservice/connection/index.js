const kafka = require('kafka-node')
const Producer = kafka.Producer
const Consumer = kafka.Consumer
const client = new kafka.KafkaClient({kafkaHost: "kafka-broker:9092"})
let producer = null
let consumer = null

try {
	producer = new Producer(client);
	consumer = new Consumer(
		client,
		[{ topic: 'api-gateway-service', offset: 0, partition: 0 }],
		{
			groupId: 'api-gateway-service',
			autoCommit: true,
			autoCommitIntervalMs: 5000,
			fetchMaxWaitMs: 1000,
			fetchMaxBytes: 1024,
			encoding: 'utf8',
			fromOffset: false
		}
	)
} catch (error) {
	console.log(error)
}
module.exports = { producer, consumer }