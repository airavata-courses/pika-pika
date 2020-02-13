const producer = require('../connection').producer


const addJobData = (jobData) => {
	jobData['_id'] = 'J-' + jobData['jobID']
	let collection = mongoDb.collection('job-data')
	return collection.insertOne(jobData)
}

const updateJobData = (jobData) => {
	let _id = 'J-' + jobData['jobID']
	let collection = mongoDb.collection('job-data')
	return collection.updateOne({ _id: _id }, { '$set': jobData })
}

const updateResult = (resultData) => {
	if (resultData['data']['key'] == 'fetch') {
		return fetchResult(resultData)
	}
	resultData['status'] = 'Complete'
	return updateJobData(resultData)
}

const fetchResult = (resultData) => {
	return new Promise((resolve, reject) => {
		let jobIDs=resultData['data']['jobID']
		let collection = mongoDb.collection('job-data')
		collection.find({ jobID: {'$in':jobIDs } }).toArray().then((data) => {
			payloadMessage = {
				error: null,
				data: data,
				resId: resultData['resId']
			}
			sendPayload('api-gateway-service', JSON.stringify(payloadMessage)).then((data) => {
				resolve()
			}).catch((error) => {

				console.log(error)
				reject(error)
			})
		}).catch((error) => {
			payloadMessage = {
				error: error,
				data: null,
				resId: resultData['resId']
			}
			sendPayload('api-gateway-service', JSON.stringify(payloadMessage)).then((data) => {
				resolve()
			}).catch((error) => {
				console.log(error)
				reject(error)
			})
		})
	})

}

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

module.exports = { addJobData, updateJobData, updateResult }