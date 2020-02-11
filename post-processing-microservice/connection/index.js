const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient();
let producer = null
let consumer = null

try {
	producer = new Producer(client);
	consumer = new Consumer(
		client,
		[{ topic: 'post-processing-service', offset: 0, partition: 0 }],
		{
			autoCommit: true,
			fetchMaxWaitMs: 1000,
			fetchMaxBytes: 1024000,
			encoding: 'utf8',
			fromOffset: true
		}
	)
} catch (error) {
	console.log(error)
}
module.exports = { producer, consumer }