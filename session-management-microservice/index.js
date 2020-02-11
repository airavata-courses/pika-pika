const consumer = require('./connection').consumer
const addJobData=require('./utility').addJobData
const updateJobData=require('./utility').updateJobData
const updateResult=require('./utility').updateResult

const functionMap={
	'data-retrieval-service':addJobData,
	'model-execution-service':updateJobData,
	'post-processing-service':updateJobData,
	'session-management-service':updateResult
}

consumer.on('message', (message) => {
	console.log('Message on Topic -> ' + message.topic)
	console.log(message.value)
	let value=JSON.parse(message.value)
	value['status']=message.topic
	functionMap[message.topic](value).then((data)=>{
		console.log("Status updated!")
	}).catch((error)=>{
		console.error(error)
	})
})
consumer.on('error', (error) => {
	console.log('error', error)
})
