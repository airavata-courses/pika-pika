const kafka = require('kafka-node')
const Producer = kafka.Producer
const Consumer = kafka.ConsumerGroup
const client = new kafka.KafkaClient({kafkaHost: "kafka-service:9092"})
let producer = null
let consumer = null

try {
	producer = new Producer(client,{partitionerType: 2});
	consumer = new Consumer(
		{
			kafkaHost: "kafka-service:9092",
			groupId: 'api-gateway-group',
			autoCommit: true,
			protocol: ["roundrobin"],
			autoCommitIntervalMs: 5000,
			fetchMaxWaitMs: 1000,
			fetchMaxBytes: 1024*1024,
			encoding: 'utf8',
			fromOffset: "latest"
		},
		['api-gateway-service']
	)
} catch (error) {
	console.log(error)
	process.exit()
}
module.exports = { producer, consumer }