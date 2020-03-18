const kafka = require('kafka-node');
const AWS = require('aws-sdk');
const process=require('process')
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: "kafka-service:9092"});
let producer = null
let consumer = null

try {
	producer = new Producer(client);
	consumer = new Consumer(
		client,
		[{ topic: 'front-end-data-retrieval-service', offset: 0, partitions: 0 }],
		{
			groupId: 'front-end-data-retrieval-group',
			autoCommit: true,
			autoCommitIntervalMs: 5000,
			fetchMaxWaitMs: 1000,
			fetchMaxBytes: 1024*1024,
			encoding: 'utf8',
			fromOffset: false
		}
	)
	console.log(process.env['AWSAccessKeyId'])
	console.log(process.env['AWSSecretKey'])
	
	AWS.config.update({
		'accessKeyId': process.env['AWSAccessKeyId'],
		'secretAccessKey': process.env['AWSSecretKey']
	})

} catch (error) {
	console.log(error)
	process.exit()
}
module.exports = { producer, consumer, AWS }