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
		[{ topic: 'postprocess', offset: 3, partition: 0 }],
		{
			autoCommit: false,
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