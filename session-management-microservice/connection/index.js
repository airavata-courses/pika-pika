const kafka = require('kafka-node');
let mongo = require('mongodb').MongoClient
let process = require('process')
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient();
let mongoClient = null
let mongoDb = null
global.mongoDb = null
let producer = null
let consumer = null

try {
	producer = new Producer(client);
	consumer = new Consumer(
		client,
		[
			{ topic: 'data-retrieval-service', offset: 0, partition: 0 },
			{ topic: 'model-execution-service', offset: 0, partition: 0 },
			{ topic: 'post-processing-service', offset: 0, partition: 0 },
			{ topic: 'session-management-service', offset: 0, partition: 0 }
		],
		{
			autoCommit: false,
			fetchMaxWaitMs: 1000,
			fetchMaxBytes: 1024000,
			encoding: 'utf8',
			fromOffset: true
		}
	)
	mongo.connect("mongodb://localhost:27017",
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
}
module.exports = { producer, consumer, mongoDb }
