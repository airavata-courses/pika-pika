const kafka = require('kafka-node');
let mongo = require('mongodb').MongoClient
let process = require('process')
const Producer = kafka.Producer;
const Consumer = kafka.ConsumerGroup;
const client = new kafka.KafkaClient({kafkaHost: "kafka-service:9092"});
let mongoClient = null
let mongoDb = null
global.mongoDb = null
let producer = null
let consumer = null

try {
	producer = new Producer(client);
	consumer = new Consumer(
		{	kafkaHost:'kafka-service:9092',
			groupId: 'session-management-group',
			autoCommit: true,
			protocol: ["roundrobin"],
			autoCommitIntervalMs: 5000,
			fetchMaxWaitMs: 1000,
			fetchMaxBytes: 1024*1024,
			encoding: 'utf8',
			fromOffset: "latest"
		},
		[
			'data-retrieval-service',
			'model-execution-service',
			'post-processing-service',
			'session-management-service'
		]
	)
	mongo.connect("mongodb://localhost:27017/session-management",
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(err, client) => {
			if (err) {
				console.error(err)
				process.exit(1)
			}
			mongoClient = client
			global.mongoDb = mongoClient.db('session-management')
		})
} catch (error) {
	console.log(error)
	process.exit()
}
module.exports = { producer, consumer, mongoDb }
